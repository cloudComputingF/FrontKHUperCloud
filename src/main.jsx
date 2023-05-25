import React from 'react'
import ReactDOM from 'react-dom'
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import HomePage from './Router/HomePage';
import IntroPage from './Router/IntroPage'
import MainPage from './Router/MainPage';
import SignupForm from './Router/SignUp';
import SignIn from './Router/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FolderPage from './Router/FolderPage';


const router=createBrowserRouter([
  {path:'/',element:<HomePage/>},
  {path:'/Intro',element:<IntroPage/>},
  {path:'/Main',element:<MainPage/>},
  {path:'/SignUp',element:<SignupForm/>},
  {path:'/SignIn',element:<SignIn/>},
  {path: "/folder/:folderId", element:<FolderPage/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Intro" element={<IntroPage />} />
          <Route path="/SignUp" element={<SignupForm />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Main" element={<MainPage />}>
            <Route path="/folder/:folderId" element={<FolderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RouterProvider>
  </React.StrictMode>
);
