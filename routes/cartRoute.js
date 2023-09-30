import  express  from "express";
import { addToCart, viewCart } from "../controllers/cart.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/add/:user_id',verifyUser, addToCart)

router.get('/view/:user_id',verifyUser, viewCart)

export default router;