//     import { assets } from '../../assets/assets';
// import { useStoreContext } from '../../context/StoreContext';
// import './FoodItem.css';

// function FoodItem({ item }) {
//     const { id, name, image, price, description } = item;
//     const { cartItems, removeFromCart, addToCart } = useStoreContext();

//     // Increment item in the cart
//     const handleIncrement = () => {
//         addToCart(id);
//         console.log(cartItems);
//     };

//     // Decrement item in the cart
//     const handleDecrement = () => {
//         removeFromCart(id);
//     };

//     const itemCount = cartItems[id] || 0;  // Default to 0 if item is not in cart

//     return (
//         <div className='food-item'>
//             <div className='food-item-image-container'>
//                 <img src={image} alt={name} className='food-item-image' />
//                 {itemCount === 0 ? (
//                     <img
//                         className='add'
//                         onClick={handleIncrement}
//                         src={assets.add_icon_white}
//                         alt='Add item'
//                     />
//                 ) : (
//                     <div className='food-item-counter'>
//                         <img
//                             onClick={handleDecrement}
//                             src={assets.remove_icon_red}
//                             alt="Remove item"
//                         />
//                         <p>{itemCount}</p>
//                         <img
//                             onClick={handleIncrement}
//                             src={assets.add_icon_green}
//                             alt="Add item"
//                         />
//                     </div>
//                 )}
//             </div>
//             <div className='food-item-info'>
//                 <div className='food-item-name-rating'>
//                     <p className='food-item-name'>{name}</p>
//                     <img src={assets.rating_starts} alt="Rating stars" />
//                 </div>
//             </div>
//             <p className='food-item-description'>{description}</p>
//             <p className='food-item-price'>${price}</p>
//         </div>
//     );
// }

// export default FoodItem;

import { assets } from '../../assets/assets';
import { useStoreContext } from '../../context/StoreContext';
import './FoodItem.css';

function FoodItem({ item }) {
    const { id, name, image, price, description } = item;
    const { cartItems, removeFromCart, addToCart } = useStoreContext();

    const itemCount = cartItems[id] || 0; // Default to 0 if item is not in cart

    const handleIncrement = () => {
        addToCart(id);
    };

    const handleDecrement = () => {
        removeFromCart(id);
    };

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems]); // Log cartItems whenever it changes

    return (
        <div className = 'food-item'>
        <div className = 'food-item-image-container'>
        <img src       = {image} alt = {name} className = 'food-item-image' />
                {itemCount === 0 ? (
                    <img
                        className='add'
                        onClick={handleIncrement}
                        src={assets.add_icon_white}
                        alt='Add item'
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={handleDecrement}
                            src={assets.remove_icon_red}
                            alt="Remove item"
                        />
                        <p>{itemCount}</p>
                        <img
                            onClick={handleIncrement}
                            src={assets.add_icon_green}
                            alt="Add item"
                        />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p className='food-item-name'>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
            </div>
            <p className='food-item-description'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>
    );
}
export default FoodItem;
