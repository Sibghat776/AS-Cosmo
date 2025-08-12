import { StrictMode } from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { CartProvider } from '../context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
<CartProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
</CartProvider>
)
