import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "../actions/auth"
import { useUser } from "../hooks/auth/useUser"
import { useEffect } from "react";
import { supabase } from "../supabase/client";
import { Loader } from "../components/shared/Loader";


export const ClientLayout = () => {

    const {isLoading:isLoadingSession} = useUser();
    const navigate = useNavigate();

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event,session)=>{
            if(event === "SIGNED_OUT" || !session){
                navigate("/login");
            }
        })
    },[navigate]);

    if(isLoadingSession){
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
