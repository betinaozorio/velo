import { test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'
import { type OrderDetails } from '../support/actions/orderLockupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })
  

  test('deve consultar um pedido aprovado', async ({ app }) => {

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
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)

  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

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
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

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
    await app.orderLockup.searchOrder(order.number)

    // Assert
    await app.orderLockup.validateOrderDetails(order)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

    const order = generateOrderCode()

    await app.orderLockup.searchOrder(order)
    await app.orderLockup.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ app }) => {
    const invalidOrderCode = '123456'

    await app.orderLockup.searchOrder(invalidOrderCode)
    await app.orderLockup.validateOrderNotFound()
  })
})