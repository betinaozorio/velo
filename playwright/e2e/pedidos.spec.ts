import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { Navbar } from '../support/components/Navbar'
import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, type OrderDetails } from '../support/pages/OrderLockupPage'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  let landingPage: LandingPage
  let navbar: Navbar
  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page)
    navbar = new Navbar(page)
    

    await landingPage.open()
    await landingPage.validateHeroSection()
    await navbar.goToOrderLookup()

    orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.expectLoaded()
  })

  test('deve consultar um pedido aprovado', async () => {

    // Test Data
    // `satisfies` valida o contrato de `OrderDetails` sem perder a inferencia do objeto literal.
    const order = {
      number: 'VLO-Q6GJWV',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Betina Heckler Ozorio',
        email: 'betina.ozorio@gmail.com'
      },
      payment: 'À Vista'
    } satisfies OrderDetails

    // Act  
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)

  })

  test('deve consultar um pedido reprovado', async () => {

    // Test Data
    const order = {
      number: 'VLO-S4LCTI',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Raymond Murphy',
        email: 'raymond.murphy@teste.com'
      },
      payment: 'À Vista'
    } satisfies OrderDetails

    // Act  
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async () => {

    // Test Data
    const order = {
      number: 'VLO-Q60R2K',
      status: 'EM_ANALISE',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Alice Custódio',
        email: 'alicec@teste.com'
      },
      payment: 'À Vista'
    } satisfies OrderDetails

    // Act  
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async () => {

    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async () => {
    const invalidOrderCode = '123456'

    await orderLockupPage.searchOrder(invalidOrderCode)
    await orderLockupPage.validateOrderNotFound()
  })
})