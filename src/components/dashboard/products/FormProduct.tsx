import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { productSchema, type ProductsFormValues } from "../../../lib/validators"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import { SectionFormProduct } from "./SectionFormProduct";
import { InputForm } from "./InputForm";
import { FeatureInput } from "./FeatureInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UploaderImage } from "./UploaderImage";
import { AreaDescription } from "./AreaDescription";

interface Props{
    titleForm:string;
}

export const FormProduct = ({titleForm}:Props) => {

    const navigate = useNavigate();

    const {handleSubmit,register,control,formState:{errors},setValue,watch} = useForm<ProductsFormValues>({
            resolver:zodResolver(productSchema)
    })

    const onSubmit = handleSubmit((data)=>{
        console.log(data);
    })

    const watchName = watch("name");

    useEffect(()=>{
        if(!watchName){
            return;
        }

        const generatedSlug = generateSlug(watchName);
        setValue("slug",generatedSlug,{shouldValidate:true});
    },[watchName,setValue]);
    

  return (
    <section className="flex flex-col gap-6 relative ">
        <article className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <button className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105" onClick={()=>navigate(-1)}>
                    <IoIosArrowBack size={18} className="transition-all group-hover:scale-125"></IoIosArrowBack>
                </button>
                <h2 className="font-bold tracking-tight text-2xl capitalize">
                    {titleForm}
                </h2>
            </div>
        </article>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1" onSubmit={onSubmit}>

            <SectionFormProduct titleSection="Detalles del producto" className="lg:col-span-2 lg:row-span-2">
                <InputForm type="text" palceholder="Iphone 13 pro max" label="nombre" name="name" register={register} required errors={errors} ></InputForm>
                <FeatureInput control={control} errors={errors} ></FeatureInput>
            </SectionFormProduct>


            <SectionFormProduct>
                <InputForm type="text" label="slug" name="slug" palceholder="Iphone 13 pro max" register={register} errors={errors} ></InputForm>
                <InputForm type="text" label="slug" name="name" palceholder="Apple" register={register} errors={errors} required ></InputForm>
            </SectionFormProduct>


            <SectionFormProduct titleSection="Variantes del producto" className="lg:col-span-2 h-fit">
                <VariantsInput control={control} errors={errors} register={register}></VariantsInput>
            </SectionFormProduct>

            <SectionFormProduct titleSection="Imagenes del producto">
                    <UploaderImage erros={errors} setValue={setValue} watch={watch}></UploaderImage>
            </SectionFormProduct>

            <SectionFormProduct titleSection="Descripcion del producto" className="col-span-full">
                <AreaDescription setValue={setValue} errors={errors}></AreaDescription>
            </SectionFormProduct>

            <div className="flex gap-3 absolute top-0 right-0">
                <button className="btn-secondary-ouline" type="button" onClick={()=>navigate(-1)}>Cancelar</button>
                <button className="btn-primary" type="submit">Guardar producto</button>
            </div>
        </form>
    </section>
  )
}
