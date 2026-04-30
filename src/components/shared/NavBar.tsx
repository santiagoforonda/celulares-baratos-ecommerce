import { Link, NavLink } from "react-router-dom";
import { navBarLinks } from "../../constans/links";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import { Logo } from "./Logo";
import { useGlobalStore } from "../../store/global.store";
import { useCartStore } from "../../store/cart.store";
import { useUser } from "../../hooks/auth/useUser";
import { LuLoader } from "react-icons/lu";
import { useCustomer } from "../../hooks/auth/useCustomer";

export const NavBar =() =>{

    const openSheet = useGlobalStore(state=> state.openSheet);
    const totalItemsInCart = useCartStore(state => state.totalItemsInCart);

    const setActiveNavMobile= useGlobalStore(state => state.setActiveNavMobile);

    const {session,isLoading} = useUser();

    const userId = session?.user.id;
    const {data:customer} = useCustomer(userId!);

    return(
        <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">

            <Logo></Logo>

            <nav className="space-x-5 hidden md:flex">
                {
                    navBarLinks.map(link =>(
                        <NavLink key={link.id} to={link.href} className={({isActive})=>`${isActive? "text-cyan-600" :""} 
                        transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`}>
                            {link.title}
                        </NavLink>
                    ))
                }
            </nav>

            <div className="flex gap-5 items-center">
                <button className="cursor-pointer" onClick={()=> openSheet("search")}>
                    <HiOutlineSearch size={25}></HiOutlineSearch>
                </button>

                {
                    isLoading ?(
                        <LuLoader className="animate-spin" size={60}></LuLoader>
                    ): session ? (
                        <div className="relative">
                            <Link to="/account" className="border-2 border-slate-700 w-9 h-9 rounded-full grid place-items-center text-lg font-bold">{customer && customer.fullName[0]}</Link>
                        </div>
                    ):(
                        <Link to="/login">
                            <HiOutlineUser size={25}></HiOutlineUser>
                        </Link>
                    )
                }

                <button className="relative cursor-pointer" onClick={()=>openSheet("cart")}>
                    <span className="absolute -bottom-2 right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">{totalItemsInCart}</span>
                    <HiOutlineShoppingBag size={25}></HiOutlineShoppingBag>
                </button>
            </div>

            <button onClick={()=> setActiveNavMobile(true)} className="md:hidden cursor-pointer">
                <FaBarsStaggered size={25}></FaBarsStaggered>
            </button>
        </header>
    );
}