import { Router } from "express";
import * as providersCtrl from "../controllers/providers.controller";

//MIDDLEWARE
import { verifyToken } from "../middlewares/validateJwt";
import { validateProviderCreation } from "../middlewares/validateProvider";

const router = Router();

router.post(
  "/",
  [verifyToken, validateProviderCreation],
  providersCtrl.createProvider
);

router.get("/all", verifyToken, providersCtrl.getProviders);

router.get("/:providerId", verifyToken, providersCtrl.getProviderById);

router.put("/:providerId", verifyToken, providersCtrl.updateProviderById);

router.delete("/:providerId", verifyToken, providersCtrl.deleteProviderById);

export default router;
