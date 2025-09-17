import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../page/Home";
import Login from './../page/Login';
import Contact from "../page/Contact";
import About from '../page/About';
import Dashboard from '../page/Dashboard';
import LayoutPage from '../page/LayoutPage';
import SignUp from './../page/SignUp';
import ForgotPassword from "../page/password/ForgotPassword";
import VerifyOtp from "../page/password/VerifyOtp";
import ResetPassword from "../page/password/ResetPassword";
import UpdateProfile from "../page/UpdateProfile";
import AuthPage from "../page/AuthPage";
import AddJob from "../common/job/pages/AddJob";
import JobDetails from "../page/JobDetails";
const routes = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage/>,
        children:[
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/about',
                element: <About/>
            },
            {
                path:'/contact',
                element: <Contact/>
            },
            {
                path: 'authpage',
                element: <AuthPage/>
            },
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/dashboard',
                element: <Dashboard/>
            },
            {
                path:'/signup',
                element: <SignUp/>
            },
            {
                path:'/forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: '/verify-otp',
                element: <VerifyOtp/>
            },
            {
                path: '/reset-password',
                element: <ResetPassword/>
            },
            {
                path: '/update-user/:id',
                element: <UpdateProfile/>
            },

            { path: '/add-job',
                element: <AddJob /> 
            },
            {
                path: '/jobdetails/:id',
                element: <JobDetails/>
            }


        ]

    }
])

const Approutes = () => {
    return <RouterProvider router={routes}/>
}

export default Approutes;