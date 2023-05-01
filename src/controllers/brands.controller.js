import { isValidObjectId } from "mongoose";
import Brand from "../models/Brand";

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req;

    const foundBrand = await Brand.findOne({
      _author: id,
      name: name.toUpperCase(),
    });

    if (foundBrand)
      throw new Error("La marca ingresada ya se encuentra registrada...");

    const newBrand = new Brand({
      _author: id,
      name: name.toUpperCase(),
    });

    const savedBrand = await newBrand.save();

    return res.status(200).json(savedBrand);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Compruebe la existencia de la marca registrada." });
  }
};

export const updateBrandById = async (req, res) => {
  try {
    const { brandId } = req.params;
    const newBrand = req.body;
    if (!isValidObjectId(brandId)) {
      return res.status(403).json({ message: "Invalid Brand ID" });
    }

    const updatedBrand = await Brand.findOneAndUpdate(
      {
        _author: id,
        _id: brandId,
      },
      newBrand,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedBrand);
  } catch (error) {
    return res.status(500).json({ message: "Unknow Error -> BrandsUpdate" });
  }
};

export const getBrands = async (req, res) => {
  try {
    const { id } = req;
    const foundBrands = await Brand.find({
      _author: id,
    });

    return res.status(200).json(foundBrands);
  } catch (error) {
    return res.status(500).json({ message: "Unknow Error -> getBrands" });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const { id } = req;
    const { brandId } = req.params;
    if (!isValidObjectId(brandId)) {
      return res.status(403).json({ message: "Invalid Brand ID" });
    }

    const foundBrand = await Brand.findOne({
      _id: brandId,
      _author: id,
    });

    if (!foundBrand) {
      return res.status(400).json({ message: "Brand not found" });
    }

    return res.status(200).json(foundBrand);
  } catch (error) {
    return res.status(500).json({ message: "Unknow Error -> getBrandId" });
  }
};

export const deleteBrandById = async (req, res) => {
  try {
    const { brandId } = req.params;
    if (!isValidObjectId(brandId)) {
      res.status(422).json({
        error: "The ID provided is invalid.",
      });
      return;
    }

    const deletedBrand = await Brand.findOneAndDelete({
      _id: brandId,
      _author: req.id,
    });

    if (!deletedBrand)
      return res.status(404).json({ message: "Brand not found" });

    res.status(200).json(deletedBrand);
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar." });
  }
};
