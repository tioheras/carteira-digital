import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB(){
   
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDB Atlas conectado");
    } catch (err) {
        console.log(err.message);
    }
}

export async function disconnectDb() {
    await mongoose.disconnect();
}