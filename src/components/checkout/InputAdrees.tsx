import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { AddresFormValues } from "../../lib/validators";

interface Props{
  register:UseFormRegister<AddresFormValues>;
  errors:FieldErrors<AddresFormValues>;

  name:keyof AddresFormValues;
  clasName?:string;
  palceholder:string;
}


export const InputAdrees = ({register,errors,name,palceholder,clasName}:Props) => {
  return (
    <>
      <div className={`border border-slate-200 rounded-md overflow-hidden py-2 ${errors[name] && 'border-red-500'} ${clasName}`}>
        <input type="text" className="w-full px-3 py-1 text-sm focus:outline-none" placeholder={palceholder} {...register(name)}></input>
      </div>

      {
        errors[name] && <p className="text-red-500 text-xs">{errors[name].message}</p>
      }
    </>
  )
}
