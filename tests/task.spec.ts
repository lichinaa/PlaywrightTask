import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('has title', async ({ page }) => {
    const baseURL = process.env.BASE_URL;
    if (!baseURL) {
        throw new Error('BASE_URL is not defined in the environment variables');
    }

    await page.goto(baseURL);

    await expect(page).toHaveTitle('Metergram - Custom Software and Systems Integration');
});
