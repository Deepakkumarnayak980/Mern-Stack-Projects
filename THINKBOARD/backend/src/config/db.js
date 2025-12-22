
import mognoose from 'mongoose'

export const connectionDB = async () =>{
    try {
        await mognoose.connect("mongodb+srv://deepakkumarnayak715_db_user:deepak123@cluster0.ahb3jub.mongodb.net/?appName=Cluster0")

        console.log("MONGODB CONNECTION SUCCESSFULLY");
        
    } catch (error) {
        console.error('error connecting to MONGODB',error);
        
    }

}