import { BiWorld } from "react-icons/bi"
import { FaHammer } from "react-icons/fa6"
import { HiMiniReceiptRefund } from "react-icons/hi2"
import { MdLocalShipping } from "react-icons/md"


export const FeatureGrid = () => {
  return (
    <article className="grid grid-cols-2 gap-8 mt-6 mb-16 lg:grid-cols-4 lg:gap-5">
        
        <div className="flex items-center gap-6">
            <MdLocalShipping size={40} className="text-slate-600"></MdLocalShipping>

            <div className="space-y-1">
                <p className="font-samibold">Envio gratis</p>
                <p className="text-sm">En todos nuestros productos</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <HiMiniReceiptRefund size={40} className="text-slate-600"></HiMiniReceiptRefund>

            <div className="space-y-1">
                <p className="font-samibold">Devoluciones</p>
                <p className="text-sm">Devuelve el equipo si no te satisface durante 72 horas</p>
            </div>
        </div>


        <div className="flex items-center gap-6">
            <FaHammer size={40} className="text-slate-600"></FaHammer>

            <div className="space-y-1">
                <p className="font-samibold">Soporte 24/7</p>
                <p className="text-sm">Soporte tecnico en cualquier momento</p>
            </div>
        </div>


        <div className="flex items-center gap-6">
            <BiWorld size={40} className="text-slate-600"></BiWorld>

            <div className="space-y-1">
                <p className="font-samibold">Garantia</p>
                <p className="text-sm">Garantia de un año en todos los equipos</p>
            </div>
        </div>
    </article>
  )
}
