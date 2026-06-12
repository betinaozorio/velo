import { test } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'
import { type OrderDetails } from '../support/actions/orderLockupActions'
import { insertOrder } from '../support/database/orderRepository'
import crypto from 'crypto'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeEach(async ({ app }) => {
    await app.orderLockup.open()
  })
  

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const orderNumber = generateOrderCode()
    
    // Arrange: Inserir no banco
    await insertOrder({
      id: crypto.randomUUID(),
      order_number: orderNumber,
      color: 'lunar-white',
      wheel_type: 'aero',
      customer_name: 'Betina Heckler Ozorio',
      customer_email: 'betina.ozorio@gmail.com',
      customer_phone: '(54) 99918-7224',
      customer_cpf: '511.289.700-74',
      payment_method: 'avista',
      total_price: '50500',
      status: 'APROVADO',
      optionals: ['precision-park', 'flux-capacitor']
    })

    // Test Data
    // `satisfies` valida o contrato de `OrderDetails` sem perder a inferencia do objeto literal.
    const order = {
      number: orderNumber,
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
    const orderNumber = generateOrderCode()

    // Arrange: Inserir no banco
    await insertOrder({
      id: crypto.randomUUID(),
      order_number: orderNumber,
      color: 'midnight-black',
      wheel_type: 'sport',
      customer_name: 'Raymond Murphy',
      customer_email: 'raymond.murphy@teste.com',
      customer_phone: '(99) 88889-9998',
      customer_cpf: '527.539.790-90',
      payment_method: 'avista',
      total_price: '47000',
      status: 'REPROVADO',
      optionals: ['flux-capacitor']
    })

    // Test Data
    const order = {
      number: orderNumber,
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
    const orderNumber = generateOrderCode()

    // Arrange: Inserir no banco
    await insertOrder({
      id: crypto.randomUUID(),
      order_number: orderNumber,
      color: 'glacier-blue',
      wheel_type: 'sport',
      customer_name: 'Alice Custódio',
      customer_email: 'alicec@teste.com',
      customer_phone: '(11) 88888-8888',
      customer_cpf: '123.863.720-57',
      payment_method: 'avista',
      total_price: '42000',
      status: 'EM_ANALISE',
      optionals: []
    })

    // Test Data
    const order = {
      number: orderNumber,
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