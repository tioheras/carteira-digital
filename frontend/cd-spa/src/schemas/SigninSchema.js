import z from "zod";

// Definindo o esquema de validação com Zod
export const signinSchema = z.object({
    email: z.string().nonempty("O email é obrigatório").email().toLowerCase(),
    password: z.string().min("A senha precisa ter no mínimo 6 caracteres"), // adicionei a validação para a senha
});

