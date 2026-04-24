import { Link, useParams } from "react-router-dom"
import { useOrder } from "../hooks/orders/useOrder";
import { Loader } from "../components/shared/Loader";
import { CiCircleCheck } from "react-icons/ci";
import { formatPrice } from "../helpers";


export const ThnakyouPage = () => {

    const {id} = useParams<{id:string}>();
    const {data,isError,isLoading} = useOrder(Number(id));

    if(isLoading || !data){
        return(
            <Loader></Loader>
        )
    }

    if(isError){
        return(
            <div>
                Error al cargar la orden
            </div>
        )
    }

    return (
    <div className="flex flex-col h-screen">
        <header className="text-black flex items-center justify-center flex-col px-10 py-12">
                <Link className="text-4xl font-bold self-center tracking-tighter transition-all md:text-5xl" to="/">
                    <p>Celulares</p>
                    <span className="text-cyan-600">Baratos</span>
                </Link>
        </header>
        
        <section className="container mx-auto flex-1 flex flex-col items-center gap-10">
            <article className="flex gap-3 items-center">
                <CiCircleCheck size={40}></CiCircleCheck>
                <p className="text-4xl">
                    GRACIAS, {data.customer.fullName}
                </p>
            </article>

            <article className="border border-slate-200 w-full md:w-[600px] p-5 rounded-md space-y-3">
                <h3 className="font-medium">Tu pedido esta confirmado</h3>

                <p className="text-sm">Gracias por realizar tu compra en celulares baratos</p>

                <div className="space-y-0.5 text-sm ">
                    <p>Compra a traves de transferincia bancaria</p>
                    <p>BANCOLOMBIA</p>
                    <p>Razon social: CelularesBaratos</p>
                    <p>RUT: 3453452345345</p>
                    <p>Tipo de cuenta: Ahorro</p>
                    <p>Numero de cuenta: 348975623478956</p>
                </div>

                <p className="text-sm">
                    Una vez realizada la transferencia comparte tu comprobante
                </p>
            </article>

            <article className="border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]">
                <h3 className="font-medium">Detalles del pedido</h3>

                <div className="flex flex-col">
                    <ul className="space-y-3">
                        {
                            data.orderItems.map( (item,index) =>(
                                <li key={index} className="flex justify-between items-center gap-3">
                                    <figure className="flex">
                                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-contain"></img>
                                    </figure>

                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <p className="font-semibold">
                                                {item.productName}
                                            </p>

                                            <p className="text-sm font-medium text-gray-600 mt-1">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <p className="text-[13px] text-gray-600">
                                                {item.storage} / {item.color_name}
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                )
                            )
                        }
                    </ul>


                    <div className="flex justify-between">
                        <span className="font-semibold">
                            Total:
                        </span>
                        <span className="font-semibold">
                            {formatPrice(data.total_amount)}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col text-sm">
                            <p className="font-semibold">
                                Informacion de contacto
                            </p>

                            <p>{
                                data.customer.email
                            }</p>
                    </div>

                    <div className="flex flex-col text-sm">
                            <p className="font-semibold">Metodos de pago:</p>
                            <p>Deposito bancario - {formatPrice(data.total_amount)}</p>
                    </div>

                    <div className="flex flex-col text-sm">
                            <p className="font-semibold">Direccion de envio:</p>
                            <p>{data.address.addressLine1}</p>
                            <p>{data.address.addressLine2 && data.address.addressLine2}</p>
                            <p>{data.address.state}</p>
                            <p>{data.address.city}</p>
                            <p>{data.address.postalCode}</p>
                            <p>{data.address.country}</p>
                    </div>
                    
                    <div className="flex flex-col text-sm">
                        <p className="font-semibold">Metodo de pago</p>
                        <p>standard</p>
                    </div>
                </div>
            </article>

            <div className="flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-[600] md:gap-0">
                <p className="text-sm">¿Necesitas ayuda?</p>
                <Link className="text-white bg-black py-4 text-sm rounded-md px-5 tracking-tight font-semibold" to ="/celulares">Seguir comprando</Link>
            </div>

        </section>
    </div>
    )
}
