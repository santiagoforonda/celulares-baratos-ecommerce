
import { type StateCreator,create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import type { CartItemInterface } from "../interfaces/cart.interface";


export interface CartState{
    items:CartItemInterface[];
    totalItemsInCart: number;
    totalAmount:number;


    addItem:(item:CartItemInterface) => void;
    removeItem:(variantId:string) => void;
    updateQuantity: (variantId:string,quantity:number) => void;
    cleanCart:()=> void;
}


const storeApi: StateCreator<CartState>=((set)=>({
    items:[],

    totalAmount:0,
    totalItemsInCart:0,


    addItem:(item)=>{
        set(state=>{
            const existinItemIndex = state.items.findIndex(
                i => i.variantId === item.variantId
            );

            let updatedItems;

            if(existinItemIndex>=0){
                //Si el item ya existe en el carrito actualizamos la centidad

                updatedItems = state.items.map((i,index)=>index === existinItemIndex?{
                    ...i, quantity: i.quantity+ item.quantity
                }:i);

            }else{
                //Si no existe en el carrito, lo añadimos
                updatedItems= [...state.items,item];
            }

            const newTotalItems = updatedItems.reduce(
                (acc,i) => acc + i.quantity,0
            )

            const newTotalAmount = updatedItems.reduce(
                (acc,i) => acc + i.price * i.quantity,0
            )

            return{
                items:updatedItems,
                totalAmount: newTotalAmount,
                totalItemsInCart: newTotalItems,
            }
        });
    },

    removeItem:(varian)=>{
        set(state =>{
            
            const updatedItems = state.items.filter(i => i.variantId !== varian);

            const newTotalItems = updatedItems.reduce(
                (acc,i) => acc + i.quantity,0
            )

            const newTotalAmount = updatedItems.reduce(
                (acc,i) => acc + i.price * i.quantity,0
            )

            return{
                items:updatedItems,
                totalAmount: newTotalAmount,
                totalItemsInCart: newTotalItems,
            }
        })
    },

    updateQuantity:(variantId,quantity)=>{

            set(state=>{

                const updatedItems = state.items.map(
                i => i.variantId === variantId ? {...i,quantity}: i
            )

            const newTotalItems = updatedItems.reduce(
                (acc,i) => acc + i.quantity,0
            )

            const newTotalAmount = updatedItems.reduce(
                (acc,i) => acc + i.price * i.quantity,0
            )

            return{
                items:updatedItems,
                totalAmount: newTotalAmount,
                totalItemsInCart: newTotalItems,
            }

            })
            
    },

    cleanCart: ()=>{
        set({items:[],totalAmount:0,totalItemsInCart:0});
    },


}));


export const useCartStore = create<CartState>()(
    devtools(persist(storeApi,{
        name:"cart-store",
    }))
);