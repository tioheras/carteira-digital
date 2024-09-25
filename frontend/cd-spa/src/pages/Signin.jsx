/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signinSchema } from "../schemas/SigninSchema";
import { signin } from "../services/user";
import Cookies from "js-cookie";

export default function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signinSchema),
    });

    const navigate = useNavigate();
    
    async function handleSubmitForm(data) {
        try {
            const token = await signin(data); // Isso deve retornar o token
            console.log("Token recebido:", token); // Verifique se o token é válido
            Cookies.set("token", token, { expires: 1 }); // Armazene o token nos cookies, expire em um dia.
            navigate("/"); // após que gerar token, navega para o home.
        } catch (error) {
            console.log(error.message);
            // Exiba error.response.data ao usuário
        }
    }

    return (
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input 
                    type="email" 
                    placeholder="Email" 
                    register={register} 
                    name="email" 
                />
                {errors.email && <ErrorInput text={errors.email.message}/>} {/* Verificação dos erros */}
                
                <Input 
                    type="password" 
                    placeholder="Password" 
                    register={register} 
                    name="password" 
                />
                {errors.password && <ErrorInput text={errors.password.message}/>} {/* Verificação dos erros */}

                <Button type="submit" text="Signin" />
            </form>
            <p className="text-white text-2xl">
                Dont have an account? 
                <Link to="/signup" className="text-sky-400 hover:text-sky-600"> Register </Link>
            </p>
        </div>
    );
}
