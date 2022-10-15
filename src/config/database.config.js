import mongoose from "mongoose";
import { config } from "dotenv";

config();

(async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@acsys.whd9p61.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    );
    console.log(`Database is conected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
})();
