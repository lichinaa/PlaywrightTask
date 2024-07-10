import { test } from '@playwright/test';
import { MetergramHomePage } from '../pages/MetergramHomePage';
import { MetergramContactUsPage } from '../pages/MetergramContactUsPage';

test.describe('Test case 1', () => {

     [
        { name: 'Ana', email: 'ana@example.com', companyName: 'Google', message: 'Message 1' },
        { name: 'Sara', email: 'sara@example.com', companyName: 'Apple', message: 'Message 2' },
        { name: 'Nina', email: 'nina@example.com', companyName: 'Tesla', message: 'Message 3' }
    ].forEach((data) => {
        test(`Fill form and submit - ${data.name}`, async ({ page }) => {
            const metergramHomePage = new MetergramHomePage(page);
            const contactUsPage = new MetergramContactUsPage(page);

            await metergramHomePage.visit();
            await metergramHomePage.clickContactUs();
            await contactUsPage.fillForm(data.name, data.email, data.companyName, data.message);
            await contactUsPage.clickGetInTouch();

            // await contactUsPage.validateRobotMessage();
            await contactUsPage.validateFooter('United States');
        });
    });
});
