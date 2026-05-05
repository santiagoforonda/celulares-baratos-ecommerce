import { extracFile } from "../helpers";
import type { ProductInput } from "../interfaces/product.interface";
import { supabase } from "../supabase/client"


export const getProducts = async(page:number)=>{

    const itemsPerPage =10;
    const from =(page-1) * itemsPerPage;
    const to = from + itemsPerPage-1;

    const {data:products,error,count} = await supabase.from("products").select("*, variants(*)",{count:"exact"}).order("created_at",{ascending:false}).range(from,to);

    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }

    return {products,count};
}

export const getFilteredProducts = async({page =1,brands=[]}:{page:number;brands:string[]})=>{

    const itemPerPage =10;

    const from = (page -1) * itemPerPage;
    const to = from + itemPerPage-1;

    let query = supabase.from("products").select("*, variants(*)",{count:"exact"}).order("created_at",{ascending:false}).range(from,to);

    if(brands.length > 0){
        query = query.in("brand", brands);
    }

    const {data,error,count} = await query;

    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }

    return {data,count};
}

export const getRecentProducts = async()=>{

    const {data:products,error} = await supabase.from("products").select("*, variants(*)").order("created_at", {ascending:false}).limit(4);

    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }
    return products;
}


export const getRandomsProducts = async()=>{

    const {data:products,error} = await supabase.from("products").select("*, variants(*)").limit(20);

    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }

    const randomProducts = products.sort(()=> 0.5 - Math.random()).slice(0,4);

    return randomProducts;
}

export const getProductsBySlug = async(slug:string)=>{

    const {data,error} = await supabase.from("products").select("*, variants(*)").eq("slug",slug).single();

    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }

    return data;
}

export const searchProducts = async(searchTerm:string)=>{

    const {data,error} = await supabase.from("products").select("*, variants(*)").ilike("name",`%${searchTerm}%`);


    if(error){
        console.info(error.message);
        throw new Error(error.message);
    }

    return data;

}


/*CRUD*/

export const createProduct = async(productInput:ProductInput)=>{

    try{
        //1. Crear el producto para obtener el ID del producto
        const {data:product,error:productError} = await supabase.from("products").insert({
            name:productInput.name,
            brand:productInput.brand,
            slug:productInput.slug,
            features:productInput.features,
            description:productInput.description,
            images:[],
            
        }).select().single();

        if(productError){
            throw new Error(productError.message);
        }

        //2. Subir las imagenes al bucket dentro de una carpeta que se creara a partir del producto
        const folderName = product.id;

        const upLoadedImages = await Promise.all(
            productInput.images.map(async (image)=>{
                const {data,error} = await supabase.storage.from("product-images").upload(`${folderName}/${product.id}-${image.name}`,image)

                if(error){
                    throw new Error(error.message);
                }

                const imageUrl = `${supabase.storage.from("product-images").getPublicUrl(data.path).data.publicUrl}`;

                return imageUrl;
            })
        )

        //3. actualizar el producto con las imagenes subidas
        const {error: updatedError} = await supabase.from("products").update({
            images: upLoadedImages,
        }).eq("id", product.id);

        if(updatedError) throw new Error(updatedError.message);

        //4. Crear variantes del producto
        const variants = productInput.variants.map(variant =>({
            product_id:product.id,
            stock:variant.stock,
            price:variant.price,
            storage:variant.storage,
            color:variant.color,
            color_name:variant.color_name,
        }));

        const {error:variantError} = await supabase.from("variants").insert(variants);

        if(variantError) {throw new Error(variantError.message)};

        return product;
    }catch(error){
        console.log(error);
        if(error instanceof Error){
            throw new Error(error.message);
        }
        throw new Error("Error al crear el producto");
    }


}

