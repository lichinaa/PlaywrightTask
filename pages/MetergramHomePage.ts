import { Page, expect } from '@playwright/test';

export class MetergramHomePage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        const baseURL = process.env.BASE_URL;
        if (!baseURL) {
            throw new Error('BASE_URL is not defined in the environment variables');
        }
        await this.page.goto(baseURL);
        await expect(this.page).toHaveTitle('Metergram - Custom Software and Systems Integration');
    }

    async clickContactUs() {
        const button= '(//a[@href=\'/contact\'])[1]'
        await this.page.click(button);
    }

    async navigateToEvents() {
        await this.page.click('(//a[@href="/events"])[3]');
        await this.page.waitForLoadState('networkidle');
    }

    async clickCareers() {
        const button = '(//a[@href=\'/careers\'])[1]'
        await this.page.click(button);
    }

    async clickPrivacyPolicy(){
        const button = '//a[@href="/privacy"]'
        await this.page.click(button)
    }

}
