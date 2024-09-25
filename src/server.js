import express from "express";
import cors from "cors"; // Importa o pacote cors
import authRouter from "./routes/authRoutes.js";
import { connectDB } from "./config/database.js";
import transactionRouter from "./routes/transactionRoutes.js";

const app = express();

connectDB();
app.use(cors()); // Habilita o CORS
app.use(express.json());
app.use(authRouter);
app.use(transactionRouter);

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
