import { createContext, useContext, useState } from 'react';
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    // const addToCart = (itemId) => {
    //     if (!cartItems[itemId]) {
    //         setCartItems({ ...cartItems, [itemId]: 1 });
    //     } else {
    //         setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    //     }
    // }

    // const removeFromCart = (itemId) => {
    //     if (cartItems[itemId] === 1) {
    //         setCartItems({ ...cartItems, [itemId]: 0 });
    //     } else {
    //         setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
    //     }
    // }

 const addToCart = (itemId) => {
    setCartItems(prevItems => ({
        ...prevItems,
        [itemId]: (prevItems[itemId] || 0) + 1,
    }));
}

const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
        if (prevItems[itemId] === 1) {
            const { [itemId]: _, ...rest } = prevItems;  // Remove item from cart
            return rest;
        } else {
            return {
                ...prevItems,
                [itemId]: (prevItems[itemId] || 0) - 1,
            };
        }
    });
}
   const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            const itemInfo = food_list.find((food) => Number(food.id) === Number(item));
            if (itemInfo) {
                total += cartItems[item] * itemInfo.price;
            } else {
                console.warn(`Item with id ${item} not found in food_list`);
            }
        }
    }
    return total;
};

    const getTotalQuantity = () => {
        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                total += cartItems[item];
            }
        }
        return total;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalQuantity

    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

// Custom hook for easier access to the context
export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStoreContext must be used within a StoreContextProvider');
    }
    return context;
};

export default StoreContextProvider;

// Named Export vs. Default Export: 
// When you use export default, you're exporting a single value as the default export from a module. You can then import it without curly braces.
// When you use export (without default), you're exporting a named value. You need to import it using curly braces.



// export const StoreContext = React.createContext(null);
// import { food_list } from "../assets/assets";

// const StoreContextProvider = (props) => {


//     const contextValue = {
//         food_list

//     };

//     return (
//         <StoreContext.Provider value = {contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     );
// };

// export default StoreContextProvider;