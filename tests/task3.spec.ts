import { test } from '@playwright/test';
import { MetergramCareers } from '../pages/MetergramCareers';
import { MetergramHomePage } from '../pages/MetergramHomePage';


test.describe('Test case 3', () => {

    test('Careers test case', async ({ page }) => {
        const metergramHomePage = new MetergramHomePage(page);
        const careers = new MetergramCareers(page);

        await metergramHomePage.visit();
        await metergramHomePage.clickCareers();
        await careers.clickOpenPositions();
        const newPage = await careers.clickApplyDevOps();
        await careers.validateLinkedin(newPage);
        await careers.validateFooter('United States');
    });
});
