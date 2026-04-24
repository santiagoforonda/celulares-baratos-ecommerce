import { useForm } from "react-hook-form"
import { InputAdrees } from "./InputAdrees"
import { addresSchema, type AddresFormValues } from "../../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemsCheckout } from "./ItemsCheckout";
import { useCreateOrder } from "../../hooks/orders/useCratedOrder";
import { useCartStore } from "../../store/cart.store";
import { ImSpinner2 } from "react-icons/im";


export const FormCheckout = () => {

    const {register,formState:{errors},handleSubmit} = useForm<AddresFormValues>({
        resolver:zodResolver(addresSchema),
    });

    const {mutate:createOrder,isPending} = useCreateOrder();

    const cleanCart = useCartStore(state=>state.cleanCart);
    const cartItems = useCartStore(state=>state.items);
    const totalAmount = useCartStore(state=>state.totalAmount);

    const onSubmit = handleSubmit(data=>{
        const orderInput ={
            address:data,
            cartItems:cartItems.map(item => ({
                variantId: item.variantId,
                quantity:item.quantity,
                price:item.price,
            })),
            totalAmount,
        };

        createOrder(orderInput,{
            onSuccess:()=>{
                cleanCart();
            }
        });
    });

    if(isPending){
        return <div className="flex flex-col gap-3 h-screen items-center justify-center">
            <ImSpinner2 className="animate-spin h-10 w-10"></ImSpinner2>

            <p className="font-medium">Estamos procesando tu pedido</p>
        </div>
    }

  return (
    <article>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>

            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold tracking-normal">Entrega</h3>
            <InputAdrees register={register} errors={errors} name="addressLine1" palceholder="Direccion principal"></InputAdrees>

            <InputAdrees register={register} errors={errors} name="addressLine2" palceholder="Direccion adicional (Opcional)"></InputAdrees>

            <InputAdrees register={register} errors={errors} name="state"       palceholder="Estado / Provincia"></InputAdrees>

            <InputAdrees register={register} errors={errors} name="city" palceholder="Ciudad"></InputAdrees>

            <InputAdrees register={register} errors={errors} name="postalCode" palceholder="Codigo postal"></InputAdrees>

            <select className="border border-slate-200 rounded-md p-3 cursor-pointer" {...register('country')}>
                <option className="cursor-pointer" value="Colombia">Colombia</option>
            </select>
            </div>
            


            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Metodos de envio</p>

                <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-md px-6">
                    <span className="font-normal">Standard</span>
                    <span className="font-semibold">Gratis</span>
                </div>
            </div>


        <div className="flex flex-col">
            <div className="flex justify-between items-center text-sm border border-slate-600 bg-stone-100 py-4 rounded-ss-md rounded-se-md px-6">
                <span>Deposito Bancario</span>
            </div>

            <div className="bg-stone100 text-[13px] p-5 space-y-0.5 border border-gray-200 rounded-es-md rounded-ee-md">
                <p>Compra a traves de transferincia bancaria</p>
                <p>BANCOLOMBIA</p>
                <p>Razon social: CelularesBaratos</p>
                <p>RUT: 3453452345345</p>
                <p>Tipo de cuenta: Ahorro</p>
                <p>Numero de cuenta: 348975623478956</p>
                <p>
                    La informacion sera compartida nuevamente una vez finalizada la compra
                </p>
            </div>
        </div>


        <div className="flex flex-col gap-6">
            <h3 className="font-semibold text-3xl">Resumen del pedido</h3>
            <ItemsCheckout></ItemsCheckout>
        </div>


        <button type="submit" className="bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2">Finalzar pedido</button>
        </form>


        
    </article>
  )
}
