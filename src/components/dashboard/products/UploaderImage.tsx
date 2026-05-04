import type { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { ProductsFormValues } from "../../../lib/validators";
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props{
    setValue:UseFormSetValue<ProductsFormValues>;
    watch:UseFormWatch<ProductsFormValues>;
    erros:FieldErrors<ProductsFormValues>;
}

interface ImagePreviw{
    file?:File,
    previewUrl:string;
}


export const UploaderImage = ({erros,setValue,watch}:Props) => {

    const [images,setImages] = useState<ImagePreviw[]>([]);

    const formImages = watch("images");

    const handleImageChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            const newImages = Array.from(e.target.files).map(file=>({
                file,
                previewUrl:URL.createObjectURL(file),
            }));

            const updatedImages = [...images,...newImages];
            setImages(updatedImages);
            setValue("images",updatedImages.map(img=>img.file || img.previewUrl));
        }
    }

    const handleRemoveImage =(index:number)=>{
        const updatedImages = images.filter((_,i)=> i!==index);
        setImages(updatedImages);
        setValue("images",updatedImages.map(img=>img.file || img.previewUrl));
    }

  return (
    <>
    <input type="file" accept="image/*" multiple className="block w-full text-sm text-slate-500 
    file:mr-4 file:py-2 file:px-4 file:px-4 
    file:rounded-md file:border-0 file:text-sm  
    file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200" onChange={handleImageChange}></input>

    <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
        {
            images.map((image,index)=>(
                <div key={index}>
                    <div className="border border-gray-200 w-full h-20 rounded-md p-1 relative lg:h-28">
                        <img src={image.previewUrl} alt={`preview ${index}`} className="rounded-md w-full h-full object-contain"></img>
                        <button type="button" onClick={()=>handleRemoveImage(index)} className="flex justify-end absolute -top-3 -right-4 hover:scale-110 transition-all z-10">
                            <IoIosCloseCircleOutline size={22} className="text-red-500"></IoIosCloseCircleOutline>
                        </button>
                    </div>
                </div>
            ))
        }
    </div>

    {formImages?.length === 0 && erros.images && (
				<p className='text-red-500 text-xs mt-1'>
					{erros.images.message}
				</p>
			)}
    </>
  )
}
