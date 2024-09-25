import { Router } from "express";
import transactionController from "../controllers/transactionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validationSchemaMiddleware } from "../middlewares/validationSchemaMiddleware.js";
import { CreateTransaction } from "../schemas/validation/CreateTransaction.js";

const transactionRouter = Router ();

transactionRouter.use(authMiddleware)  // apartir daqui toda transacao sera protegida pelo middleware, nao precisando chamar ele em todas as rotas de transacao

transactionRouter.post(
    "/transactions",
    validationSchemaMiddleware(CreateTransaction),
    transactionController.create
);

transactionRouter.get(
    "/transactions",
    transactionController.findAllByUser
);

export default transactionRouter;