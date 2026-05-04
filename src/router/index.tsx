import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { HomePage } from "../pages/HomePage";
import { CellPhonesPage } from "../pages/CellPhonesPage";
import { AboutPage } from "../pages/AboutPage";
import { CellphonePage } from "../pages/CellphonePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ClientLayout } from "../layout/ClientLayout";
import { OrdersUserPage } from "../pages/OrdersUserPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ThnakyouPage } from "../pages/ThnakyouPage";
import { OrderUserPage } from "../pages/OrderUserPage";
import { DashboardLayout } from "../layout/DashboardLayout";
import { DashboardProductsPage } from "../pages/dashboard/DashboardProductsPage";
import { NewProductPage } from "../pages/dashboard/NewProductPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<HomePage></HomePage>
            },
            {
                path:"celulares",
                element:<CellPhonesPage></CellPhonesPage>
            },
            {
                path:"celulares/:slug",
                element:<CellphonePage></CellphonePage>

            },
            {
                path:"nosotros",
                element:<AboutPage></AboutPage>
            },
            {
                path:"login",
                element:<LoginPage></LoginPage>
            },
            {
                path:"registro",
                element:<RegisterPage></RegisterPage>
            },
            {
                path:"account",
                element:<ClientLayout></ClientLayout>,
                children:[
                    {
                        path:"",
                        element:<Navigate to="/account/pedidos"></Navigate>
                    },
                    {
                        path:"pedidos",
                        element:<OrdersUserPage></OrdersUserPage>
                    },
                    {
                        path:"pedido/:id",
                        element:<OrderUserPage></OrderUserPage>
                    }
                ]
            },
            
        ]
    },
    {
                path:"/checkout",
                element: <CheckoutPage></CheckoutPage>
    },
    {
        path:"/checkout/:id/thank-you",
        element:<ThnakyouPage></ThnakyouPage>
    },
    {
        path:"/dashboard",
        element:<DashboardLayout></DashboardLayout>,
        children:[
            {
                index:true,
                element:<Navigate to="/dashboard/productos"></Navigate>
            },
            {
                path:"productos",
                element:<DashboardProductsPage></DashboardProductsPage>
            },
            {
                path:"productos/new",
                element:<NewProductPage></NewProductPage>
            }
        ]
    }
])