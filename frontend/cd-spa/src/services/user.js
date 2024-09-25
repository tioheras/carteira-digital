//este arquivo nao vai receber informação html, por isso apenas .js
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000";

export async function signup(data) {
    delete data.confirmPassword;
    const response = await axios.post(`${BASE_URL}/signup`, data);
    return response;
}

export async function signin(data) {
    const response = await axios.post(`${BASE_URL}/signin`, data);
    return response.data.token;
}

export function userLogged() {
    const response = axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    });
  
    return response;
  } // rota autenticada!!