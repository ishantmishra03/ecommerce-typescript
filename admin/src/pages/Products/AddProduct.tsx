import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import type { ProductFormData } from '../../types';
import { useAppContext } from '../../context/AppContext';

const AddProduct: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProduct } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addProduct({
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      images: formData.images,
      category: formData.category,
      stock: parseInt(formData.stock),
      ratings: 0
    });
    
    setIsSubmitting(false);
    navigate('/products');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Product</h1>
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default AddProduct;