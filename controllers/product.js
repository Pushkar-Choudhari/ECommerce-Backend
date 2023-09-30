import pool from "../config/database.js";
import indexProduct from "../config/indexProduct.js";

export const addProduct = async (req, res, next) =>{

    const product_name = req.body.product_name
    const unit_price = req.body.unit_price
    const description = req.body.description
    
    const addProduct = "insert into products (product_name, unit_price, description) values (?, ? ,?)"
    pool.query(addProduct, [product_name, unit_price, description], (err,result)=>{
        if(err){
            return next(err)
        }
        product_id = result.insertId
        const product = {
            product_name,
            product_id,
            unit_price, description
        }
        indexProduct(product)
        res.send("Added Product")
    })
}

export const viewProduct = async (req, res, next)=>{
    const product_id = req.params.product_id
    const viewProductQuery = "select * from products where product_id = ?"
    pool.query(viewProductQuery , [product_id],  (err, result)=>{
        if(err){
            return next(err)
        }
        res.send(result)
    })
}