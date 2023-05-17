import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import HomePage from './Router/HomePage';
import IntroPage from './Router/IntroPage'
import MainPage from './Router/MainPage';
import PdfViewer from './components/DocumentViewer/PdfViewer';
import DocumentPage from './Router/DocumentPage';
import SignupForm from './Router/SignUp';
import SignIn from './Router/SignIn';
const router=createBrowserRouter([
  {path:'/',element:<HomePage/>},
  {path:'/Intro',element:<IntroPage/>},
  {path:'/Main',element:<MainPage/>},
  {path:'/SignUp',element:<SignupForm/>},
  {path:'/SignIn',element:<SignIn/>},
  // {path: "/Doc", element: <DocumentPage/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
