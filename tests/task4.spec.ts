import { test } from '@playwright/test';
import { MetergramHomePage } from '../pages/MetergramHomePage';
import { MetergramPrivacyPolicy } from '../pages/MetergramPrivacyPolicy'

test.describe('Test case 4', () => {
    test('Test Privacy Policy', async ({page}) => {
        const metergramHomePage = new MetergramHomePage(page);
        const privacyPolicy = new MetergramPrivacyPolicy(page);

        await metergramHomePage.visit();
        await metergramHomePage.clickPrivacyPolicy();
        await privacyPolicy.getCookieSection();
    })
});

