import { Schema, isValidObjectId } from "mongoose";
import Inventory from "../models/Inventory";

export const createInventory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req;

    const foundInventory = await Inventory.findOne({
      _author: id,
      name,
    });

    if (foundInventory)
      throw new Error("El inventario ingresada ya se encuentra registrado...");

    const newInventory = new Inventory({
      _author: req.id,
      name,
      description,
    });

    const savedInventory = await newInventory.save();

    res.status(201).json(savedInventory);
  } catch (error) {
    return res.status(500).json({
      message: "Compruebe la existencia del inventario registrado.",
    });
  }
};

export const getInventories = async (req, res) => {
  const inventories = await Inventory.find({
    _author: req.id,
  });

  res.status(201).json(inventories);
};

export const getInventoryById = async (req, res) => {
  try {
    const { inventoryId } = req.params;

    if (!isValidObjectId(inventoryId)) {
      res.status(422).json({
        error: "The inventory ID provided is invalid.",
      });
      return;
    }

    const foundInventory = await Inventory.findOne({
      _id: inventoryId,
      _author: req.id,
    });

    if (!foundInventory)
      return res.status(404).json({ message: "Inventory not found" });

    res.status(200).json(foundInventory);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el inventario" });
  }
};

export const updateInventoryById = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const newInventory = req.body;
    if (!isValidObjectId(inventoryId)) {
      res.status(422).json({
        error: "The inventory ID provided is invalid.",
      });
      return;
    }
    const updatedInventory = await Inventory.findOneAndUpdate(
      { _id: inventoryId, _author: req.id },
      newInventory,
      {
        new: true,
      }
    );

    if (!updatedInventory)
      return res.status(404).json({ message: "Inventory not found" });

    res.status(200).json(updatedInventory);
  } catch (error) {
    return res.status(500).json({ message: "Error actualizar el inventario" });
  }
};

export const deleteInventoryById = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    if (!isValidObjectId(inventoryId)) {
      res.status(422).json({
        error: "The ID provided is invalid.",
      });
      return;
    }

    const deletedInventory = await Inventory.findOneAndDelete({
      _id: inventoryId,
      _author: req.id,
    });

    if (!deletedInventory)
      return res.status(404).json({ message: "Inventory not found" });

    res.status(200).json(deletedInventory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar el inventario" });
  }
};
