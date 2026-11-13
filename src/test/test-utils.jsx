import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { CartProvider } from '../context/CartContext'
import { OrdersProvider } from '../context/OrdersContext'
import { ToastProvider } from '../components/ui/Toast'

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ToastProvider>
        <CartProvider>
          <OrdersProvider>{ui}</OrdersProvider>
        </CartProvider>
      </ToastProvider>
    </MemoryRouter>,
  )
}

export function renderApp(route = '/') {
  return renderWithProviders(<App />, { route })
}
