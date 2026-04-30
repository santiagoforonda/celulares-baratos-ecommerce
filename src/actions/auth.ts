import { supabase } from "../supabase/client";

interface IAuthLogin{
    email:string;
    password:string;
}

interface IAuthRegister {
    email:string;
    password:string;
    fullName: string;
    phone?:string;
}

export const signup = async({email,fullName,password,phone}:IAuthRegister) =>{
    try {
        //1. crear o registrar el usuario
        const {data,error} = await supabase.auth.signUp({
            email,password,
        });

        if(error){
            throw new Error(error.message);
        }

        const userId = data.user?.id;

        if(!userId){
            throw new Error("Error al obtener el usuario");
        }

        //2. Autenticar al usuario
        const {error:signInError} = await supabase.auth.signInWithPassword({
            email,password,
        })

        if(signInError){
            throw new Error("Credenciales incorrectas");
        }

        //3 Insertar el rol por defecto - CUSTOMER (cliente)
        const {error:rolError} = await supabase.from("user_roles").insert({
            user_id:userId,
            role:"customer",
        })

        if(rolError){
            console.info(rolError)
            throw new Error("Error al registrar el rol del usuario");
        }


        //4 Insertar los datos del usuario en la tabla customers (Clientes)
        const {error:customError} = await supabase.from("customers").insert({
            user_id:userId,
            fullName:fullName,
            phone,
            email,
        });

        if(customError){
            throw new Error("Error al registrar los datos del usuario");
        }

    } catch (error) {
        console.info(error);
        throw new Error("Error al registrar el usuario");
    }
}


export const sigIn = async ({email,password}:IAuthLogin)=>{

    const {data,error} = await supabase.auth.signInWithPassword({
        email,password
    })


    if(error){
        console.info(error);
        throw new Error("Creedenciales incorrectas");
    }

    return data;

}


export const signOut = async()=>{
    const {error} = await supabase.auth.signOut();

    if(error){
        console.info(error);
        throw new Error("Error al cargar la sesion");
    }
}


export const getSession = async() =>{
    const {data,error} = await supabase.auth.getSession();

    if(error){
        console.info(error);
        throw new Error("Error al obtener la sesion");
    }

    return data;
}

export const getUserDate =async(userId:string)=>{
    const {data,error} = await supabase.from("customers").select("*").eq("user_id",userId).single();

    if(error){
        console.info(error);
        throw new Error("Error al obtener la sesion");
    }

    return data;
    
}