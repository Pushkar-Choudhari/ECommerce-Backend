import  express  from "express";
import { addProduct, viewProduct } from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post('/add/',verifyAdmin ,addProduct)

router.get('/view/:product_id', viewProduct)

export default router;