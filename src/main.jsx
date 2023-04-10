import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ResponsiveDrawer from './components/Drawer'
import Searchs from './components/Search'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResponsiveDrawer />
  </React.StrictMode>,
)
