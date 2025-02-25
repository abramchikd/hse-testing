import { test, expect } from '@playwright/test';

const LOGIN = 'standard_user'
const PASSWORD = 'secret_sauce'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test.describe('Вход', () => {
    test('Не даст войти с пустым паролем', async ({ page }) => {
        await page.getByPlaceholder('Username').fill(LOGIN)
        await page.getByPlaceholder('Password').fill('')
        await page.getByRole('button').click()

        const errorTag = page.getByTestId('error')
        expect(errorTag).not.toBeNull()
        await expect(errorTag).toHaveText('Epic sadface: Password is required')
    })

    test('Не даст войти с пустым логином', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('')
        await page.getByPlaceholder('Password').fill(PASSWORD)
        await page.getByRole('button').click()

        const errorTag = page.getByTestId('error')
        expect(errorTag).not.toBeNull()
        await expect(errorTag).toHaveText('Epic sadface: Username is required')
    })

    test('Не даст войти с неправильным паролем', async ({ page }) => {
        await page.getByPlaceholder('Username').fill(LOGIN)
        await page.getByPlaceholder('Password').fill('wrong')
        await page.getByRole('button').click()

        const error = page.getByTestId('error')
        expect(error).not.toBeNull()
        await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('Успешно войдёт, если ввести правильный логин и правильный пароль', async ({ page }) => {
        await page.getByPlaceholder('Username').fill(LOGIN)
        await page.getByPlaceholder('Password').fill(PASSWORD)
        await page.getByRole('button').click()

        const title = page.getByTestId('title')
        await expect(title).not.toBeEmpty()
        await expect(title).toBeVisible()
    })
})
