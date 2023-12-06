import { RouteObject } from 'react-router-dom'
import Login from '../pages/Login'
import HomePage from '../pages/HomePage'
import ProductPage from '../pages/Product'
import Auth from '../components/Auth'

const routeConfig: RouteObject[] = [
    { path: '/', element: <HomePage />,index:true},
    {
        path: '/login',
        element: <Login />,
    },
    {
        path:'/product',
        element:<Auth><ProductPage/></Auth>
    }
]

export default routeConfig
