import { isValidObjectId } from "mongoose";
import Product from "../models/Product";
import Inventory from "../models/Inventory";

export const createProduct = async (req, res) => {
  try {
    const { _reference, _inventory, ...product } = req.body;
    const userId = req.id;

    if (!isValidObjectId(_inventory)) {
      return res.status(422).json({
        message: "El inventario es inválido",
      });
    }

    const foundInventory = await Inventory.findOne({
      _author: userId,
      _id: _inventory,
    });

    if (!foundInventory) {
      return res.status(400).json({
        message: "No se encontró el inventario.",
      });
    }

    const foundProduct = await Product.findOne({
      _reference,
      _inventory,
    });

    if (foundProduct) {
      return res.status(400).json({
        message: "La referencia ingresada ya existe.",
      });
    }

    const newProduct = new Product({
      _reference,
      _inventory,
      ...product,
    });

    const savedProduct = await newProduct.save();

    return res.status(200).json(savedProduct);
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { inventoryId } = req.params;
    const userId = req.id;

    if (!isValidObjectId(inventoryId)) {
      return res.status(422).json({
        message: "El inventario es inválido",
      });
    }

    const foundInventory = await Inventory.findOne({
      _author: userId,
      _id: inventoryId,
    });

    if (!foundInventory) {
      throw new Error("No se encontró el inventario.");
    }

    const foundProducts = await Product.find({
      _inventory: inventoryId,
    });

    return res.status(200).json(foundProducts);
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const { inventoryId } = req.body;
    const userId = req.id;

    if (!isValidObjectId(inventoryId) || !isValidObjectId(productId)) {
      return res.status(422).json({
        message: "Compruebe los ID ingresados.",
      });
    }

    const foundInventory = await Inventory.findOne({
      _author: userId,
      _id: inventoryId,
    });

    if (!foundInventory) {
      throw new Error("No se encontró el inventario.");
    }

    const foundProduct = await Product.findOne({
      _inventory: inventoryId,
      _id: productId,
    });

    if (!foundProduct) {
      throw new Error("No se encontró el producto.");
    }

    return res.status(200).json(foundProduct);
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};

export const updateProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _inventory } = req.body;
    const userId = req.id;

    if (!isValidObjectId(_inventory) || !isValidObjectId(productId)) {
      return res.status(422).json({
        message: "Compruebe los ID ingresados.",
      });
    }


    const foundInventory = await Inventory.findOne({
      _author: userId,
      _id: _inventory,
    });

    if (!foundInventory) {
      throw new Error("No se encontró el inventario.");
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _inventory,
        _id: productId,
      },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};
