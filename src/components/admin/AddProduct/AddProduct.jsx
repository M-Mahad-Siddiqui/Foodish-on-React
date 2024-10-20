import { useEffect, useState } from 'react';
import { menu_list } from '../../../assets/assets';
import { useFireContext } from '../../../context/FireContext.jsx';
import './AddProduct.css';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(''); // Empty or 'product' or 'category'
  const [error, setError] = useState('');

  const { addProducts, getCategories, addCategory } = useFireContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (price <= 0) {
      setError('Price must be a positive number');
      return;
    }

    const productData = {
      name: productName,
      description,
      price,
      category: newCategory || category,
      image
    };

    setLoading('product');
    try {
      await addProducts(productData);
      console.log('Product submitted:', productData);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Error adding product. Please try again.");
    } finally {
      setLoading(''); // Reset loading after operation
    }
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setNewCategory('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddCategory = async () => {
    if (!newCategory) {
      setError('Please enter a new category.');
      return;
    }

    if (categories.some(cat => cat.name === newCategory)) {
      setError('Category already exists.');
      return;
    }

    setLoading('category');
    try {
      const categoryData = { name: newCategory, image };
      await addCategory(categoryData);
      setCategories([...categories, { name: newCategory, image }]);
      setNewCategory('');
      setImage(null);
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Error adding category. Please try again.');
    } finally {
      setLoading(''); // Reset loading after operation
    }
  };

  // Combine menu list with categories for dropdown and filter out invalid names
  const combinedCategories = [
    ...categories.map(cat => ({ name: cat.name, image: cat.image })),
    ...menu_list.filter(item => item.menu_name) // Filter out empty names
  ];

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        {error && <div className="error-message">{error}</div>}
        <div className="form-group inline">
          <div className="inline-field">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="inline-field">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group inline">
          <div className="inline-field">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {combinedCategories.map((cat, index) => (
                <option key={index} value={cat.menu_name || cat.name}>{cat.menu_name || cat.name}</option>
              ))}
            </select>
          </div>
          <div className="inline-field">
            <label htmlFor="newCategory">Add New Category:</label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button type="button" onClick={handleAddCategory} disabled={loading === 'category'}>
              {loading === 'category' ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading === 'product'}>
          {loading === 'product' ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
