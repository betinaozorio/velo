import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  const summaryTotalPrice = page.getByTestId('summary-total-price')

  return {
    async expectCheckoutPage(totalPrice: string) {
      await expect(page).toHaveURL('/order')
      await expect(summaryTotalPrice).toHaveText(totalPrice)
    },
  }
}