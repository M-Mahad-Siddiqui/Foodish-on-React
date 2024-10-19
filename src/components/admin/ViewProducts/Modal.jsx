import { useEffect, useState } from 'react';
import './Modal.css'; // Ensure to create this CSS file for styling

const Modal = ({ isOpen, onClose, product, onUpdate }) => {
  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice]             = useState('');
  const [category, setCategory]       = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  const handleUpdate = () => {
    const updatedProduct = { id: product.id, name, description, price, category };
    onUpdate(updatedProduct);
    onClose();  // Close modal after updating
  };

  if (!isOpen) return null;

  return (
    <div className = "modal-overlay">
    <div className = "modal-content">
        <h2>Update Product</h2>
        <form onSubmit = {(e) => { e.preventDefault(); handleUpdate(); }}>
          <input
            type        = "text"
            value       = {name}
            onChange    = {(e) => setName(e.target.value)}
            placeholder = "Product Name"
            required
          />
          <textarea
            value       = {description}
            onChange    = {(e) => setDescription(e.target.value)}
            placeholder = "Product Description"
            required
          />
          <input
            type        = "number"
            value       = {price}
            onChange    = {(e) => setPrice(e.target.value)}
            placeholder = "Product Price"
            required
          />
          <input
            type        = "text"
            value       = {category}
            onChange    = {(e) => setCategory(e.target.value)}
            placeholder = "Product Category"
            required
          />
        <button type    = "submit">Update</button>
        </form>
        <button id = 'close' onClick = {onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
