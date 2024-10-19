// import { useState } from "react";
// import { useStoreContext } from "../../context/StoreContext";
// import { useFireContext } from "../../context/FireContext";
// import "./placeOrder.css";

// export default function PlaceOrder() {
// 	const { getTotalCartAmount } = useStoreContext();
// 	const { addUserInfo, loading } = useFireContext();

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		addUserInfo(formValues);
// 		handleReset();
// 	};

// 	const handleReset = () => {
// 		setFormValues({
// 			firstName: "",
// 			lastName: "",
// 			email: "",
// 			street: "",
// 			city: "",
// 			state: "",
// 			zipCode: "",
// 			country: "",
// 			phone: "",
// 		});
// 	};

// 	// Manage form input values in an object
// 	const [formValues, setFormValues] = useState({
// 		firstName: "",
// 		lastName: "",
// 		email: "",
// 		street: "",
// 		city: "",
// 		state: "",
// 		zipCode: "",
// 		country: "",
// 		phone: "",
// 	});

// 	// Handle change for form inputs
// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormValues({
// 			...formValues,
// 			[name]: value,
// 		});
// 	};

// 	console.log(formValues);

// 	return (
// 		<form className="placeOrder" onSubmit={handleSubmit}>
// 			<div className="place-order-left">
// 				<p className="title">Delivery Information</p>
// 				<div className="multi-fields">
// 					<input
// 						name="firstName"
// 						value={formValues.firstName}
// 						onChange={handleInputChange}
// 						type="text"
// 						placeholder="First Name"
// 					/>
// 					<input
// 						name="lastName"
// 						value={formValues.lastName}
// 						onChange={handleInputChange}
// 						type="text"
// 						placeholder="Last Name"
// 					/>
// 				</div>
// 				<input name="email" value={formValues.email} onChange={handleInputChange} type="email" placeholder="Email Address" />
// 				<input name="street" value={formValues.street} onChange={handleInputChange} type="text" placeholder="Street" />
// 				<div className="multi-fields">
// 					<input name="city" value={formValues.city} onChange={handleInputChange} type="text" placeholder="City" />
// 					<input name="state" value={formValues.state} onChange={handleInputChange} type="text" placeholder="State" />
// 				</div>
// 				<div className="multi-fields">
// 					<input name="zipCode" value={formValues.zipCode} onChange={handleInputChange} type="text" placeholder="Zip Code" />
// 					<input name="country" value={formValues.country} onChange={handleInputChange} type="text" placeholder="Country" />
// 				</div>
// 				<input name="phone" value={formValues.phone} onChange={handleInputChange} type="text" placeholder="Phone" />
// 			</div>

// 			<div className="place-order-right">
// 				<div className="cart-total">
// 					<h2>Cart Totals</h2>
// 					<div>
// 						<div className="cart-total-details">
// 							<p>Subtotal</p>
// 							<p>${getTotalCartAmount()}</p>
// 						</div>
// 						<hr />
// 						<div className="cart-total-details">
// 							<p>Delivery Fee</p>
// 							<p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
// 						</div>
// 						<hr />
// 						<div className="cart-total-details">
// 							<b>Total</b>
// 							<b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
// 						</div>
// 					</div>
// 					<button type="submit">{loading ? "Loading..." : "PROCEED TO PAYMENTS"}</button>
// 				</div>
// 			</div>
// 		</form>
// 	);
// }

// 2 apprach is to use better way to submit form using form data object

// import { useEffect, useState } from "react";
// import { food_list } from "../../assets/assets";
// import { useFireContext } from "../../context/FireContext";
// import { useStoreContext } from "../../context/StoreContext";
// import "./placeOrder.css";

// export default function PlaceOrder() {
//   const { getTotalCartAmount, cartItems } = useStoreContext();
//   const { addUserInfo, loading, getProducts, addOrder } = useFireContext();

//   const [combinedProducts, setCombinedProducts] = useState([]); // Combined product list state
//   const [loadingProducts, setLoadingProducts] = useState(true); // Loading state for products
//   const [selectedItems, setSelectedItems] = useState([]); // Selected items state

//   useEffect(() => {
//     const fetchSelectedItems = async () => {
//       setLoadingProducts(true);
//       try {
//         const firestoreProducts = await getProducts(); // Fetch products from Firestore
//         const allProducts = [...firestoreProducts, ...food_list]; // Combine Firestore and local products
//         setCombinedProducts(allProducts); // Update combined products state
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };
//     fetchSelectedItems(); // Call the function to fetch products
//   }, [getProducts]);

