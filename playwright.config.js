import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:1234',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm start',
        url: 'http://localhost:1234',
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: 'mobile',
            use: { ...devices['Pixel 7'] },
        },
        {
            name: 'desktop',
            use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
        },
    ],
});
