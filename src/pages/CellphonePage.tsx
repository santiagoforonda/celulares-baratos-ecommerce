import { Separator } from "../components/shared/Separator"
import { formatPrice } from "../helpers"
import { LuMinus, LuPlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { ProductDescription } from "../components/one-product/ProductDescription";
import { GridImages } from "../components/one-product/GridImages";
import { useProduct } from "../hooks/products/useProduct";
import { useEffect, useMemo, useState } from "react";
import type { Variant } from "../interfaces/product.interface";
import { Tag } from "../components/shared/Tag";
import { Loader } from "../components/shared/Loader";


interface Acc{
    [key:string]:{
        name:string;
        storage:string[]
    }
}

export const CellphonePage = () => {


    const {slug} = useParams<{slug:string}>();

    const {product,isError,isLoading} = useProduct(slug || "");


    const [selectedColor,setSelectedColor] = useState<string | null>(null);
    const [selectedVariant,setSelectedVariant] = useState<Variant | null>(null);
    const [selectedStorage,setSelectedStorage] = useState<string | null>(null);

    

    //Agrupamos las variantes por color
    const color = useMemo(()=>{
        return product?.variants.reduce((acc:Acc,variant:Variant) =>{
            const {color,color_name,storage} = variant;

            if(!acc[color]){
                acc[color] ={
                    name:color_name,
                    storage:[]
                };
            }

            if(!acc[color].storage.includes(storage)){
                acc[color].storage.push(storage);
            }

            return acc;
        },
    {} as Acc) || {}
    },[product?.variants]);

    //Obtener el primer color predeterminado
    const availableColors = Object.keys(color);

    useEffect(()=>{
        if(!selectedColor && availableColors.length > 0){
            setSelectedColor(availableColors[0]);
        }
    },[availableColors,selectedColor]);

    //Actualizar el almacenamiento seleccionado
    useEffect(()=>{
        if(selectedColor && color[selectedColor] && !selectedStorage){
            setSelectedStorage(color[selectedColor].storage[0]);
        }

    },[selectedColor,color,selectedStorage])

    //Obtener la variante seleccionado
    useEffect(()=>{
        if(selectedColor && selectedStorage){
            const variant = product?.variants.find(variant => variant.color === selectedColor && variant.storage === selectedStorage);

            setSelectedVariant(variant as Variant);
        }
    },[selectedColor,selectedStorage,product?.variants])

    //Obtener el stock
    const isOutStock = selectedVariant?.stock ===0;

    if(isLoading){
        return <Loader>
            
        </Loader>
    }

    if(!product || isError){
        
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <p>Producto no encontrado</p>
            </div>
        )
    } 

    return (
    <>
        <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
            <GridImages images={product?.images}></GridImages>

            <div className="flex-1 space-y-5">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {product.name}
                    </h1>

                    <div className="flex gap-5 items-center">
                            <span className="tracking-wide text-lg font-semibold">
                                {formatPrice(selectedVariant?.price || product.variants[0].price)}
                            </span>

                            <div className="relative">
                                {
                                    isOutStock && <Tag contentTag="agotado"></Tag>
                                }
                                
                            </div>
                    </div>

                    <Separator></Separator>

                    <ul className="space-y-2 ml-7 my-10">
                        {
                            product.features.map((feature,index) => (
                                <li key={index} className="text-sm flex items-center gap-2 tracking-tight font-medium">
                                    <span className="bg-black w-[5px] h-[5px] rounded-full"></span>
                                    {feature}
                                </li>
                            ))
                        }
                    </ul>

                    <div className="flex flex-col gap-3">
                        <p>Color: {selectedColor && color[selectedColor].name}</p>

                        <div className="flex gap-3">

                            {
                                availableColors.map(color=>(
                                    <button onClick={()=>setSelectedColor(color)} key={color} className={`w-8 h-8 rounded-full flex justify-center items-center ${selectedColor===color? 'border border-slate-800': ''}`}>
                                        <span className="w-[26px] h-[26px] rounded-full " style={{backgroundColor:color}}/>
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium">Almacenamiento disponible</p>

                        {
                            selectedColor && (
                            <div className="flex gap-3">
                                <select value={selectedStorage || ""} onChange={e => setSelectedStorage(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1">
                                    {
                                        color[selectedColor].storage.map(storage=>(
                                            <option value={storage}>{storage}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            )
                        }
                    </div>


                    {
                        isOutStock ? (<button disabled className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all
                        duration-300 hover:bg-[#e2e2e2] w-full">
                            Agotado
                        </button>):(
                            
                               
                            <>
                                    <div className="space-y-3">
                                        <p className="text-sm font-medium">Cantidad: {product.variants.length}</p>

                                        <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                                            <button>
                                                <LuMinus size={15}></LuMinus>
                                            </button>

                                            <span className="text-slate-500 text-sm">1</span>
                                            <button>
                                                <LuPlus size={15}></LuPlus>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button className="bg-[#f3f3f3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full transition-all
                                        duration-300 hover:bg-[#e2e2e2]">Agregar al carro</button>
                                        <button className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full">Comprar ahora</button>
                                    </div>
                            </>
                        )}

                        <div className="flex pt-2">
                            <div className="flex flex-col gap-1 flex-1 items-center">
                                <CiDeliveryTruck size={35}></CiDeliveryTruck>
                                <p className="text-xs font-semibold">Envio gratis</p>
                            </div>

                            <Link to="#" className="flex flex-col gap-1 flex-1 items-center justify-center">
                                <BsChatLeftText size={30}></BsChatLeftText>
                                <p className="flex flex-col items-center text-xs">
                                    <span className="font-semibold">
                                        ¿Necesitas ayuda?
                                    </span>
                                    Contactenos aqui
                                </p>
                            </Link>
                        </div>
            </div>
        </div>
        
        <ProductDescription content={product.description}></ProductDescription>
    </>
  )
}
