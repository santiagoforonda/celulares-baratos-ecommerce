import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../actions/product";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCreateProduct=()=>{

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate,isPending
    } = useMutation({
        mutationFn: createProduct,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["products"],
            });
            navigate("/dashboard/productos");
        },
        onError:(error)=>{
            const message = error instanceof Error ? error.message : "Ocurrio un error al crear el producto";
            toast.error(message);
            console.info(error);
        }
    })

    return {
        mutate,isPending
    }

}
