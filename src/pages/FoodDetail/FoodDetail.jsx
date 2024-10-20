import { useCallback, useEffect, useState } from 'react';
import { useFireContext } from '../../context/FireContext';
import { useStoreContext } from '../../context/StoreContext';
import { useParams, useNavigate } from 'react-router-dom';
import './FoodDetail.css';
import back from '../../assets/back.png';
const FoodDetail = () => {

    const { getProducts } = useFireContext();   // Firestore products fetching function 
    const { food_list } = useStoreContext();  // Local store food list

    const { id } = useParams();      // Get id from URL
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

        // const location = useLocation();
        // console.log("Location:", location);
    console.log("ID:", id);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);  // Show loading indicator
            const data = await getProducts();  // Fetch products from Firestore
            const combinedProducts = [...data, ...food_list];  // Combine Firestore data with local data
            setFood(combinedProducts);  // Update state with combined products
        } catch (error) {
            console.error("Error fetching products:", error);  // Handle errors
        } finally {
            setLoading(false);  // Hide loading indicator
        }
    }, [getProducts, food_list]);  // Dependencies include getProducts and food_list

    // Use useEffect to fetch products only once when component mounts
    useEffect(() => {
        fetchProducts();  // Call the fetch function
    }, [fetchProducts]);  // Depend on the memoized fetchProducts function

    return (
        <div className="food-detail">
            <div className="label">
                <img onClick={() => navigate('/')} className='back' src={back} alt="Back" />
                Good food brings people together, and every bite tells a story of flavors, passion, and love.</div>
            <div className='food-des'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    food
                        .filter(item => String(item.id) === id)  // Convert item.id to string for comparison
                        .map((item, index) => (
                            <div key={index}>
                                <img src={item.image} alt="image" />
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p>${item.price}</p>

                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default FoodDetail;
