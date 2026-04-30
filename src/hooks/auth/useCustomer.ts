
import { useQuery } from "@tanstack/react-query";
import { getUserDate } from "../../actions/auth";

export const useCustomer =(userId:string) =>{
    const {data,isLoading} = useQuery({
        queryKey:["customer",userId],
        queryFn:()=> getUserDate(userId),
        enabled:!!userId,
        retry:false,
        refetchOnWindowFocus:true,
    })

    return{
        data,isLoading
    }
}