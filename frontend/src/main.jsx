import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ShopContextProvider from './context/ShopContext'
import './index.css'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
        <ShopContextProvider>
            <App />
        </ShopContextProvider>
    </BrowserRouter>
  
)
