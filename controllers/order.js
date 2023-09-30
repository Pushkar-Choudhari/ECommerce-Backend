import pool from "../config/database.js";

export const makeOrder= async (req, res, next) =>{

    const user_id = req.params.user_id

    const getItemsFromCartQuery = "select * from cartitems where user_id = ?"
    pool.query(getItemsFromCartQuery, [user_id], (err, results)=>{

        if(err){
            return next(err)
        }

        let cost = 0
        for(let item in results){
            cost+=item.unit_price
        }
        //handlePayment()

        const createOrderQuery = "insert into orders (user_id) values(?)"
        pool.query(createOrderQuery, [user_id], (err, result)=>{
            if(err){
                //refundCustomer()
                return next(err)
            }
            const order_id = result.insertId;
            const addItemstoOrderItemsQuery = "insert into orderitems (order_id, product_id, quantity, unit_price) select ?, product_id, quantity, unit_price from cartitems where user_id = ?"
            pool.query(addItemstoOrderItemsQuery, [order_id,user_id],(err, result)=>{
                if(err){
                    //refundCustomer()
                    return next(err)
                }
                const emptyCartQuery = "delete from cartitems where user_id = ?"
                pool.query(emptyCartQuery, [user_id], (err, result)=>{
                    if(err){
                        //refundCustomer()
                        return next(err)
                    }
                    res.send("Order Successful")
                })
            })
        })
    })
}

export const viewAllOrders = async (req, res, next) =>{
    const user_id = req.params.user_id

    const viewAllOrdersQuery = "select * from orders where user_id = ?"
    pool.query(viewAllOrdersQuery, [user_id], (err, results)=>{
        if(err){
            return next(err)
        }
        res.send(results)
    })

}

export const viewOrderDetails = async (req, res, next) =>{

    const order_id = req.params.order_id


    const viewOrderDetailsQuery = "select * from orderitems where order_id = ?"
    pool.query(viewOrderDetailsQuery, [order_id], (err, results)=>{
        if(err){
            return next(err)
        }
        res.send(results)
    })
}