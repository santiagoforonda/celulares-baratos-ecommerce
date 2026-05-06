import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { productSchema, type ProductsFormValues } from "../../../lib/validators"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate, useParams } from "react-router-dom";
import { SectionFormProduct } from "./SectionFormProduct";
import { InputForm } from "./InputForm";
import { FeatureInput } from "./FeatureInput";
import { useEffect } from "react";
import { generateSlug } from "../../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UploaderImage } from "./UploaderImage";
import { AreaDescription } from "./AreaDescription";
import { useCreateProduct } from "../../../hooks/products/useCreateProduct";
import { Loader } from "../../shared/Loader";
import { useProduct } from "../../../hooks/products/useProduct";
import { useUpdateProduct } from "../../../hooks/products/useUpdateProduct";
import type { JSONContent } from "@tiptap/react";

interface Props{
    titleForm:string;
}

export const FormProduct = ({titleForm}:Props) => {

    const navigate = useNavigate();

    const {handleSubmit,register,control,formState:{errors},setValue,watch} = useForm<ProductsFormValues>({
            resolver:zodResolver(productSchema)
    })

    const {slug} = useParams<{slug:string}>();

    const {isPending,mutate:createProduct} = useCreateProduct();
    const {product,isLoading} = useProduct(slug || "");
    const {mutate:updateProduct,isPending:isUpdatePending} = useUpdateProduct(product?.id || "");

    useEffect(()=>{
        if(product && !isLoading){
            setValue("name",product.name);
            setValue("slug",product.slug);
            setValue("brand",product.brand);
            setValue("features", 
                product.features.map((f:string)=>({value:f})));
            setValue("description",product.description as JSONContent);
            setValue("images",product.images);
            setValue("variants",product.variants.map(v=>({
                id:v.id,
                stock: v.stock,
                price:v.price,
                storage:v.storage,
                color_name:v.color_name,
                color:v.color
            })))
        }
    },[product,isLoading,setValue]);

    const onSubmit = handleSubmit((data)=>{

        const features = data.features.map(feature=>feature.value);
        if(slug){
            updateProduct({
                name:data.name,
            brand:data.brand,
            slug:data.slug,
            variants:data.variants,
            images:data.images,
            description:data.description,
            features:features
            })
        }else{
            

        createProduct({
            name:data.name,
            brand:data.brand,
            slug:data.slug,
            variants:data.variants,
            images:data.images,
            description:data.description,
            features:features
        })
        }
    })

    const watchName = watch("name");

    useEffect(()=>{
        if(!watchName){
            return;
        }

        const generatedSlug = generateSlug(watchName);
        setValue("slug",generatedSlug,{shouldValidate:true});
    },[watchName,setValue]);
    

    if(isPending || isUpdatePending || isLoading){
        return <Loader></Loader>
    }

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
                <InputForm type="text" label="slug" name="slug"  palceholder="iphone-13-pro-max" register={register} errors={errors} ></InputForm>
                <InputForm type="text" label="marca" name="brand" palceholder="Apple" register={register} errors={errors} required ></InputForm>
            </SectionFormProduct>


            <SectionFormProduct titleSection="Variantes del producto" className="lg:col-span-2 h-fit">
                <VariantsInput control={control} errors={errors} register={register}></VariantsInput>
            </SectionFormProduct>

            <SectionFormProduct titleSection="Imagenes del producto">
                    <UploaderImage erros={errors} setValue={setValue} watch={watch}></UploaderImage>
            </SectionFormProduct>

            <SectionFormProduct titleSection="Descripcion del producto" className="col-span-full">
                <AreaDescription setValue={setValue} errors={errors} initialContent={product?.description as JSONContent}></AreaDescription>
            </SectionFormProduct>

            <div className="flex gap-3 absolute top-0 right-0">
                <button className="btn-secondary-outline cursor-pointer" type="button" onClick={()=>navigate(-1)}>Cancelar</button>
                <button className="btn-primary min-w-44 cursor-pointer" type="submit">Guardar producto</button>
            </div>
        </form>
    </section>
  )
}
