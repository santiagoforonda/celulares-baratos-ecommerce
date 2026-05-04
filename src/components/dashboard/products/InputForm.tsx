import  type { ProductsFormValues } from "../../../lib/validators";
import type {  FieldErrors, UseFormRegister } from "react-hook-form";

interface Props{
    className?:string;
    label:string;
    palceholder?:string;
    type:string;
    required?:boolean;
    name:keyof ProductsFormValues;
    register:UseFormRegister<ProductsFormValues>;
    errors:FieldErrors<ProductsFormValues>;
}

export const InputForm = ({className,palceholder,label,errors,name,register,type,required}:Props) => {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
                <label htmlFor={name} className="text-xs font-bold tracking-tight capitalize text-slate-900">
                    {label}:
                </label>

                {
                    required && (
                        <span className={`${required && "text-red-500 text-sm mr-3"} font-bold self-end`}>*</span>
                    )
                }
        </div>

        <div className={`border border-gray-300 rounded-md overflow-hidden gap-5 items-center ${errors[name]? "border-red-500":""}`}>
                <input type={type} placeholder={palceholder} id={name} {...register(name)} className={`py-1.5 text-sm px-3 font-medium tracking-tighter w-full text-slate-600
                    outline focus:outline-none ${className}`} autoComplete="off"></input>
        </div>

    </div>
  )
}
