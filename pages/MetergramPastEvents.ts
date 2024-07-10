import { Page, expect } from '@playwright/test';

export class MetergramEventsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPastEvents() {
        await this.page.click('//a[@href="#w-tabs-0-data-w-pane-1"]');
        await this.page.waitForLoadState('networkidle');
    }

    async getPastEventDetails() {
        const events = [];
        const textContent = await this.page.textContent('//div[@class="w-page-count page-count"]');
        const parts = textContent.split('/');
        const numberPage = parseInt(parts[1]?.trim());
        console.log("Number of pages ", numberPage);

        for (let i = 1; i <= numberPage; i++) {
            const eventSelectors = await this.page.$$(`(//div[@class="collection-item w-dyn-item"])[position() >= 3 and position() <= 6]`);

            for (const eventSelector of eventSelectors) {
                const dateStart = await eventSelector.$eval('//div[@class="events-card-start-date"]', el => el.textContent);
                const dateEnd = await eventSelector.$eval('//div[@class="events-card-end-date"]', el => el.textContent);
                const date = `Date: ${dateStart?.trim()} - ${dateEnd?.trim()}`;

                const location = await eventSelector.$eval('//div[contains(@class, "events-card-location")]', el => el.textContent);
                const name = await eventSelector.$eval('//h2[contains(@class, "events-card-title")]', el => el.textContent);
                const description = await eventSelector.$eval('//div[contains(@class, "events-card-description") and contains(@class, "events-card-description-past")]', el => el.textContent);

                events.push({
                    date: date?.trim(),
                    location: `Location: ${location?.trim()}`,
                    name: `Name: ${name?.trim()}`,
                    description: `Description: ${description?.trim()}`,
                });
            }
            const nextPageButton = await this.page.$('//a[@id="next-page-btn-past"]');
            if (nextPageButton && i < numberPage) {
                await nextPageButton.click();
                await this.page.waitForLoadState('networkidle');
            }
        }
        return events;
    }

    async validateFooter(expectedText: string) {
        const footerText = await this.page.textContent('(//div[@class="footer-info-country"])[2]');
        expect(footerText).toContain(expectedText);
    }
}

