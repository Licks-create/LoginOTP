import React from "react";
import {createBrowserRouter,RouterProvider,BrowserRouter,Routes,Route} from "react-router-dom"
import {Provider} from "react-redux"
import Username from "./components/Username";
import Password from "./components/Password";
import Reset from "./components/Reset";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";

// middleware
import { AuthorizedUser } from "./middleware/auth";


const router=createBrowserRouter([
  {
    path:'/',
    element:<Username>Root Route</Username>
  },{
    path:'/register',
    element:<Register>Register Route</Register>
  },{
    path:'/password',
    element:<Password>Register Route</Password>
  }
  ,{
    path:'/profile',
    element:
    // <AuthorizedUser>
    // </AuthorizedUser>  
      <Profile>Register Route</Profile>
  }
  ,{
    path:'/recovery',
    element:<Recovery>Register Route</Recovery>
  }
  ,{
    path:'/reset',
    element:<Reset>Register Route</Reset>
  }
  ,{
    path:'*',
    element:<PageNotFound>Register Route</PageNotFound>
  }
])

 function App() {
  return (
   <main>
    <RouterProvider router={router}></RouterProvider>
   </main>
  );
}

export default App;
