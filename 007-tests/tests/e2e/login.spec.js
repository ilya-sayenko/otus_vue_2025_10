import { test, expect } from '@playwright/test'

test.describe('Login', () => {
  test('login', async ({ page }) => {
    await page.goto('/auth')

    await page.locator('#login').fill('testLogin')
    await page.locator('#password').fill('testPassword')
    await page.locator('.submit-btn').click()

    await expect(page.locator('.navbar-content')).toBeVisible();
  })

  test('login and open cart', async ({ page }) => {
    await page.goto('/auth')

    await page.locator('#login').fill('testLogin')
    await page.locator('#password').fill('testPassword')
    await page.locator('.submit-btn').click()
    await page.getByText('Корзина', { exact: true }).click();

    await expect(page.locator('.cart-dropdown')).toBeVisible();
  })

  test('login and add product to cart', async ({ page }) => {
    await page.goto('/auth')

    await page.locator('#login').fill('testLogin')
    await page.locator('#password').fill('testPassword')
    await page.locator('.submit-btn').click()
    await page.getByRole('link', { name: 'Главная' }).click();
    await page.getByRole('button', { name: 'Добавить в корзину' }).nth(1).click();
    await page.getByText('Корзина', { exact: true }).click();

    await expect(page.locator('.cart-item')).toBeVisible();
  })
})
