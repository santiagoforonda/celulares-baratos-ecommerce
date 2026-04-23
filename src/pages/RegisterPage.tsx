import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { userRegisterSchema, type UserRegisterFormValues } from "../helpers/formValidator"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/auth/useRegister";
import { LuLoader } from "react-icons/lu";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "../components/shared/Loader";

export const RegisterPage = () => {


    const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterFormValues>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            phone: ""
        },
        resolver: zodResolver(userRegisterSchema),
    })

    const {isLoading,session} = useUser();


    const { mutate, isPending } = useRegister();

    const onRegister = handleSubmit(data => {
        const { email, fullName, password, phone } = data;
        mutate({ email, password, fullName, phone });
    })

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
            <h1 className="text-4xl font-bold capitalize">Registrate</h1>
            <p className="text-sm font-medium">
                Por favor rellena los siguientes campos
            </p>

            {
                isPending ? (
                    <div className="w-full h-full flex justify-center mt-20">
                        <LuLoader className="animate-spin" size={40}></LuLoader>
                    </div>
                ) : (
                    <>
                        <form className="flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]" onSubmit={onRegister}>
                            <input {...register("email")} type="email" placeholder="Ingresa tu correo electronico" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                            </input>
                            {
                                errors.email && (<p className="text-red-500">{errors.email.message}</p>)
                            }

                            <input {...register("fullName")} type="text" placeholder="Nombre completo" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                            </input>
                            {
                                errors.fullName && (<p className="text-red-500">{errors.fullName.message}</p>)
                            }

                            <input {...register("phone")} type="text" placeholder="Celular" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                            </input>
                            {
                                errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)
                            }

                            <input {...register("password")} type="password" placeholder="Ingresa tu contraseña" className="border border-slate-200 text-black px-5 py-4 placeholder:text-black text-sm rounded-full w-full">
                            </input>

                            {
                                errors.password && (<p className="text-red-500">{errors.password.message}</p>)
                            }

                            <button className="bg-black text-white uppercase font-semibold tracking-widets text-xs py-4 rounded-full mt-5 w-full">Iniciar sesion</button>
                        </form>

                        <p className="text-sm text-stone-800">
                            ¿Ya tienes una cuenta?
                            <Link to="/login" className="underline ml-2">
                                inicia sesion
                            </Link>
                        </p>
                    </>
                )
            }
        </div>
    )
}
