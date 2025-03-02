import { Page, test } from '@playwright/test';

import { BasePage } from './BasePage';

export class IndexPage extends BasePage {
    constructor(page: Page) {
        super('/index.html', page);
    }

    async selectProduct(productName: string): Promise<void> {
        await test.step(`Нажать на название товара ${productName}`, async () => {
            await this.page.getByRole('link', { name: productName }).click();
        });
    }
}
