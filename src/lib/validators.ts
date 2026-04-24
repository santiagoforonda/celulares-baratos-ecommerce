import z from "zod";


export const addresSchema = z.object({
    addressLine1: z.string().min(1,"La direccion es requerida").max(100,"La direccion no debe exceder los 100 caracteres"),
    addressLine2: z.string().max(100,"La direccion no debe exceder los 100 caracteres").optional(),
    city: z.string().min(1,"la ciudad es requerida").max(50,"La ciudad no debe exceder los 50 caracteres"),
    state: z.string().min(1,"el estado es requerido").max(50,"La ciudad no debe exceder los 50 caracteres"),
    postalCode: z.string().max(10,"El codigo postal no debe exceder los 10 carateres").optional(),
    country:z.string().min(1,"El pais es requerido")
})

export type AddresFormValues = z.infer<typeof addresSchema>;