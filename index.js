import express from 'express'
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
dotenv.config();
const  PORT = process.env.PORT
const app  = express();
connectDB()
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);


app.listen( PORT , ()=>{
   console.log(`app listening on :  ${PORT}`)
})