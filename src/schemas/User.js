import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
// este é o schema modelo para entrada do usuário no front-end
// é um objeto, porém o tipo de objeto é definido por string

export default model ("users", UserSchema);
// ele está exportando la para o banco de dados na linha acima. 
// no banco de dados será trabalhado com users.