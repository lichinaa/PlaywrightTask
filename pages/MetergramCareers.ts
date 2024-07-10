import { Page, expect } from '@playwright/test';

export class MetergramCareers{
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOpenPositions() {
        const button = '//a[@class=\'primary-button careers-open-positions-button w-button\']';
        await this.page.click(button);
        await this.page.waitForLoadState('networkidle');
    }

    async clickApplyDevOps() {
        const button = '(//div[@class=\'ops-apply-now-text\'])[1]';
        const newPagePromise = this.page.waitForEvent('popup');
        await this.page.click(button);

        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');

        return newPage;
    }

    async validateLinkedin(newPage: Page) {
        expect(newPage.url()).toContain('linkedin.com');

        await newPage.waitForSelector('h1');
        const headerText = await newPage.textContent('h1');
        expect(headerText).toContain('We couldn’t find a match for Metergram jobs in North Macedonia');
    }

    async validateFooter(expectedText: string) {
        const footerText = await this.page.textContent('(//div[@class="footer-info-country"])[2]');
        expect(footerText).toContain(expectedText);
    }

}