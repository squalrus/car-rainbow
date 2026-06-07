import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        pool: 'threads',
        setupFiles: ['./src/js/test-setup.js'],
        exclude: ['node_modules/**', 'dist/**', 'tests/**'],
    },
});
