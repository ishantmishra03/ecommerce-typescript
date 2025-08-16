import { Request, Response } from 'express';
import User from '../models/User';
import Product from '../models/Product';
import { AuthRequest } from '../middlewares/authVerify'; 

// Get Cart Items
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).populate('cart.productId');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch cart' });
  }
};

// Add Item to Cart
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const existingItem = user.cart.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.json({ success: true, message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

// Update Cart Item Quantity
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const item = user.cart.find(item => item.productId.toString() === productId);

    if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });

    item.quantity = quantity;

    await user.save();

    res.json({ success: true, message: 'Cart item updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update cart' });
  }
};

// Remove Item from Cart
export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to remove from cart' });
  }
};

//Clear user cart
export const clearUserCart = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cart = []; 
    await user.save();

    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from cart' });
  }
}
