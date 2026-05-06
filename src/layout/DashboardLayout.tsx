import { Outlet, useNavigate } from "react-router-dom"
import { Sidebard } from "../components/dashboard/Sidebard"
import { useUser } from "../hooks/auth/useUser";
import { useEffect, useState } from "react";
import { getSession, getUserRoler } from "../actions/auth";
import { Loader } from "../components/shared/Loader";
import { supabase } from "../supabase/client";


export const DashboardLayout = () => {

  const navigate = useNavigate();

  const {isLoading,session} = useUser();
  const[roleLoading,setRoleLoading] = useState(true);

  useEffect(()=>{
    const checkRole = async()=>{
      setRoleLoading(true);
      const session = await getSession();
      if(!session){
        navigate("/login");
      }

      const role = await getUserRoler(session?.user.id as string);

      if(role !== "admin"){
        navigate("/",{replace:true});
      }
          setRoleLoading(false);
    }
    checkRole();
    
    supabase.auth.onAuthStateChange(async (event,session)=>{
                if(event === "SIGNED_OUT" || !session){
                    navigate("/login",{replace:true});
                }
            })

    
  },[navigate]);

  if(isLoading || !session || roleLoading){
    return <Loader></Loader>
  }


  return (
    <main className="flex bg-gray-100 min-h-screen font-montserrat">
        <Sidebard></Sidebard>

        <article className="container m-5 mt-7 flex-1 text-slate-800 ml-[140px] lg:ml-[270px]">
            <Outlet></Outlet>
        </article>
        
    </main>
  )
}
