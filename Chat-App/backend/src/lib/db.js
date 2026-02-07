import mongoose from 'mongoose'

export const connectDB= async () =>{
    try {
        const conn= await mongoose.connect(process.env.mongodb_url);
        console.log(`Mongodb connected:${conn.connection.host}`);
        
    } catch (error) {
        console.log("Mongodb connection error :",error);
        
    }
}