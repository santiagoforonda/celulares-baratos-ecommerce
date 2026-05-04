import type { JSONContent } from "@tiptap/react";
import z from "zod";


export const addresSchema = z.object({
    addressLine1: z.string().min(1,"La direccion es requerida").max(100,"La direccion no debe exceder los 100 caracteres"),
    addressLine2: z.string().max(100,"La direccion no debe exceder los 100 caracteres").optional(),
    city: z.string().min(1,"la ciudad es requerida").max(50,"La ciudad no debe exceder los 50 caracteres"),
    state: z.string().min(1,"el estado es requerido").max(50,"La ciudad no debe exceder los 50 caracteres"),
    postalCode: z.string().max(10,"El codigo postal no debe exceder los 10 carateres").optional(),
    country:z.string().min(1,"El pais es requerido")
})


const isContenEmpty = (value:JSONContent):boolean=>{
    if(!value || !Array.isArray(value.content) || value.content.length ==0){
        return true;
    }
    return !value.content.some(
        node=>node.type === "paragraph" && node.content && Array.isArray(node.content) && node.content.some(textNode => textNode.type === "text" && textNode.text && textNode.text.trim() !== "")
    );
}

export const productSchema = z.object({
    name: z.string().min(1,"El nombre del producto es obligatorio"),
    brand:z.string().min(1,"La maca del producto es obligatoria"),
    slug:z.string().min(1,"El slug del producto es obligatorio").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"Slug invalido"),
    features:z.array(z.object({
        value: z.string().min(1,"La caracterisrtica no puede estar vacia"),
    })),
    description:z.custom<JSONContent>((value): value is JSONContent=>!isContenEmpty(value as JSONContent),{message:"La descripcion no puede estar vacia"}),
    variants: z.array(z.object({
        id:z.string().optional(),
        stock: z.number().min(0,"El stock no debe tener numeros negativos"),
        price:z.number().min(1,"El precio debe ser mayor a 0"),
        storage:z.string().min(1,"El almacenamiento es requerido"),
        color:z.string().regex(
            /^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})|(rgb|hsl)a?\(\s*([0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\))$/,"El color debe ser un valor valido en formato hexadecimal,RGB o HSL"
        ),
        color_name:z.string().min(1,"El nombre del color es obligatorio")
    })).min(1,"Debe tener al meno una variante"),
    images: z.array(z.any()).min(1,"Debe tener al menos una imagen")
});

export type ProductsFormValues = z.infer<typeof productSchema>;

export type AddresFormValues = z.infer<typeof addresSchema>;