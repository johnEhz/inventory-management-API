import { isValidObjectId } from "mongoose";
import Provider from "../models/Provider";

export const createProvider = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req;

    const foundProvider = await Provider.findOne({
      _author: id,
      name: name.toUpperCase(),
    });

    if (foundProvider)
      throw new Error("El proveedor ingresada ya se encuentra registrada...");

    const newProvider = new Provider({
      _author: id,
      name: name.toUpperCase(),
    });

    const savedProdiver = await newProvider.save();

    return res.status(200).json(savedProdiver);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Compruebe la existencia del proveedor registrado." });
  }
};

export const updateProviderById = async (req, res) => {
  try {
    const { providerId } = req.params;
    const newProvider = req.body;
    if (!isValidObjectId(providerId)) {
      return res.status(403).json({ message: "Invalid Provider ID" });
    }

    const updatedProvider = await Provider.findOneAndUpdate(
      {
        _author: id,
        _id: providerId,
      },
      newProvider,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedProvider);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el proveedor" });
  }
};

export const getProviders = async (req, res) => {
  try {
    const { id } = req;
    const foundProviders = await Provider.find({
      _author: id,
    });

    return res.status(200).json(foundProviders);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los proveedores" });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const { id } = req;
    const { providerId } = req.params;
    if (!isValidObjectId(providerId)) {
      return res.status(403).json({ message: "Invalid Provider ID" });
    }

    const foundProvider = await Provider.findOne({
      _id: providerId,
      _author: id,
    });

    if (!foundProvider) {
      return res.status(400).json({ message: "Provider not found" });
    }

    return res.status(200).json(foundProvider);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el proveedor" });
  }
};

export const deleteProviderById = async (req, res) => {
  try {
    const { providerId } = req.params;
    if (!isValidObjectId(providerId)) {
      res.status(422).json({
        error: "The ID provided is invalid.",
      });
      return;
    }

    const deletedProvider = await Provider.findOneAndDelete({
      _id: providerId,
      _author: req.id,
    });

    if (!deletedProvider)
      return res.status(404).json({ message: "Provider not found" });

    res.status(200).json(deletedProvider);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el proveedor." });
  }
};
