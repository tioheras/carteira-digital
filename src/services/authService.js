//aqui tem os parâmetros de regras de negócios da aplicação
// utilizado brcrypt para integração do password do usuário ao banco de dados de forma que ninguém tenha acesso -- npm instal brcrypt

import bcrypt from "bcrypt";
import authRepository from "../repositories/authRepository.js";

async function signup(body){
    const hasPassword = bcrypt.hashSync(body.password, 10);

    const userExists = await authRepository.findByEmail(body.email);
    if (userExists) throw new Error("user already exists!");

    return await authRepository.create({ ...body, password: hasPassword});
}

async function signin(body) {
    const userExists = await authRepository.findByEmail(body.email);
    if (!userExists) throw new Error("Email or password incorrect");

    const passwordOk = bcrypt.compareSync(body.password, userExists.password)
    if (!passwordOk) throw new Error("Email or password incorrect");

    return authRepository.generateToken(userExists._id);
}

async function userLogged(id) {
    const user = await authRepository.findById(id);
    if (!user) throw new Error ("user not found");
    return user;
}

export default {
    signup,
    signin,
    userLogged,
};