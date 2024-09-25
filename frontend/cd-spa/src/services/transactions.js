import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000";

const findAllTransactions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/transactions`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response; // Retorna a resposta completa, se necessário
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        throw error; // Lança o erro para tratamento posterior
    }
};
 
export async function createNewTransaction(body) {
    try {
        const response = await axios.post(`${BASE_URL}/transactions`, body, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return response; // Retorne a resposta para verificar no frontend
    } catch (error) {
        console.error("Erro ao criar nova transação:", error);
        throw error; // Lança o erro para tratamento posterior
    }
}


export default findAllTransactions; // Exporta a função
