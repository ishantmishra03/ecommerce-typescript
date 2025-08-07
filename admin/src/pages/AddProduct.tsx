import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/Forms/ProductForm';
import { ProductFormData } from '../types';
import { useData } from '../contexts/DataContext';

const AddProduct: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProduct } = useData();
  const navigate = useNavigate();

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);

    try {
      await addProduct({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        images: formData.images,
        category: formData.category,
        stock: parseInt(formData.stock),
        ratings: 0,
      });

      navigate('/products');
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setIsSubmitting(false);
    }
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
