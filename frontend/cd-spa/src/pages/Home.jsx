/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */

import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userLogged } from "../services/user";
import findAllTransactions from "../services/transactions";
import dayjs from 'dayjs';

export default function Home () {
    const navigate = useNavigate();
    const [user, setUser] = useState({}); // utilizando o usestate da pagina para setar o user que logou no comentário de entrada "olá, {usuário}"
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);

    function validateToken(){
        const token = Cookies.get("token");
        if (!token) navigate("/signin");
    }
    
    async function getUserLogged() { // para alterar a pessoa que esteja logado no sistema do site
        try {
            const userResponse = await userLogged();
            setUser(userResponse.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function getAllTransactions () {
        try {
            const response = await findAllTransactions();
            setTransactions(response.data);
            calculateBalance(response.data);
            } catch (error) {
                console.log(error);
            }
    }
// passar transaction por transaction realizando a soma ou a diminuição matematica conforme input ou uoutput
    function calculateBalance(transactions) {
        let total = 0;
        transactions.forEach((transaction) => {
            total += transaction.type === "input" 
                ? Number(transaction.value) 
                : -Number(transaction.value);
        });
        setBalance(total); // Atualiza o estado do saldo
}

    useEffect(() => {
        validateToken(); // utilização desta ferramenta de efeito para que ao renderizar a tela, ocorra a navegacao para fora da conta. Caso tenha expirado o cookies!
        getUserLogged(); // assim que iniciar a pagina, ele pega o usuario logado apoós validar o token
        getAllTransactions (); // pegará a atualização das transactions com o useeffect na pagina causado pela inserção do dado pelo usuário
    }, []);

    useEffect(() => {
        if (location.state?.updated) {
            getAllTransactions(); // Recarrega as transações se o estado indicar que foi atualizado
        }
    }, [location.state]);

    return(
        <main className="flex flex-col items-center justify-center bg-zinc-900 rounded p-8 w-[60rem] h-[45rem] text-2xl">
            <header className="flex items-center justify-between w-full pb-4">
                <div className="flex items-center gap-4 text-white text-2xl">
                    <h1>Olá, {user.name}</h1>
                    <Link to="/signin">
                        <GoSignOut />
                    </Link>
                </div>
            </header>

            <section className="bg-zinc-300 p-4 w-full h-full rounded flex items-center justify-center ">
                <ul className="w-full h-full flex flex-col justify-between">
                    <div className="h-[17rem] overflow-auto p-3">
                        {transactions.map((transaction, index) => (
                            <li key={index} className="flex justify-between items-start w-full">
                                <span className="flex items-center gap-2">
                                    <span className="text-base text-zinc-500">
                                        {dayjs(transaction.created_at).format("DD/MM")}
                                    </span>
                                    {transaction.description}
                                </span>
                                <span className={`
                                ${ transaction.type === "input"
                                    ? "text-green-700"
                                    : "text-red-700"
                                }
                                `}>
                                    {transaction.value}
                                </span>
                            </li>
                        ))}
                    </div>
                    <li className="flex justify-between items-start w-full px-3">
                        <span>Balance</span>
                        <span className={`${balance > 0 ? "text-green-700" : "text-red-700"}`}>R$ {balance}</span>
                    </li>
                </ul>
            </section>

            <footer className="w-full pt-2 flex gap-2 text-white text-lg font-bold">
                <Button 
                type="button" 
                text="New Input" 
                icon="plus"
                transaction="input"
                />
                <Button 
                type="button" 
                text="New output" 
                icon="minus"
                transaction="output"
                />

            </footer>

        </main>
    )
}