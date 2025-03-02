import { Locator, Page, test } from '@playwright/test';

import { DOMAIN, PAGE_LOADING_TIMEOUT } from '@/const';
import { step } from '@/step';

export abstract class BasePage {
    public readonly url: string;
    protected readonly page: Page;

    readonly home: Locator;
    readonly cart: Locator;

    protected constructor(url: string, page: Page) {
        this.url = DOMAIN + url;
        this.page = page;

        this.home = page.getByRole('link', { name: 'Home' });
        this.cart = page.getByRole('link', { name: 'Cart' });
    }

    public async open(): Promise<void> {
        await test.step(`Открыть страницу ${this.url}`, async () => {
            await this.page.goto(this.url);
        });
    }

    public async waitUntilOpen(): Promise<void> {
        await test.step(`Подождать, пока загрузится страница ${this.url}`, async () => {
            await this.page.waitForURL(this.url, { timeout: PAGE_LOADING_TIMEOUT });
        });
    }

    @step('Нажать на кнопку Home в шапке')
    public async goHome(): Promise<void> {
        await this.home.click();
    }

    @step('Нажать на кнопку Cart в шапке')
    public async goToCart(): Promise<void> {
        await this.cart.click();
    }
}
