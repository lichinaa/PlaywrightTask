import { Page, expect } from '@playwright/test';

export class MetergramContactUsPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillForm(name: string, email: string, companyName: string, message: string) {
        await this.page.fill('//input[@id="Your-name"]', name);
        await this.page.fill('//input[@id="Email"]', email);
        await this.page.fill('//input[@id="Company-Name"]', companyName);
        await this.page.fill('//textarea[@id="message"]', message);
    }

    async clickGetInTouch() {
        const button= '//input[@id="get-in-touch-contact"]'
        await this.page.click(button);
    }


    async validateRobotMessage() {
        this.page.once('dialog', async (dialog) => {
            console.log(`Dialog message: ${dialog.message()}`);
            expect(dialog.message()).toBe('Please confirm you’re not a robot.');
            await dialog.dismiss().catch(() => {}); // Dismiss the dialog
        });

        await this.page.getByRole('button', { name: 'Get in touch' }).click();
    }

    async validateFooter(expectedText: string) {
        const footerText = await this.page.textContent('//div[@class="footer-info-country"]');
        expect(footerText).toContain(expectedText);
    }
}