import express from "express";
import dotenv from "dotenv";
import pool from "./config/database.js"
import errorHandler from "./utils/errorHandler.js"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js"
import cartRoute from "./routes/cartRoute.js"
import searchRoute from "./routes/searchRoute.js"
import productRoute from "./routes/productRoute.js"
import orderRoute from "./routes/orderRoute.js"

const port = process.env.PORT || 8800
const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res, next)=>{

    pool.query("select * from cartitems", (err, result, fields)=>{
        if(err){
            return next(err);
        }
        res.json(result)
    })
    
})

app.use("/search",searchRoute)
app.use('/auth', authRoute)
app.use("/cart", cartRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log('app is running!')
})