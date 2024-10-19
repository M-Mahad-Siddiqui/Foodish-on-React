// import { useStoreContext } from '../../context/StoreContext';  // Corrected import
// import FoodItem from '../FoodItem/FoodItem';
// import './foodDisplay.css';

// function FoodDisplay({ category }) {
//     const { food_list } = useStoreContext();

//    return (
//     <div className = 'food-display' id = 'food-display'>
//         <h2>Top Dishes near you</h2>
//         {food_list.length > 0 ? (
//             <div className = 'food-display-list'>
//                    {food_list.map((item, index) => (
//                     if(item.category === category || category === "All") {
//                         return (
//                             <FoodItem key = {index} item = {item} />
//                         )
//                     }
//                 ))}
//             </div>
//         ) : (
//             <p>No food items available.</p>
//         )}
//     </div>
// );
// }

  // export default FoodDisplay;




              // import { useFireContext } from '../../context/FireContext';
              // import { useStoreContext } from '../../context/StoreContext'; // Corrected import
              // import FoodItem from '../FoodItem/FoodItem';
              // import './foodDisplay.css';

            // function FoodDisplay({ category }) {
            //     const { food_list }   = useStoreContext();
            //     const { getProducts } = useFireContext();

            //     return (
            //         <div className='food-display' id='food-display'>
            //             <h2>Top Dishes near you</h2>
            //             {food_list.length > 0 ? (
            //                 <div className='food-display-list'>
            //                     {food_list
            //                         .filter(item => item.category === category || category === "All")
            //                         .map((item, index) => (
            //                             <FoodItem key={index} item={item} />
            //                         ))}
            //                 </div>
            //             ) : (
            //                 <p>No food items available.</p>
            //             )}
            //         </div>
            //     );
            // }

            // export default FoodDisplay;

// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../context/FireContext';
// import { useStoreContext } from '../../context/StoreContext';
// import FoodItem from '../FoodItem/FoodItem';
// import './foodDisplay.css';

// function FoodDisplay({ category }) {
//     const { getProducts, loading } = useFireContext(); // Firestore products fetching function with loading state
//     const { food_list } = useStoreContext(); // Local store food list
//     const [products, setProducts] = useState([]); // State for combined products

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const data = await getProducts(); // Fetch products from Firestore
//                 const combinedProducts = [...data, ...food_list]; // Combine Firestore data with local data
//                 setProducts(combinedProducts); // Update state with combined products
//                 console.log(combinedProducts);
//             } catch (error) {
//                 console.error("Error fetching products:", error); // Handle errors
//             }
//         };

//         fetchProducts();
//     }, [getProducts, food_list]); // Dependencies include getProducts and food_list

//     return (
//         <div className='food-display' id='food-display'>
//             <h2>Top Dishes near you</h2>
//             {loading ? (
//                 <p>Loading...</p> // Show loading while fetching
//             ) : products.length > 0 ? (
//                 <div className='food-display-list'>
//                     {products
//                         .filter(item => item.category === category || category === "All") // Filter by category or show all
//                         .map((item, index) => (
//                             <FoodItem key={index} item={item} /> // Render each food item
//                         ))}
//                 </div>
//             ) : (
//                 <p>No food items available.</p> // Show message if no products found
//             )}
//         </div>
//     );
// }

  // export default FoodDisplay;

  

import { useCallback, useEffect, useState } from 'react';
import { useFireContext } from '../../context/FireContext';
import { useStoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './foodDisplay.css';

function FoodDisplay({ category }) {
  const { getProducts }         = useFireContext();   // Firestore products fetching function 
  const { food_list }           = useStoreContext();  // Local store food list
  const [products, setProducts] = useState([]);       // State for combined products
  const [loading, setLoading]   = useState(false);    // Loading state
  
          // Memoize the fetch function to avoid unnecessary re-renders
  const fetchProducts = useCallback(async () => {
    try {
      setLoading  (true);                                      // Show loading indicator
      const       data = await getProducts();                  // Fetch products from Firestore
      const       combinedProducts = [...data, ...food_list];  // Combine Firestore data with local data
      setProducts(combinedProducts);                           // Update state with combined products
    } catch (error) {
      console.error("Error fetching products:", error);  // Handle errors
    } finally {
      setLoading(false);  // Hide loading indicator
    }
  }, [getProducts, food_list]); // Dependencies include getProducts and food_list
  
          // Use useEffect to fetch products only once when component mounts
  useEffect(() => {
  fetchProducts();                   // Call the fetch function
  }             , [fetchProducts]);  // Depend on the memoized fetchProducts function

  return (
    <div className = 'food-display' id = 'food-display'>
      <h2>Top Dishes near you</h2>
      {loading ? (
        <p>Loading...</p>  // Show loading while fetching
      ) : products.length > 0 ? (
        <div className = 'food-display-list'>
          {products
            .filter(item => item.category === category || category === "All")  // Filter by category or show all
            .map((item, index) => (
              <FoodItem key = {index} item = {item} />  // Render each food item
            ))}
        </div>
      ) : (
        <p>No food items available.</p>  // Show message if no products found
      )}
    </div>
  );
}

export default FoodDisplay;
