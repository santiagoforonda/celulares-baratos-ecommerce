import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../../store/global.store"
import { Link, NavLink } from "react-router-dom";
import { navBarLinks } from "../../constans/links";


export const NavBarMobile = () => {

    const setActiveNavMobile = useGlobalStore(state => state.setActiveNavMobile);
    
    return (
        <div className="bg-white text-black h-screen w-full shadow-lg sheet-panel-in-left fixed z-50 flex justify-center  py-32">
            <button className="absolute top-5 right-5 cursor-pointer" onClick={()=> setActiveNavMobile(false)}>
                    <IoMdClose size={30} className="text-black"></IoMdClose>
            </button>

            <div className="flex flex-col gap-20">
                <Link className="text-4xl font-bold tracking-tighter transition-all" to="/" onClick={()=> setActiveNavMobile(false)}>
                    <p>Celulares
                        <span className="text-cyan-600">Baratos</span>
                    </p>
                </Link>


                <nav className="flex flex-col items-center gap-5">
                    {navBarLinks.map(item=>(
                        <NavLink to={item.href} key={item.id} className={({isActive}) => `${isActive? 'text-cyan-600 underline':''} transition-all duration-300 font-semibold text-xl 
                        hover:text-cyan-600 hover:underline`}>{item.title}</NavLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}