//   useEffect(() => {
//     const selected = combinedProducts.reduce((acc, food) => {
//       if (cartItems[food.id]) {
//         acc.push({
//           id: food.id,               // Include product ID
//           image: food.image,
//           name: food.name,
//           price: food.price,
//           quantity: cartItems[food.id],
//           total: food.price * cartItems[food.id],
//         });
//       }
//       return acc;
//     }, []);
//     setSelectedItems(selected);
//   }, [combinedProducts, cartItems]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const userData = {
//       firstName: formData.get("firstName"),
//       lastName: formData.get("lastName"),
//       email: formData.get("email"),
//       street: formData.get("street"),
//       city: formData.get("city"),
//       state: formData.get("state"),
//       zipCode: formData.get("zipCode"),
//       country: formData.get("country"),
//       phone: formData.get("phone"),
//     };

//     // Add selected items and user information to the order
//     const orderData = {
//       user: userData,       // Include user data
//       items: selectedItems, // Include selected items
//     };

//     try {
//       await addOrder(orderData); // Send complete order data
//       await addUserInfo(userData); // Optionally, save user info
//       e.target.reset(); // Reset the form fields after submission
//       console.log("Order placed successfully");
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <form className="placeOrder" onSubmit={handleSubmit}>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input name="firstName" type="text" placeholder="First Name" required />
//           <input name="lastName" type="text" placeholder="Last Name" required />
//         </div>
//         <input name="email" type="email" placeholder="Email Address" required />
//         <input name="street" type="text" placeholder="Street" required />
//         <div className="multi-fields">
//           <input name="city" type="text" placeholder="City" required />
//           <input name="state" type="text" placeholder="State" required />
//         </div>
//         <div className="multi-fields">
//           <input name="zipCode" type="text" placeholder="Zip Code" required />
//           <input name="country" type="text" placeholder="Country" required />
//         </div>
//         <input name="phone" type="text" placeholder="Phone" required />
//       </div>

