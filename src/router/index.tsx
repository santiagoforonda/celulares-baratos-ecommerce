import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { HomePage } from "../pages/HomePage";
import { CellPhonesPage } from "../pages/CellPhonesPage";
import { AboutPage } from "../pages/AboutPage";
import { CellphonePage } from "../pages/CellphonePage";

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
            }
        ]
    }
])