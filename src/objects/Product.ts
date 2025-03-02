import { IndexPage } from '@/pages/IndexPage';
import { ProductPage } from '@/pages/ProductPage';
import { Page, test } from '@playwright/test';

export class Product {
    static readonly SAMSUNG_GALAXY_S6 = 'Samsung galaxy s6';
    static readonly NOKIA_LUMIA_1520 = 'Nokia lumia 1520';

    private readonly indexPage: IndexPage;
    private readonly productPage: ProductPage;

    constructor(page: Page) {
        this.indexPage = new IndexPage(page);
        this.productPage = new ProductPage(page);
    }

    async addToCart(productName: string): Promise<void> {
        await test.step(`Добавить продукт "${productName}" в корзину`, async () => {
            await this.indexPage.selectProduct(productName);
            await this.productPage.waitUntilOpen();
            await this.productPage.addToCart();
            await this.indexPage.goHome();
            await this.indexPage.waitUntilOpen();
        });
    }
}
