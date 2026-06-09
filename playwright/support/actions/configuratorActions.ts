import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  const carPreview = page.getByRole('img', { name: /Velô Sprint/ })
  const totalPrice = page.getByTestId('total-price')

  return {
    async open() {
      await page.goto('/configure')
      await expect(page).toHaveURL('/configure')
      await expect(page.getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
      await expect(carPreview).toBeVisible()
    },

    async expectInitialState() {
      await expect(carPreview).toHaveAttribute('alt', 'Velô Sprint - glacier-blue with aero wheels')
      await expect(totalPrice).toHaveText('R$ 40.000,00')
    },

    async selectColor(colorName: string) {
      await page.getByRole('button', { name: colorName }).click()
    },

    async selectWheels(wheelsName: string | RegExp) {
      await page.getByRole('button', { name: wheelsName }).click()
    },

    async expectPrice(price: string) {
      await expect(totalPrice).toHaveText(price)
    },

    async expectCarImageAlt(alt: string) {
      await expect(carPreview).toHaveAttribute('alt', alt)
      
    },
    async selectOptional(name: string | RegExp) {
      await page.getByRole('checkbox', { name: name }).click()
    },
    
    async deselectOptional(name: string | RegExp) {
      await page.getByRole('checkbox', { name: name }).click()
    },
    
    async expectOptionalChecked(name: string | RegExp) {
      await expect(page.getByRole('checkbox', { name: name }))
        .toHaveAttribute('aria-checked', 'true')
    },
    
    async expectOptionalUnchecked(name: string | RegExp) {
      await expect(page.getByRole('checkbox', { name: name }))
        .toHaveAttribute('aria-checked', 'false')
    },
    
    async clickCheckout() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
    },


  }
}