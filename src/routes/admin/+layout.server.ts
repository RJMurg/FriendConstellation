import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
	const rawURL = request.url;
	const url = new URL(rawURL);
	const path = url.pathname;

	// Check if admin cookie is set
	if (cookies.get('admin') !== 'true' && path != '/admin') {
		throw redirect(301, '/admin');
	}
};
