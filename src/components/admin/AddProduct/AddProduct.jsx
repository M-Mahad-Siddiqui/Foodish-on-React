// import { useState } from "react";
// import "./AddProduct.css";

// function AddProduct() {
// 	const [productName, setProductName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [price, setPrice] = useState("");
// 	const [category, setCategory] = useState("");
// 	const [newCategory, setNewCategory] = useState("");
// 	const [image, setImage] = useState(null);
// 	const [categories, setCategories] = useState(["Electronics", "Clothing", "Books"]);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const productData = {
// 			name: productName,
// 			description,
// 			price,
// 			category: newCategory || category,
// 			image
// 		};
// 		console.log("Product submitted:", productData);
// 		resetForm();
// 	};

// 	const resetForm = () => {
// 		setProductName("");
// 		setDescription("");
// 		setPrice("");
// 		setCategory("");
// 		setNewCategory("");
// 		setImage(null);
// 	};

// 	const handleImageChange = (e) => {
// 		setImage(e.target.files[0]);
// 	};

// 	const addCategory = () => {
// 		if (newCategory && !categories.includes(newCategory)) {
// 			setCategories([...categories, newCategory]);
// 			setCategory(newCategory);
// 			setNewCategory("");
// 		}
// 	};

// 	return (
// 		<div className="add-product-container">
// 			<h1>Add Product</h1>
// 			<form onSubmit = {handleSubmit} className = "add-product-form">

// 				<div className="form-group">
// 					<label htmlFor="productName">Product Name:</label>
// 					<input
// 						type     = "text"
// 						id       = "productName"
// 						value    = {productName}
// 						onChange = {(e) => setProductName(e.target.value)}
// 						required
// 					/>
//         </div>

// 				<div className="form-group">
// 					<label htmlFor="description">Description:</label>
// 					<textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//         </div>

// 				<div className="form-group">
// 					<label htmlFor="price">Price:</label>
// 					<input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
//         </div>

// 				<div className="form-group">
// 					<label htmlFor="category">Category:</label>
// 					<select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
// 						<option value="">Select a category</option>
// 						{categories.map((cat, index) => (
// 							<option key={index} value={cat}>
// 								{cat}
// 							</option>
// 						))}
// 					</select>
// 				</div>
// 				<div className="form-group">
// 					<label htmlFor="newCategory">Add New Category:</label>
// 					<input type="text" id="newCategory" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
// 					<button type="button" onClick={addCategory}>
// 						Add Category
// 					</button>
// 				</div>
// 				<div className="form-group">
// 					<label htmlFor="image">Product Image:</label>
// 					<input type="file" id="image" accept="image/*" onChange={handleImageChange} />
// 				</div>
// 				<button type="submit" className="submit-button">
// 					Add Product
// 				</button>
// 			</form>
// 		</div>
// 	);
// }

// export default AddProduct;











// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../../context/FireContext.jsx';
// import './AddProduct.css';


// function AddProduct() {
//   const [productName, setProductName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);

//   const { addProducts, loading, getCategories, addCategory } = useFireContext();  // Call useFireContext as a function

//   useEffect(() => {
//     // Fetch categories from Firestore
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.category);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const productData = {
//       name: productName,
//       description,
//       price,
//       category: newCategory || category,
//       image
//     };

//     try {
//       await addProducts(productData); // Await the addProducts call
//       console.log('Product submitted:', productData);
//       resetForm();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const resetForm = () => {
//     setProductName('');
//     setDescription('');
//     setPrice('');
//     setCategory('');
//     setNewCategory('');
//     setImage(null);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   // const addCategory = () => {
//   //   if (newCategory && !categories.includes(newCategory)) {
//   //     setCategories([...categories, newCategory]);
//   //     setCategory(newCategory);
//   //     setNewCategory('');
//   //   }
//   // };

//   return (
//     <div className="add-product-container">
//       <h1>Add Product</h1>
//       <form onSubmit={handleSubmit} className="add-product-form">
//         <div className="form-group inline">
//           <div className="inline-field">
//             <label htmlFor="productName">Product Name:</label>
//             <input
//               type="text"
//               id="productName"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="inline-field">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group inline">
//           <div className="inline-field">
//             <label htmlFor="category">Category:</label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat, index) => (
//                 <option key={index} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//           <div className="inline-field">
//             <label htmlFor="newCategory">Add New Category:</label>
//             <input
//               type="text"
//               id="newCategory"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//             />
//             <input
//               type   = "file"
//               id     = "image"
//               accept = "image/*"

//             />
//             <button type="button" onClick={addCategory}>Add</button>
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Product Image:</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//         <button type="submit" className="submit-button">{loading ? 'Adding...' : 'Add Product'}</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;











// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../../context/FireContext.jsx';
// import './AddProduct.css';

// function AddProduct() {
//   const [productName, setProductName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [image, setImage] = useState(null);
//   const [categories, setCategories] = useState([]);

//   const { addProducts, loading, getCategories, addCategory } = useFireContext();  // Call useFireContext as a function

//   useEffect(() => {
//     // Fetch categories from Firestore
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data); // Store categories fetched from Firestore
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const productData = {
//       name: productName,
//       description,
//       price,
//       category: newCategory || category, // Use newCategory if added, else use existing
//       image
//     };

//     try {
//       await addProducts(productData); // Await the addProducts call
//       console.log('Product submitted:', productData);
//       resetForm();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const resetForm = () => {
//     setProductName('');
//     setDescription('');
//     setPrice('');
//     setCategory('');
//     setNewCategory('');
//     setImage(null);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleAddCategory = async () => {
//     if (newCategory && image) {
//       try {
//         await addCategory({ name: newCategory, image }); // Add new category to Firestore
//         setCategories([...categories, newCategory]); // Update local categories list
//         setNewCategory('');
//         setImage(null); // Reset image input
//       } catch (error) {
//         console.error('Error adding category:', error);
//       }
//     }
//   };

//   return (
//     <div className="add-product-container">
//       <h1>Add Product</h1>
//       <form onSubmit={handleSubmit} className="add-product-form">
//         <div className="form-group inline">
//           <div className="inline-field">
//             <label htmlFor="productName">Product Name:</label>
//             <input
//               type="text"
//               id="productName"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="inline-field">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group inline">
//           <div className="inline-field">
//             <label htmlFor="category">Category:</label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select a category</option>
//               {categories.map((cat, index) => (
//                 <option key={index} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//           <div className="inline-field">
//             <label htmlFor="newCategory">Add New Category:</label>
//             <input
//               type="text"
//               id="newCategory"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//             />
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             <button type="button" onClick={handleAddCategory}>Add Category</button>
//           </div>
//         </div>
//         <div className="form-group">
//           <label htmlFor="image">Product Image:</label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>
//         <button type="submit" className="submit-button">{loading ? 'Adding...' : 'Add Product'}</button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;

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
