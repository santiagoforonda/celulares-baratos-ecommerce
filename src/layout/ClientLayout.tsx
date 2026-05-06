import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions/auth"
import { useUser } from "../hooks/auth/useUser"
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";
import { useRoleUer } from "../hooks/auth/useRoleUer";
import { HiOutlineExternalLink } from "react-icons/hi";


export const ClientLayout = () => {

    const {isLoading:isLoadingSession, session} = useUser();
    const navigate = useNavigate();
    const {data:role,isLoading:isLoadingRole} = useRoleUer(session?.user.id as string);

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event,session)=>{
            if(event === "SIGNED_OUT" || !session){
                navigate("/login",{replace:true});
            }
        })
    },[navigate]);

    if(isLoadingSession || isLoadingRole){
        return (<Loader></Loader>)
    }

    const handleLogOut =async () =>{
        await signOut();
    }

  return (
    <div className="flex flex-col gap-5">
        <nav className="flex justify-center gap-10 text-sm font-medium">
            <NavLink to ="/account/pedidos" className={({isActive})=>`${isActive ? "underline":"hover:underline"}`}>
                Pedidos
            </NavLink>

            {
                role ==="admin" &&(
                    <NavLink to="/dashboard/productos" className="flex items-center gap-1 hover:underline">
                        Dashboard
                        <HiOutlineExternalLink size={16} className="inline-block"></HiOutlineExternalLink>
                    </NavLink>
                )
            }

            <button onClick={handleLogOut} className="hover:underline">
                Cerrar sesion
            </button>
        </nav>

        <section className="container mx-auto mt-12 flex-1">
            <Outlet></Outlet>
        </section>
    </div>
  )
}
