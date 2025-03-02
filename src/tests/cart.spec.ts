import { IndexPage } from '@/pages/IndexPage';
import { test as base } from '@playwright/test';
import { Product } from '@/objects/Product';
import { CartPage } from '@/pages/CartPage';
import { expect } from '@playwright/test';

const test = base.extend<{ product: Product, indexPage: IndexPage, cartPage: CartPage }>({
    product: async ({ page }, use) => {
        const product = new Product(page);
        await use(product);
    },

    indexPage: async ({ page }, use) => {
        const indexPage = new IndexPage(page);
        await use(indexPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
});

test.describe('Корзина', async () => {
    test.beforeEach(async ({ indexPage }) => {
        await indexPage.open();
    });

    test(
        'Финальная цена в корзине совпадает с суммой цен элементов в корзине',
        async ({
                   product,
                   indexPage,
                   cartPage
               }) => {
            await product.addToCart(Product.SAMSUNG_GALAXY_S6);
            await product.addToCart(Product.NOKIA_LUMIA_1520);

            await indexPage.goToCart();
            await cartPage.waitForPrice();

            await test.step(
                'Проверить, что итоговая цена не 0',
                async () => expect(await cartPage.totalPrice()).not.toBe(0)
            );

            await test.step(
                'Итоговая цена равна сумме цен товаров в корзине',
                async () => expect(await cartPage.sumPrice()).toBe(await cartPage.totalPrice())
            );
        });
});
