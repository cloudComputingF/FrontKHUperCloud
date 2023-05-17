import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import HomePage from './Router/HomePage';
import IntroPage from './Router/IntroPage'
import MainPage from './Router/MainPage';
import PdfViewer from './components/DocumentViewer/PdfViewer';
import DocumentPage from './Router/DocumentPage';
import SignupForm from './Router/SignUp';
const router=createBrowserRouter([
  {path:'/',element:<HomePage/>},
  {path:'/Intro',element:<IntroPage/>},
  {path:'/Main',element:<DocumentPage/>},
  {path:'/Sign',element:<SignupForm/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
