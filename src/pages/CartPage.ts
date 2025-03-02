import { BasePage } from '@/pages/BasePage';
import { Locator, Page } from '@playwright/test';
import { step } from '@/step';

export class CartPage extends BasePage {
    private readonly price: Locator;
    private readonly totalPriceLocator: Locator;

    constructor(page: Page) {
        super('/cart.html', page);

        this.price = page.locator('xpath=//tbody/tr/td[3]');
        this.totalPriceLocator = page.locator('#totalp');
    }

    async sumPrice(): Promise<number> {
        const prices = await this.price.all();
        const priceValues = await Promise.all(prices.map(async price => await price.textContent()));
        return priceValues.reduce((sum, value) => sum + Number(value), 0);
    }

    async totalPrice(): Promise<number> {
        const value = await this.totalPriceLocator.textContent();
        return Number(value);
    }

    @step('Подождать, пока появится цена')
    async waitForPrice(): Promise<void> {
        await this.price.first().waitFor({ state: 'visible', timeout: 10000 });
    }
}
