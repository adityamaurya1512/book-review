import express from 'express'
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
dotenv.config();
const  PORT = process.env.PORT
const app  = express();
connectDB()
app.use(express.json());




app.listen( PORT , ()=>{
   console.log(`app listening on :  ${PORT}`)
})