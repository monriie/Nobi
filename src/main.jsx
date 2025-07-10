import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router'
import ThemeProvider from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ThemeProvider>
)
