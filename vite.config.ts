import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [sveltekit(), enhancedImages()],

	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}'],
		coverage: {
			reporter: ['json-summary'],
			reportOnFailure: true
		}
	}
});
