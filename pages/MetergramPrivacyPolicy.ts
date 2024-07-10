import { Page, expect } from '@playwright/test';

export class MetergramPrivacyPolicy{
    private readonly page: Page;

    constructor(page: Page) {
        this.page= page;
    }

    async getCookieSection(){
        const h2Text = await this.page.textContent('(//h2[@class=\'privacy-subheading\'])[6]')
        const descText = await this.page.textContent('(//div[@class=\'privacy-paragraph\'])[8]')
        const listText = await this.page.textContent('(//li[@class=\'privacy-list-item\'])[6]')
        const listText2 = await this.page.textContent('(//li[@class=\'privacy-list-item\'])[7]')

        //:)
        console.log(h2Text);
        console.log(descText);

        const ulSelector = '(//ul[@class=\'privacy-list\'])[4]';
        const ulHandle = await this.page.$(ulSelector);
        const listItems = await ulHandle.$$('li.privacy-list-item');

        for (const item of listItems) {
            const text = await item.textContent();
            if (text) {
                console.log('-', text);
            }
        }

    }
}