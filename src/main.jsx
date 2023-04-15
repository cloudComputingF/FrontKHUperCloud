import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Searchs from './components/Search'
import MainPage from './components/MainPage'
import HomePage from './components/HomePage'
import ContentsBar from './components/ContentsBar'
import RecipeReviewCard from './components/ImageCard'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainPage/>
  </React.StrictMode>,
)
