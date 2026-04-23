import React, { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useLogin } from "../hooks/auth/useLogin";
import { LuLoader } from "react-icons/lu";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "../components/shared/Loader";


export const LoginPage = () => {

    const {isPending,mutate} = useLogin();
    const {session,isLoading} = useUser();

    const [email,setEmail] = useState("");
    const [password,setPasword] = useState("");


    const onLogin =(e: React.FormEvent)=>{
        e.preventDefault();

        mutate({email,password});
    }

    if(isLoading){
        return (
            <Loader></Loader>
        )
    }

    if(session){
        return <Navigate to="/"></Navigate>
    }

    return (
        <div className="h-full flex flex-col items-center mt-12 gap-5">
            <h1 className="text-4xl font-bold capitalize">Iniciar sesion</h1>
            <p className="text-sm font-medium">
                ¡Que bueno tenerte de vuelta!
            </p>

            {
                isPending ? (
                    <div className="w-full h-full flex justify-center mt-20">
                                        <LuLoader className="animate-spin" size={40}></LuLoader>
                                    </div>
                ):(
                    <>
                <form onSubmit={onLogin} className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Ingresa tu correo electronico" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                    </input>

                    <input value={password} onChange={(e)=>setPasword(e.target.value)} type="password" placeholder="Ingresa tu contraseña" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                    </input>

                    <button  className="bg-black text-white uppercase font-semibold tracking-widets text-xs py-4 rounded-full mt-5 w-full">Iniciar sesion</button>
                </form>

                <p className="text-sm text-stone-800">
                    ¿No tienes cuenta?
                    <Link to="/registro" className="underline ml-2">
                        Registrate
                    </Link>
                    
                </p>
            </>
                )
            }

        </div>
    )
}
