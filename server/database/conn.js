import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
export async function connectDB()
{
    try {

        // const mongod=await MongoMemoryServer.create()
        // const getUri=mongod.getUri()

        // const db = await mongoose.connect(getUri)
        
        await mongoose.connect("mongodb+srv://goluojha13101992:xrD8keLL0cbQtPe0@cluster0.ys0mkxz.mongodb.net/?retryWrites=true&w=majority")

        console.log("data base connected");
        
    } catch (error) {
        console.log("connection failed");
    }
}