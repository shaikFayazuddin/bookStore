import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./config/db.js";
import bookRouter from "./routes/booksRoute.js"
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
// app.use(cors({
//   origin:"http://localhost:300",
//   methods : ['GET','POST','PUT','DELETE'],
//   allowedHeaders : ["Content-Type"]
// }))

app.use("/api/books", bookRouter)

app.listen(PORT, ()=>{
  connectDb()
  console.log("Server is running on PORT :", PORT, `http://localhost:${PORT}`)
});




