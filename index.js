import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import web from './route/web.js'
import connectDB from './utils/connectDB..js'

const app = express()
const PORT = process.env.PORT || 8001

app.use(cors())
app.use(express.json())
connectDB(process.env.DATABASE_URL)

app.use("/",web)

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
})