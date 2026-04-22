import { HiOutlineShoppingBag } from "react-icons/hi"
import { IoMdClose } from "react-icons/io"
import { useGlobalStore } from "../../store/global.store"
import { Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CartItem } from "./CartItem";
import { useCartStore } from "../../store/cart.store";

export const Cart = () => {

  

  const closeSheet = useGlobalStore(state=>state.closeSheet);
  const cartItems = useCartStore(state=>state.items);
  const cleanCart =  useCartStore(state => state.cleanCart);
  const totalItemsInCart = useCartStore(state=> state.totalItemsInCart);

  return (
    <div className="flex flex-col h-full">
        <div className="px-5 py-7 flex justify-between items-center border-b border-slate-200">
            <span className="flex gap-3 items-center font-semibold">
              <HiOutlineShoppingBag size={20}></HiOutlineShoppingBag>
              {totalItemsInCart} articulos
            </span>

            <button onClick={closeSheet}>
                <IoMdClose size={30} className="text-black"></IoMdClose>
            </button>
        </div>

        {/*Lista de productos añadidos al carrito */}

        {
          totalItemsInCart > 0 ? (
            <>
          <div className="p-7 overflow-auto flex-1">


            <ul className="space-y-9">
              {cartItems.map(item =>(
                <CartItem item={item} key={item.variantId}></CartItem>
              ))}
            </ul>


          </div>

          <div className="mt-4 p-7">
            <Link to="/checkout" className="w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-3">
              <RiSecurePaymentLine size={24}></RiSecurePaymentLine>
              Continuar con la compra
            </Link>

            <button onClick={cleanCart} className="mt-3 w-full text-black border border-black py-3">
              Limpiar carrito
            </button>
          </div>
        </>
          ):(<div className="flex flex-col items-center justify-center h-full gap-7">
              <p className="text-sm font-medium tracking-tight">
                Su carro esta vacio
              </p>
              <Link to="/celulares" className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold" onClick={closeSheet}>
                  Empezar a comprar
              </Link>
          </div>)
        }
    </div>
  )
}
