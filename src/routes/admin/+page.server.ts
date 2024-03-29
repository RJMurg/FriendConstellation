import type { PageServerLoad, Actions } from './$types';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ cookies }) => {

	// Check if admin cookie is set
	if (cookies.get('admin') === 'true') {
		// Return success
		return {
			status: 200,
			message: 'Successfully logged in.'
		};
	} else {
		// Return failure
		return {
			status: 500,
			message: 'Not logged in.'
		};
	}
};

export const actions = {
	login: async ({ cookies, request }) => {
		const reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "password" => "string"
		// }

		// Check if password is correct from .env file
		if (reqData.get('password') === process.env.ADMIN_PASSWORD) {
			// Set cookie to true, with age of 2 hours
			cookies.set('admin', 'true', {
                maxAge: 7200,
                secure: false,
                path: '/admin'
            });

			// Return success
			return {
				status: 200,
				message: 'Successfully logged in'
			};
		} else {
			// Return failure
			return {
				status: 500,
				message: 'Incorrect password'
			};
		}
	},
	logout: async ({ cookies }) => {
		// Set cookie to false, with age of -1 (expires immediately)
		cookies.set('admin', 'false', {
			maxAge: -1,
			path: '/'
		});
	}
} satisfies Actions;