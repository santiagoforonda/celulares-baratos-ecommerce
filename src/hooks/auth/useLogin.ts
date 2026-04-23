import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sigIn} from "../../actions/auth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";


export const useLogin =()=>{

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {mutate,isPending} = useMutation({
        mutationFn:sigIn,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:["user"]});
            navigate("/");
        },
        onError:(err)=>{
            toast.error(err.message,{
                position:"bottom-right",
            })
        }
    })

    return {
        mutate,isPending
    }
}