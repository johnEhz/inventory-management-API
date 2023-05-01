import { Router } from "express";
import * as inventoriesCtrl from "../controllers/inventories.controller";

//MIDDLEWARE
import { verifyToken } from "../middlewares/validateJwt";
import { validateInventoryCreation } from "../middlewares/validateInventory";

const router = Router();

router.post(
  "/",
  [verifyToken, validateInventoryCreation],
  inventoriesCtrl.createInventory
);

router.get("/all", verifyToken, inventoriesCtrl.getInventories);

router.get("/:inventoryId", verifyToken, inventoriesCtrl.getInventoryById);

router.put("/:inventoryId", verifyToken, inventoriesCtrl.updateInventoryById);

router.delete(
  "/:inventoryId",
  verifyToken,
  inventoriesCtrl.deleteInventoryById
);

export default router;
