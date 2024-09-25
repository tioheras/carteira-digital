import z from "zod";

export const signupSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"), // Alterado de "username" para "name"
    email: z.string().email("Formato de email inválido").nonempty("O email é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("A senha é obrigatória"),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});