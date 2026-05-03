import { NavLink } from "react-router-dom"
import { dashboardLinks } from "../../constans/links"
import { Logo } from "../shared/Logo"
import { IoLogOutOutline } from "react-icons/io5"
import { signOut } from "../../actions/auth"

export const Sidebard = () => {

    const handleLogOut = async()=>{
        await signOut();
    }

  return (
    <div className="w-[120px] bg-stone-800 text-white flex flex-col gap-10 items-center p-5 fixed h-screen lg:w-[250px]">
        <Logo isDashboard></Logo>

        <nav className="w-full space-y-5 flex-1">
            {
                dashboardLinks.map(link =>(
                    <NavLink key={link.id} to={link.href} className={({isActive}) => `flex items-center justify-center gap-3 pl-0 py-3 transition-all duration-300 rounded-md ${isActive? "text-white bg-cyan-600 " :"hover:text-white hover:bg-cyan-600"} lg:pl-5 lg:justify-start`}>
                        {link.icon}
                        <p className="font-semibold hidden lg:block">
                            {link.title}
                        </p>
                    </NavLink>
                ))
            }
        </nav>
        <button className="bg-red-500 w-full py-[10px] rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline" onClick={handleLogOut}>
            <span className="hidden lg:block">Cerrar sesion</span>
            <IoLogOutOutline size={20} className="inline-block"></IoLogOutOutline>
        </button>
    </div>
  )
}
