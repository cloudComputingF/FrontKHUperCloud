import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ResponsiveDrawer from './components/Drawer'
import Searchs from './components/Search'
import ResponsiveAppBar from './components/MainPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResponsiveDrawer />
  </React.StrictMode>,
)
