import mongoose from "mongoose"
import {config} from "dotenv"

config();

(async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is conected to: ${db.connection.name}`);
    }
    catch(error){
        console.error(error);
    }
})();