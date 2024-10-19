// import { useNavigate } from 'react-router-dom';
// import { food_list } from '../../assets/assets';
// import { useStoreContext } from '../../context/StoreContext';
// import './cart.css';
// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../context/FireContext';
// export default function Cart() {
//   const { cartItems, removeFromCart, getTotalCartAmount } = useStoreContext();
//   const navigate                                          = useNavigate();
//   const { addOrder, loading }                             = useFireContext();


//   const handleSubmit = () => {
//     useEffect{
//       () => {
//         addOrder(...getTotalCartAmount+2,cartItems);
//       }
//     } [];
// }

// return (
//   <div className = 'cart'>
//   <div className = "cart-items">
//   <div className = "cart-items-title">
//         <p>Items</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <br />
//       <hr />
//       {food_list.map((food) => {
//         if (cartItems[food.id] > 0) {
//           return (
//             <>
//               <div className = "cart-items-title cart-items-item" key = {food.id}>
//               <img src       = {food.image} alt                       = {food.name} />
//                 <p>{food.name}</p>
//                 <p>${food.price}</p>
//                 <p>{cartItems[food.id]}</p>
//                 <p>${food.price * cartItems[food.id]}</p>
//                 <button className = 'cross' onClick = {() => removeFromCart(food.id)}>X</button>
//               </div>
//               <hr />
//             </>
//           )
//         }
//       })}

//     </div>
//     <div className = "cart-bottom">
//     <div className = "cart-total">
//         <h2>Cart Totals</h2>
//         <div>
//           <div className = "cart-total-details">
//             <p>Subtotal</p>
//             <p>${getTotalCartAmount()}</p>
//           </div>
//           <hr />
//           <div className = "cart-total-details">
//             <p>Delivery Fee</p>
//             <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//           </div>
//           <hr />
//           <div className = "cart-total-details">
//             <b>Total</b>
//             <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//           </div>
//         </div>
//         <button onClick = {() => navigate('/placeOrder')} >{loading?"Loading..." : 'PROCEED TO CHECKOUT'}</button>
//       </div>
//       <div className = "cart-promo-code">
//         <div>
//           <p>if you have a promo code, enter it here</p>
//           <div   className = 'cart-promo-code-input'>
//           <input type      = "text" placeholder = 'Promo Code' />
//             <button>Apply</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }

// import { useNavigate } from 'react-router-dom';
// import { food_list } from '../../assets/assets';
// import { useStoreContext } from '../../context/StoreContext';
// import './cart.css';
//     // import { useEffect, useState } from 'react';
// import { useFireContext } from '../../context/FireContext';

// export default function Cart() {
//   const { cartItems, removeFromCart, getTotalCartAmount } = useStoreContext();
//   const navigate                                          = useNavigate();
//   const { addOrder, loading }                             = useFireContext();

//   const handleSubmit = () => {
//                                                    // Call addOrder with the total amount and cart items
//     const totalAmount = getTotalCartAmount() + 2;  // Delivery fee
//     addOrder(totalAmount, cartItems);
//     navigate('/placeOrder');
//   };

//   return (
//     <div className = 'cart'>
//     <div className = "cart-items">
//     <div className = "cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((food) => {
//           if (cartItems[food.id] > 0) {
//             return (
//               <div className = "cart-items-title cart-items-item" key = {food.id}>
//               <img src       = {food.image} alt                       = {food.name} />
//                 <p>{food.name}</p>
//                 <p>${food.price}</p>
//                 <p>{cartItems[food.id]}</p>
//                 <p>${food.price * cartItems[food.id]}</p>
//                 <button className = 'cross' onClick = {() => removeFromCart(food.id)}>X</button>
//                 <hr />
//               </div>
//             );
//           }
//           return null;  // Return null for items not in the cart
//         })}
//       </div>
//       <div className = "cart-bottom">
//       <div className = "cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className = "cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className = "cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className = "cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button onClick = {handleSubmit}>
//             {loading ? "Loading..." : 'PROCEED TO CHECKOUT'}
//           </button>
//         </div>
//         <div className = "cart-promo-code">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div   className = 'cart-promo-code-input'>
//             <input type      = "text" placeholder = 'Promo Code' />
//               <button>Apply</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { food_list } from '../../assets/assets';
import { useFireContext } from '../../context/FireContext';
import { useStoreContext } from '../../context/StoreContext';
import './cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, getTotalCartAmount } = useStoreContext();
  const navigate = useNavigate();
  const { loading, getProducts,isLogin } = useFireContext();

  const [combinedProducts, setCombinedProducts] = useState([]);    // State to hold combined products
  const [loadingProducts, setLoadingProducts] = useState(true);  // State to manage loading products

  const handleSubmit = () => {
    if (!isLogin()) {
      alert('Please login first');
    } else {
      navigate('/placeOrder');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);  // Set loading state
      try {
        const firestoreProducts = await getProducts();             // Fetch products from Firestore
        const allProducts = [...firestoreProducts, ...food_list];  // Combine Firestore data with local data
        setCombinedProducts(allProducts);                                        // Update the combined products state
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);  // Reset loading state
      }
    };

    fetchProducts();  // Call the function to fetch products
  }, [getProducts]);

  // Calculate total amount from cartItems and combinedProducts
  const calculateTotalAmount = () => {
    return combinedProducts.reduce((total, product) => {
      const quantity = cartItems[product.id];
      return total + (quantity ? product.price * quantity : 0);
    }, 0);
  };

  const subtotal = calculateTotalAmount();  // Calculate subtotal
  const deliveryFee = subtotal === 0 ? 0 : 2;  // Delivery fee
  const total = subtotal + deliveryFee;  // Calculate total

  console.log(cartItems);
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : (
          combinedProducts.map((food) => {
            if (cartItems[food.id] > 0) {
              return (
                <div className="cart-items-title cart-items-item" key={food.id}>
                  <img src={food.image} alt={food.name} />
                  <p>{food.name}</p>
                  <p>${food.price}</p>
                  <p>{cartItems[food.id]}</p>
                  <p>${food.price * cartItems[food.id]}</p>
                  <button className='cross' onClick={() => removeFromCart(food.id)}>X</button>
                  <hr />
                </div>
              );
            }
            return null;  // Return null for items not in the cart
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button onClick={handleSubmit}>
            {loading ? "Loading..." : 'PROCEED TO CHECKOUT'}
          </button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promo-code-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
