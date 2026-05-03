import { Outlet } from "react-router-dom"
import { Sidebard } from "../components/dashboard/Sidebard"


export const DashboardLayout = () => {
  return (
    <main className="flex bg-gray-100 min-h-screen font-montserrat">
        <Sidebard></Sidebard>

        <article className="container m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]">
            <Outlet></Outlet>
        </article>
        
    </main>
  )
}
