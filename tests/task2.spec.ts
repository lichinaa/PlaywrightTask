import { test } from '@playwright/test';
import { MetergramEventsPage } from '../pages/MetergramPastEvents';
import { MetergramHomePage } from '../pages/MetergramHomePage';


test.describe('Test case 2', () => {

    test('Extract and print past event details', async ({ page }) => {
        const metergramHomePage = new MetergramHomePage(page);
        const eventsPage = new MetergramEventsPage(page);

        await metergramHomePage.visit();
        await metergramHomePage.navigateToEvents();
        await eventsPage.navigateToPastEvents();
        const eventDetails = await eventsPage.getPastEventDetails();

        eventDetails.forEach(event => {
            console.log(event.date);
            console.log(event.location);
            console.log(event.name);
            console.log(event.description);
            console.log('-------------------------------');
        });

        await eventsPage.validateFooter('United States');
    });
});
