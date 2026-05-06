import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../actions/order";

export const useAllOrders=()=>{
    const {data,isLoading} = useQuery({
        queryKey:["orders","admin"],
        queryFn:getAllOrders
    });

    return{
        data,isLoading
    }
}