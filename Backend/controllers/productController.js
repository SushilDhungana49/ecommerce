import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      subcategory,
      price,
      category,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      bestseller,
      date: Date.now(),
    };
    res.json({ success: true, message: "Product added" });
    const product = new productModel(productData);
    await product.save();
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

//remove product

const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};
//single product info
const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findById(id);

    res.json({ success: true, product, id });
  } catch (error) {
    {
      console.log(error);

      res.json({ success: false, message: error.message });
    }
  }
};

export { addProduct, listProduct, singleProduct, removeProduct };
