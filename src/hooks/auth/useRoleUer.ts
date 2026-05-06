import { useQuery } from "@tanstack/react-query";
import { getUserRoler } from "../../actions/auth";

export const useRoleUer =(userId:string)=>{
    const{data,isLoading} = useQuery({
        queryKey:["rol-user"],
        queryFn:async()=> await getUserRoler(userId),
        enabled:!!userId,
        retry:false
    })

    return{
        data,isLoading
    }
}