import type { PageServerLoad, Actions } from './$types';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/server/prisma';
import process from 'process';

config();

export const load = (async ({ cookies }) => {
    const token = cookies.get('token');
    let loggedIn = false;

    const tokenFromDatabase = await prisma.logins.findFirst({
        where: {
            token: token
        }
    })

    if(tokenFromDatabase) {
        if(tokenFromDatabase.expires >= new Date()) {
            loggedIn = true;
        }
    }

    if(loggedIn){
        const players = await prisma.users.findMany({
            orderBy: {
                stars: 'desc'
            }
        });

        const tasks = await prisma.tasks.findMany({
            orderBy: {
                reward: 'desc'
            }
        });

        return {
            loggedIn,
            players,
            tasks
        }
    }

    return {
        loggedIn
    }
}) satisfies PageServerLoad;

export const actions = {
    login: async({cookies, request }) => {
        const formData = await request.formData();
        const password = formData.get('password');

        if(password === process.env.ADMIN_PASSWORD) {
            const newToken = uuidv4();

            await prisma.logins.create({
                data: {
                    token: newToken,
                    expires: new Date(Date.now() + 1000 * 60 * 60)
                }
            });

            cookies.set('token', newToken, {
                maxAge: 60 * 60,
                path: '/'
            });

            const players = await prisma.users.findMany({
                orderBy: {
                    stars: 'desc'
                }
            });

            const tasks = await prisma.tasks.findMany({
                orderBy: {
                    reward: 'desc'
                }
            });

            return {
                attemptSuccessful: true,
                players,
                tasks
            }
        }
        else {
            return {
                attemptSuccessful: false
            }
        }
    },

    addPlayer: async({request}) => {
        const formData = await request.formData();
        const name = formData.get('name');
        const stars = String(formData.get('stars'));

        await prisma.users.create({
            data: {
                name: String(name),
                stars: parseInt(stars)
            }
        });
    },

    deletePlayer: async({request}) => {
        const formData = await request.formData();
        const id = String(formData.get('id'));

        await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        });
    },

    updateStars: async({request}) => {
        const formData = await request.formData();
        const id = String(formData.get('id'));
        const stars = String(formData.get('stars'));
        const currentStars = await prisma.users.findFirst({
            where: {
                id: parseInt(id)
            }
        });

        const newStars = parseInt(stars) + (currentStars?.stars ?? 0);

        await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                stars: newStars
            }
        });
    }
} satisfies Actions;