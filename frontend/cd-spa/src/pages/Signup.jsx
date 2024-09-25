import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signupSchema } from "../schemas/SignupSchema";
import { signup } from "../services/user";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const navigate = useNavigate();

    async function handleSubmitForm(data) {
        console.log(data);
        try {
            await signup(data);
            navigate("/signin");
        } catch (error) {
            console.error("Erro durante o cadastro:", error.response.data);
            // Exiba error.response.data ao usuário
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-around bg-zinc-900 rounded p-8 w-[35rem] h-[35rem]">
            <Link to="/signin">
                <BiArrowBack className="text-white absolute top-3 left-3 text-2xl hover:text-sky-600" />
            </Link>
            
            <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col justify-center gap-4 w-full text-2xl">
                <Input 
                    type="text" 
                    placeholder="Nome" 
                    register={register} 
                    name="name" 
                />
                {errors.name && <ErrorInput text={errors.name.message} />}
                
                <Input 
                    type="email" 
                    placeholder="Email" 
                    register={register} 
                    name="email" 
                />
                {errors.email && <ErrorInput text={errors.email.message} />}

                <Input 
                    type="password" 
                    placeholder="Senha" 
                    register={register} 
                    name="password" 
                />
                {errors.password && <ErrorInput text={errors.password.message} />}

                <Input 
                    type="password" 
                    placeholder="Confirme sua Senha" 
                    register={register} 
                    name="confirmPassword" 
                />
                {errors.confirmPassword && <ErrorInput text={errors.confirmPassword.message} />}

                <Button type="submit" text="Signup" />
            </form>
        </div>
    );
}
