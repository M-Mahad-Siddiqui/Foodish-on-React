// import { useEffect, useState } from "react";
// import { useFireContext } from "../../../context/FireContext";
// import Modal from "./Modal";  // Import the Modal component
// import "./ViewProducts.css";

// function ViewProducts() {
//   const [products, setProducts]                       = useState([]);
//   const [isModalOpen, setIsModalOpen]                 = useState(false);
//   const [selectedProduct, setSelectedProduct]         = useState(null);
//   const { getProducts, deleteProduct, updateProduct } = useFireContext();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [getProducts]);

//   const handleUpdateProduct = async (updatedProduct) => {
//     await updateProduct(updatedProduct.id, updatedProduct);
//     const data = await getProducts();  // Refresh the products list
//     setProducts(data);
//   };

//   return (
//     <div className = "container">
//       <h1>View Products</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Product Name</th>
//             <th>Product Description</th>
//             <th>Product Price</th>
//             <th>Product Image</th>
//             <th>Product Category</th>
//             <th>Delete</th>
//             <th>Update</th>
//           </tr>
//         </thead>

//         <tbody>

//         <br />
//           {products.map((product) => (
//             <tr key = {product.id}>
//               <td>{product.id}</td>
//               <td>{product.name}</td>
//               <td>{product.description}</td>
//               <td>{product.price}</td>
//               <td>
//                 {product.image && <img id='product-image' src={product.image} alt={product.name} style={{ width: '100px' }} />}
//               </td>
//               <td>{product.category}</td>
//               <td onClick = {() => deleteProduct(product.id)}>🗑️(❌)</td>
//               <td onClick = {() => {
//                 setSelectedProduct(product);
//                 setIsModalOpen(true);
//               }}>🔄(✏️)</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Modal
//         isOpen   = {isModalOpen}
//         onClose  = {() => setIsModalOpen(false)}
//         product  = {selectedProduct}
//         onUpdate = {handleUpdateProduct}
//       />
//     </div>
//   );
// }

// export default ViewProducts;


import { useEffect, useState } from "react";
import { useFireContext } from "../../../context/FireContext";
import Modal from "./Modal"; // Import the Modal component
import "./ViewProducts.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getProducts, deleteProduct, updateProduct } = useFireContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [getProducts,deleteProduct]);

  const handleUpdateProduct = async (updatedProduct) => {
    await updateProduct(updatedProduct.id, updatedProduct);
    const data = await getProducts(); // Refresh the products list
    setProducts(data);
  };

  return (
    <div className="view-products">
      <h1 className="products-heading">View Products</h1>
      <div className="product-title">
        <p>Product ID</p>
        <p>Product Name</p>
        <p>Product Description</p>
        <p>Product Price</p>
        <p>Product Image</p>
        <p>Product Category</p>
        <p>Actions</p>
      </div>
      <hr />
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product-row" key={product.id}>
            <p>{product.id}</p>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>
              {product.image && (
                <img
                  id    = "product-image"
                  src   = {product.image}
                  alt   = {product.name}
                  style = {{ width: '90px' }}
                />
              )}
            </p>
            <p>{product.category}</p>
            <p>
              <span className="action-icons" onClick={() => deleteProduct(product.id)}>🗑️</span>
              <span className="action-icons" onClick={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}>🔄</span>
            </p>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />
    </div>
  );
}

export default ViewProducts;
