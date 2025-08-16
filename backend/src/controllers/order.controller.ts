import { Request, Response } from 'express';
import Order from '../models/Order';
import { AuthRequest } from '../middlewares/authVerify';

// Create a new order
export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items, total, shippingAddress, paymentMethod } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No order items' });
  }

  try {
    const order = new Order({
      user: req.userId,
      items,
      total,
      shippingAddress,
      paymentMethod,
      status: 'pending',
      isPaid: false,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, message: "Order Placed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating order', error });
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching order', error });
  }
};

// Update order to paid 
export const updateOrderToPaid = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.isPaid = true;
    order.status = 'processing';

    const updatedOrder = await order.save();
    res.json({ success: true, message: "Order updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order payment', error });
  }
};

// Get all orders 
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const rawOrders = await Order.find({ user: req.userId })
      .populate('items.product', 'name price');

    const orders = rawOrders.map(order => {
      const filteredItems = order.items.filter(item => item.product !== null);
      return {
        ...order.toObject(),
        items: filteredItems,
      };
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user orders', error });
  }
};


//Admin
// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Update order status 
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res.json({ success: true, message: "Order updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order status', error });
  }
};
