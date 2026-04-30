import { Link, useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cart.store"
import { FormCheckout } from "../components/checkout/FormCheckout";
import { ItemsCheckout } from "../components/checkout/ItemsCheckout";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "../components/shared/Loader";
import { useEffect } from "react";
import { supabase } from "../supabase/client";

export const CheckoutPage = () => {

    const totalItems = useCartStore(state => state.totalItemsInCart);

    const {isLoading} = useUser();

     const navigate = useNavigate();

    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event,session)=>{
                    if(event === "SIGNED_OUT" || !session){
                        navigate("/login");
                    }
                })
    },[navigate]);

    if(isLoading){
        return <Loader></Loader>
    }

   

    return (
    <div style={{minHeight:"calc(100vh-100px)"}}>
        <header className="h-[100px] bg-white text-black flex items-center justify-center flex-col border-b border-slate-200">
            <Link to="/" className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl md:self-start">
                <p>
                    Celulares
                    <span className="text-cyan-600">Baratos</span>
                </p>
            </Link>
        </header>


        <section className="w-full h-full flex relative">
            {
                totalItems === 0? (
                    <div className="flex flex-col items-center justify-center gap-5 w-full" style={{height:"calc(100vh - 100px)"}}>
                        <p>Su carro esta vacio</p>

                        <Link to="/celulares" className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold">
                            Empezar a comprar
                        </Link>
                    </div>
                ):(
                    <>
                        <div className="w-full md:w-[50%] p-10">
                            <FormCheckout></FormCheckout>
                        </div>
                    
                        <div className="bg-stone-100 w-[50%] sticky top-0 right-0 p-10 hidden md:block" style={{minHeight:"calc(100vh - 100px)"}}>
                            <ItemsCheckout></ItemsCheckout>
                        </div>
                    </>
                )
            }

        </section>


    </div>
  )
}
