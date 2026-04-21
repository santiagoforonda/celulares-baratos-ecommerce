import { useQuery } from "@tanstack/react-query"
import { getProductsBySlug } from "../../actions/product"

export const useProduct =(slug:string)=>{


    const {data:product,isLoading,isError} = useQuery({queryKey:["product",slug],queryFn:()=> getProductsBySlug(slug),
        retry:false
    })

    return {
        product,
        isError,
        isLoading,
    }
}