import pool from "../config/database.js";

export const addToCart = async (req, res, next) =>{

    const user_id = req.params.user_id
    console.log(user_id)
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    const unit_price = req.body.unit_price

    //First Check if item already exists in cart
    const checkIfIteminCartQuery = "select * from cartitems where user_id = ? and product_id = ?"
    pool.query(checkIfIteminCartQuery, [user_id, product_id], (err, result)=>{
        if(err){
            return next(err)
        }
        if(result.length>0){
            //If item exists, update the quantity of the item
            const updateProductQuery = "update cartitems set quantity = ? where user_id = ? and product_id = ?"
            pool.query(updateProductQuery, [quantity, user_id, product_id], (err, result)=>{
                if(err){
                    return next(err);
                }
                res.send("Added items to cart")
            })
        }
        else
        {
            //If item doesn't exist, add the item to the cart
            const addToCartQuery = "insert into cartitems (user_id, product_id, quantity, unit_price) values (?,?,?,?)"
            pool.query(addToCartQuery,[user_id, product_id, quantity, unit_price], (err, results)=>{
                if(err){
                    return next(err);
                }
                res.send("Added items to cart")
            })
        }
    })

    
}


export const viewCart = async (req, res, next) =>{
    const user_id = req.params.user_id
    const getAllItemsInCartQuery = "select * from cartitems where user_id = ?"
    pool.query(getAllItemsInCartQuery, [user_id], (err, results)=>{
        if(err){
            return next(err)
        }
        res.json(results)
    })
}