import  express  from "express";
import { makeOrder , viewAllOrders, viewOrderDetails } from "../controllers/order.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.get('/make/:user_id',verifyUser ,makeOrder)

router.get('/view/:user_id/all',verifyUser, viewAllOrders)

router.get('/view/:user_id/:order_id', verifyUser, viewOrderDetails)

export default router;