//       {/* Cart totals */}
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           {loadingProducts ? (
//             <p>Loading products...</p>
//           ) : (
//             <>
//               <div>
//                 <div className="cart-total-details">
//                   <p>Subtotal</p>
//                   <p>${getTotalCartAmount()}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-details">
//                   <p>Delivery Fee</p>
//                   <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//                 </div>
//                 <hr />
//                 <div className="cart-total-details">
//                   <b>Total</b>
//                   <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                 </div>
//               </div>
//               <button type="submit">
//                 {loading ? "Loading..." : "PROCEED TO PAYMENTS"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// }

// import { useEffect, useState } from "react";
// import { food_list } from "../../assets/assets";
// import { useFireContext } from "../../context/FireContext";
// import { useStoreContext } from "../../context/StoreContext";
// import "./placeOrder.css";

// export default function PlaceOrder() {
//   const { getTotalCartAmount, cartItems, setCartItems }      = useStoreContext();
//   const { addUserInfo, loading, getProducts, addOrder,user } = useFireContext();

//   const [combinedProducts, setCombinedProducts] = useState([]);    // Combined product list state
//   const [loadingProducts, setLoadingProducts]   = useState(true);  // Loading state for products
//   const [selectedItems, setSelectedItems]       = useState([]);    // Selected items state

//   useEffect(() => {
//     const fetchSelectedItems = async () => {
//       setLoadingProducts(true);
//       try {
//         const               firestoreProducts = await getProducts();             // Fetch products from Firestore
//         const               allProducts = [...firestoreProducts, ...food_list];  // Combine Firestore and local products
//         setCombinedProducts(allProducts);                                        // Update combined products state
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoadingProducts(false);
//       }
//     };
//     fetchSelectedItems();  // Call the function to fetch products
//   }, [getProducts]);

//   useEffect(() => {
//     const selected = combinedProducts.reduce((acc, food) => {
//       if (cartItems[food.id]) {
//         acc.push({
//           image   : food.image,
//           name    : food.name,
//           price   : food.price,
//           quantity: cartItems[food.id],
//           total   : food.price * cartItems[food.id],
//         });
//       }
//       return acc;
//     }, []);
//     setSelectedItems(selected);
//   }, [combinedProducts, cartItems]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);

//     const data = {
//       firstName    : formData.get("firstName"),
//       lastName     : formData.get("lastName"),
//       email        : formData.get("email"),
//       street       : formData.get("street"),
//       city         : formData.get("city"),
//       state        : formData.get("state"),
//       zipCode      : formData.get("zipCode"),
//       country      : formData.get("country"),
//       phone        : formData.get("phone"),
//       selectedItems: selectedItems               // Include selected items in the data
//     };

//     addOrder       (data);  // Send data including user info and selected items
//     addUserInfo    (data);  // Optionally, send user info separately if needed
//     e.target.reset();       // Reset the form fields after submission
//     alert("Order placed successfully");
//     setCartItems({});

//   };

//   return (
//     <form  className = "placeOrder" onSubmit = {handleSubmit}>
//     <div   className = "place-order-left">
//     <p     className = "title">Delivery Information</p>
//     <div   className = "multi-fields">
//     <input name      = "firstName" type      = "text" placeholder = "First Name" required />
//     <input name      = "lastName" type       = "text" placeholder = "Last Name" required />
//         </div>
//         <input name      = "email" type  = "email" value      = {user ? user.email : ""} placeholder = {user ? user.email : "Email Address enter"}  required />
//         <input name      = "street" type = "text" placeholder = "Street" required />
//         <div   className = "multi-fields">
//         <input name      = "city" type   = "text" placeholder = "City" required />
//         <input name      = "state" type  = "text" placeholder = "State" required />
//         </div>
//         <div   className = "multi-fields">
//         <input name      = "zipCode" type = "text" placeholder = "Zip Code" required />
//         <input name      = "country" type = "text" placeholder = "Country" required />
//         </div>
//         <input {(e)=>e.length < 10 : "Please enter a valid phone number" : ""} name = "phone" type = "text" placeholder = "Phone" required />
//       </div>

  //       {/* Cart totals */}
  //       <div className = "place-order-right">
  //       <div className = "cart-total">
  //           <h2>Cart Totals</h2>
  //           {loadingProducts ? (
  //             <p>Loading products...</p>
  //           ) : (
  //             <>
  //               <div>
  //                 <div className = "cart-total-details">
  //                   <p>Subtotal</p>
  //                   <p>${getTotalCartAmount()}</p>
  //                 </div>
  //                 <hr />
  //                 <div className = "cart-total-details">
  //                   <p>Delivery Fee</p>
  //                   <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
  //                 </div>
  //                 <hr />
  //                 <div className = "cart-total-details">
  //                   <b>Total</b>
  //                   <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
  //                 </div>
  //               </div>
  //               <button type = "submit">
  //                 {loading ? "Loading..." : "PROCEED TO PAYMENTS"}
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </form>
  //   );
  // }
  // input number sy phely ka invalidation code hain and cartitems != 0

import { useEffect, useState } from "react";
import { food_list } from "../../assets/assets";
import { useFireContext } from "../../context/FireContext";
import { useStoreContext } from "../../context/StoreContext";
import "./placeOrder.css";

export default function PlaceOrder() {
  const { getTotalCartAmount, cartItems, setCartItems } = useStoreContext();
  const { addUserInfo, loading, getProducts, addOrder, user } = useFireContext();

  const [combinedProducts, setCombinedProducts] = useState([]);  // Combined product list state
  const [loadingProducts, setLoadingProducts] = useState(true);  // Loading state for products
  const [selectedItems, setSelectedItems] = useState([]);        // Selected items state

  useEffect(() => {
    const fetchSelectedItems = async () => {
      setLoadingProducts(true);
      try {
        const firestoreProducts = await getProducts();  // Fetch products from Firestore
        const allProducts = [...firestoreProducts, ...food_list];  // Combine Firestore and local products
        setCombinedProducts(allProducts);  // Update combined products state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchSelectedItems();  // Call the function to fetch products
  }, [getProducts]);

  useEffect(() => {
    const selected = combinedProducts.reduce((acc, food) => {
      if (cartItems[food.id]) {
        acc.push({
          image: food.image,
          name: food.name,
          price: food.price,
          quantity: cartItems[food.id],
          total: food.price * cartItems[food.id]
        });
      }
      return acc;
    }, []);
    setSelectedItems(selected);
  }, [combinedProducts, cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if cart is empty
    if (Object.keys(cartItems).length === 0) {
      alert("Add at least one item to proceed.");
      return;  // Prevent form submission if cart is empty
    }

    const formData = new FormData(e.target);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      selectedItems: selectedItems // Include selected items in the data
    };

    addOrder(data);  // Send data including user info and selected items
    addUserInfo(data);  // Optionally, send user info separately if needed
    e.target.reset();  // Reset the form fields after submission
    alert("Order placed successfully");
    setCartItems({});
  };

  return (
    <form className="placeOrder" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" type="text" placeholder="First Name" required />
          <input name="lastName" type="text" placeholder="Last Name" required />
        </div>
        <input
          name        = "email"
          type        = "email"
          value       = {user ? user.email : ""}
          placeholder = {user ? user.email : "Email Address"}
          required
        />
        <input name="street" type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input name="city" type="text" placeholder="City" required />
          <input name="state" type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipCode" type="text" placeholder="Zip Code" required />
          <input name="country" type="text" placeholder="Country" required />
        </div>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="\d{10,}"
          placeholder="Phone"
          required
          title="Please enter a valid phone number of at least 10 digits"
        />
      </div>

      {/* Cart totals */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          {loadingProducts ? (
            <p>Loading products...</p>
          ) : (
            <>
              <div>
                <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                  <b>Total</b>
                  <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                </div>
              </div>
              <button type="submit">
                {loading ? "Loading..." : "PROCEED TO PAYMENTS"}
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
