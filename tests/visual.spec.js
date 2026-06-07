import { test, expect } from '@playwright/test';

test.describe('Car Rainbow visual regression', () => {
    test('start screen', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'Car Rainbow' }).first()).toBeVisible();

        await expect(page).toHaveScreenshot('start-screen.png', { animations: 'disabled' });
    });

    test('win dialog after finding all cars', async ({ page }) => {
        await page.goto('/');

        const cars = page.locator('.car__selector');
        const count = await cars.count();
        for (let i = 0; i < count; i += 1) {
            await cars.nth(i).click();
        }

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page).toHaveScreenshot('win-dialog.png', { animations: 'disabled' });
    });

    test('page does not scroll', async ({ page }) => {
        await page.goto('/');

        const { scrollHeight, clientHeight } = await page.evaluate(() => ({
            scrollHeight: document.documentElement.scrollHeight,
            clientHeight: document.documentElement.clientHeight,
        }));

        expect(scrollHeight).toBeLessThanOrEqual(clientHeight);
    });
});
