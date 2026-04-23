import {z} from "zod";

export const userRegisterSchema = z.object({
    email:z.string().email("Por favor ingresa un correo electronico valido"),
    password: z.string().min(6,"La contraseña debe tener al menos 6 caracteres"),
    fullName: z.string().min(1,"El nombre completo es requerido"),
    phone: z.string().optional(),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;