export const deleteProduct = async(productId:string) =>{

    //1. Eliminar las variantes del productos
    const {error:variantsError} = await supabase.from("variants").delete().eq("product_id",productId);


    if(variantsError){
        throw new Error(variantsError.message);
    }

    //2.Obtener las imagenes del producto
    const {data: productImages, error:productImagesError} = await supabase.from("products").select("images").eq("id",productId).single();

    if(productImagesError) {
        throw new Error(productImagesError.message);
    }

    //3. Eliminar el producto
    const {error: productDeleteError} = await supabase.from("products").delete().eq("id", productId);

    if(productDeleteError) {throw new Error(productDeleteError.message);}

    //4 Eliminar las imagenes del bucket

    if(productImages.images.length>0){
        const folderName = productId;
        const paths = productImages.images.map(image=>{
            const fileName = image.split("/").pop();
            return `${folderName}/${fileName}`
        });

        const {error:storageError} = await supabase.storage.from("product-iamges").remove(paths);

        if(storageError){
            throw new Error(storageError.message)
        }
    }

    return true;
}



export const updateProduct =async(productId:string,productInput:ProductInput)=>{


    //1. Obtener las imagenes actuales del producto
    const {data: currentProduct,error:currentError} = await supabase.from("products").select("images").eq("id",productId).single();

    if(currentError){
        throw new Error(currentError.message);
    }

    const existingImage = currentProduct.images || [];

    //2. actualizar la informacion individual del producto

    const {data:updatedProduct,error:productError} = await supabase.from("products").update({
        name:productInput.name,
        brand:productInput.brand,
        slug:productInput.slug,
        features:productInput.features,
        description:productInput.description,
    }).eq("id",productId).select().single();


    if(productError){
        throw new Error(productError.message);
    }


    //3 manejo de imagenes
    const folderName = productId;

    const validImages = productInput.images.filter(image=> image);

    const imageToDelete = existingImage.filter(
        image => !validImages.includes(image)
    );

    const filesToDelete = imageToDelete.map(extracFile)

    if(filesToDelete.length>0){
        const {error:deleteImageError} = await supabase.storage.from("product-images").remove(filesToDelete);

        if(deleteImageError){
            throw new Error(deleteImageError.message);
        }else{
            console.log("Imagenes eliminadas");
        }
    }

    const upLoadedImages = await Promise.all(
        validImages.map(async image => {
            if(image instanceof File){
                const {data,error} = await supabase.storage.from("product-images").upload(`${folderName}/${productId}-${image.name}`,image);

                if(error){
                    throw new Error(error.message);
                }

                const imageUrl = supabase.storage.from("product-images").getPublicUrl(data.path).data.publicUrl;

                return imageUrl;
            }else if(typeof image === "string"){
                return image;
            }else{
                throw new Error("Tipo de imagen no soportada");
            }
        })
    );

    //4. actualizar el producto con las imagenes actualizadas

    const {error:updateImagesError} = await supabase.from("products").update({images:upLoadedImages}).eq("id",productId);

    if(updateImagesError){
        throw new Error(updateImagesError.message);
    }


    //5. Actualizar las variantes del producto
    const existingVariants = productInput.variants.filter(v=>v.id);
    const newVariants = productInput.variants.filter(v=>!v.id);

    if(existingVariants.length > 0){
        const {error:updateVariantErrror} = await supabase.from("variants").upsert(existingVariants.map(variant=>({
            id:variant.id,
            product_id:productId,
            stock:variant.stock,
            price:variant.price,
            storage:variant.storage,
            color:variant.color,
            color_name: variant.color_name
        })),{onConflict:"id"}
    )

    if(updateVariantErrror){
        throw new Error(updateVariantErrror.message)
    }

    }

    let newvariantsId:string[] = [];

    if(newVariants.length>0){
        const {data,error:insertVariantsError} = await supabase.from("variants").insert(newVariants.map(variant =>({
            product_id:productId,
            stock:variant.stock,
            price:variant.price,
            storage:variant.storage,
            color:variant.color,
            color_name: variant.color_name
        }))).select();

        if(insertVariantsError){
            throw new Error(insertVariantsError.message);
        }

        newvariantsId=data.map(variant=> variant.id);
    }

    
    const currentVarintId = [...existingVariants.map(v => v.id),
        ...newvariantsId
    ]

    const {error:deleteVariantsError} = await supabase.from("variants").delete().eq("product_id",productId).not("id","in",`(${currentVarintId ? currentVarintId.join(","):0})`)

    if(deleteVariantsError){
        throw new Error(deleteVariantsError.message);
    }

    return updatedProduct;
};