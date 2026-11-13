import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import { ToastProvider } from './components/ui/Toast'
import './styles/tokens.css'
import './styles/global.css'
import './styles/ui.css'
import './styles/components.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
