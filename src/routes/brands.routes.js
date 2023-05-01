import { Router } from "express";
import * as brandsCtrl from "../controllers/brands.controller";

//MIDDLEWARE
import { verifyToken } from "../middlewares/validateJwt";
import { validateBrandCreation } from "../middlewares/validateBrand";

const router = Router();

router.post("/", [verifyToken, validateBrandCreation], brandsCtrl.createBrand);

router.get("/all", verifyToken, brandsCtrl.getBrands);

router.get("/:brandId", verifyToken, brandsCtrl.getBrandById);

router.put("/:brandId", verifyToken, brandsCtrl.updateBrandById);

router.delete("/:brandId", verifyToken, brandsCtrl.deleteBrandById);

export default router;
