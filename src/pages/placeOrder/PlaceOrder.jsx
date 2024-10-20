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
