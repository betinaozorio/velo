import { test, expect } from '../support/fixtures'

test.describe('Configuração do Veículo (Cores e Rodas) e Cálculo do Preço Base', () => {
  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
    await app.configurator.expectInitialState()
  })

  test('deve atualizar a imagem e manter o preço ao alterar a cor do veículo', async ({ app }) => {
    await app.configurator.selectColor('Midnight Black')
    await app.configurator.expectCarImageAlt('Velô Sprint - midnight-black with aero wheels')
    await app.configurator.expectPrice('R$ 40.000,00')
  })

  test('deve atualizar a imagem e o preço corretamente ao alterar as rodas do veículo', async ({ app }) => {
    await app.configurator.selectWheels(/Sport Wheels/)
    await app.configurator.expectCarImageAlt('Velô Sprint - glacier-blue with sport wheels')
    await app.configurator.expectPrice('R$ 42.000,00')

    await app.configurator.selectWheels(/Aero Wheels/)
    await app.configurator.expectCarImageAlt('Velô Sprint - glacier-blue with aero wheels')
    await app.configurator.expectPrice('R$ 40.000,00')
  })
  test.describe('Configuração do Veículo (Opcionais) e Cálculo de Preço', () => {
    test.beforeEach(async ({ app }) => {
      await app.configurator.open()
      await app.configurator.expectInitialState()
    })
  
    test('deve atualizar o preço ao selecionar e desmarcar opcionais', async ({ app }) => {
      // Passo 1: Selecionar Precision Park
      await app.configurator.selectOptional(/Precision Park/)
      await app.configurator.expectOptionalChecked(/Precision Park/)
      await app.configurator.expectPrice('R$ 45.500,00')
  
      // Passo 2: Selecionar Flux Capacitor
      await app.configurator.selectOptional(/Flux Capacitor/)
      await app.configurator.expectOptionalChecked(/Flux Capacitor/)
      await app.configurator.expectPrice('R$ 50.500,00')
  
      // Passo 3: Desmarcar os dois opcionais
      await app.configurator.deselectOptional(/Precision Park/)
      await app.configurator.expectOptionalUnchecked(/Precision Park/)
      await app.configurator.deselectOptional(/Flux Capacitor/)
      await app.configurator.expectOptionalUnchecked(/Flux Capacitor/)
      await app.configurator.expectPrice('R$ 40.000,00')
    })
  
    test('deve redirecionar para o checkout com a configuração persistida', async ({ app, page }) => {
      // Passo 4: Clicar em Monte o Seu e verificar o redirect
      await app.configurator.clickCheckout()
  
      await expect(page).toHaveURL('/order')
      await expect(page.getByTestId('summary-total-price')).toHaveText('R$ 40.000,00')
    })
  })

})