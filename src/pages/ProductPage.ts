import { Dialog, Locator, Page, test } from '@playwright/test';

import { BasePage } from './BasePage';
import { PAGE_LOADING_TIMEOUT } from '@/const';
import { step } from '@/step';

export class ProductPage extends BasePage {
    readonly addToCartLocator: Locator;

    constructor(page: Page) {
        super('/prod.html', page);

        this.addToCartLocator = page.getByRole('link', { name: 'Add to cart' });
    }

    @step('Добавить товар в корзину')
    async addToCart(): Promise<void> {
        await this.addToCartLocator.click();
        await this.page.waitForEvent('dialog', {
            predicate: async (dialog: Dialog) => {
                await dialog.accept();
                return true;
            }
        });
    }

    public override async waitUntilOpen(): Promise<void> {
        await test.step(`Подождать, пока загрузится страница ${this.url}`, async () => {
            await this.page.waitForURL(new RegExp(`${this.url}\?.*`), { timeout: PAGE_LOADING_TIMEOUT });
        });
    }
}
