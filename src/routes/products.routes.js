import { Router } from "express";

//MIDDLEWARE
import { verifyToken } from "../middlewares/validateJwt";

//CONTROLLERS
import * as productCtrl from '../controllers/products.controller'

const router = Router();

router.post("/", verifyToken, productCtrl.createProduct);
router.get("/:inventoryId", verifyToken, productCtrl.getProducts);
router.post("/one/:productId", verifyToken, productCtrl.getProductById);
router.put("/:productId", verifyToken, productCtrl.updateProductId);
router.delete("/:productId/:inventoryId", verifyToken, productCtrl.deleteProduct);

export default router;