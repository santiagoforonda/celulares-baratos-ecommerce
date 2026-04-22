import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store"
import { Cart } from "./Cart";
import { Search } from "./Search";


export const Sheet = () => {

    const sheetContent = useGlobalStore(state => state.sheetContent);
    const closeSheet = useGlobalStore(state => state.closeSheet);

    const sheetRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        document.body.style.overflow = "hidden";

        //Funcion para manejar los clicks fuera del click

        const handleOutSideClick = (event:MouseEvent)=>{
            
            if(sheetRef.current && !sheetRef.current.contains(event.target as Node)){
                closeSheet();
            }
        };

        //Agregar event listener
        document.addEventListener("mousedown",handleOutSideClick);

        return () =>{
            document.body.style.overflow = "unset";
            document.removeEventListener("mousedown", handleOutSideClick);
        }
    },[closeSheet]);

    //Funcion para saber el componente a renderizar
    const renderContent =() =>{
        switch(sheetContent){
            case "cart" :
                return <Cart></Cart>;
            case "search":
                return <Search></Search>;
            default:
                    return null;
        }
    }

    return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-end sheet-overlay-in'>
			<div
				ref={sheetRef}
                className='bg-white text-black h-screen w-125 max-w-full shadow-lg sheet-panel-in'
			>
                <div key={sheetContent ?? "empty"} className='h-full sheet-content-in'>
                    {renderContent()}
                </div>
			</div>
		</div>
    )
}
