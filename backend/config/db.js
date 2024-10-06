import mongoose from "mongoose"

export const connectDb = async ()=>{
  try{
    const conn = await mongoose.connect(process.env.mongoURL)//able to get .env values as the dotenv.config() reads all the data and stores it in process.env object and once declared these are globally available.
    console.log(`DB Connection established ${conn.connection.host}`)
  }catch(error){
    console.error(`Error connecting to DB ${error.message}`)
    process.exit(1)
  }
}