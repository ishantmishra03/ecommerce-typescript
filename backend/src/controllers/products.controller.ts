import { Request, Response } from 'express';
import Product, { IProductDocument } from '../models/Product';
import { uploadImage } from '../config/imagekit';

//Creates a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      images, 
      category,
      stock,
      ratings,
    } = req.body;

    // Upload to ImageKit 
    const uploadedImageUrls = await Promise.all(
      images.map((img: string, index: number) =>
        uploadImage(img, `product-${Date.now()}-${index}`)
      )
    );

    const newProduct: IProductDocument = new Product({
      name,
      description,
      price,
      images: uploadedImageUrls, 
      category,
      stock,
      ratings,
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to create product',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get All Products
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({success: true, products});
  } catch (error) {
    res.status(500).json({
        success: false,
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// Get Product By Id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({success: false, error: 'Product not found' });
    }

    res.json({success: true, product});
  } catch (error) {
    res.status(500).json({
        success: false,
      error: 'Error retrieving product',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};


// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({success: false, error: 'Product not found' });
    }

    res.json({success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({
    success: false,
      error: 'Failed to delete product',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
