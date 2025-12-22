
import mognoose from 'mongoose'

export const connectionDB = async () =>{
    try {
        await mognoose.connect(process.env.MONGO_URL)

        console.log("MONGODB CONNECTION SUCCESSFULLY");
        
    } catch (error) {
        console.error('error connecting to MONGODB',error);
        process.exit(1)
        
    }

}