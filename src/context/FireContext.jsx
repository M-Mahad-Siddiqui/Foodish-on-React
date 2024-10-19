// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signOut
// } from 'firebase/auth';
// import { collection, getDocs } from 'firebase/firestore';
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../utiles/utils.js';

// export const FireContext = createContext(null);

// export const FireProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     console.log('FireProvider mounted');

//     // useEffect to handle side effect of auth state change
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             setLoading(false);
//         });

//         // Cleanup on unmount
//         return () => unsubscribe();
//     }, []);

//     const isLogin = () => {
//         return Boolean(auth.currentUser);
//         // return !!auth.currentUser;

//     };
//     //    const isLogin = () => {
//     //   return auth.currentUser ? true : false;
//     // };

//     const SignUp = async (email, password) => {
//         return await createUserWithEmailAndPassword(auth, email, password);
//     };

//     const SignIn = async (email, password) => {
//         return await signInWithEmailAndPassword(auth, email, password);
//     };
//     // const SignIn = async (email, password) => {
//     //     try {
//     //         return await signInWithEmailAndPassword(auth, email, password);
//     //     } catch (error) {
//     //         console.error('Error signing in:', error);
//     //         throw error;
//     //     }
//     // };

//     const SignOut = () => {
//         return signOut(auth);
//     };

//     const getDataFromCollection = async (collectionName) => {
//         try {
//             const querySnapshot = await getDocs(collection(db, collectionName));
//             const data = [];
//             querySnapshot.forEach((doc) => {
//                 data.push(doc.data())
//             });
//             return data;
//         } catch (error) {
//             console.error(`Error fetching ${collectionName}:`, error);
//             throw error;
//         }
//     };

//     const getUsers = () => getDataFromCollection('users');
//     const getProducts = () => getDataFromCollection('products');
//     const getOrders = () => getDataFromCollection('orders');
//     const getCart = () => getDataFromCollection('cart');

//     const fireContextValue = {
//         isLogin,
//         user,
//         loading,
//         SignUp,
//         SignIn,
//         SignOut,
//         getUsers,
//         getProducts,
//         getOrders,
//         getCart
//     };

//     return (
//         <FireContext.Provider value={fireContextValue}>
//             {children}
//         </FireContext.Provider>
//     );
// };

// export const useFireContext = () => useContext(FireContext);
// // export const useFireContext = () => {
// //     return useContext(FireContext);
// // }






import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../utiles/utils.js"; // Make sure storage is imported here
export const FireContext = createContext(null);

export const FireProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    console.log("FireProvider mounted");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const isLogin = () => {
        return Boolean(auth.currentUser);
    };

    const SignUp = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const SignIn = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const SignOut = () => {
        return signOut(auth);
    };

    const getDataFromCollection = async (collectionName) => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() }); // Include the document ID
            });
            return data;
        } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const addDataToCollection = async (collectionName, data) => {
        try {
            setLoading(true);
            await addDoc(collection(db, collectionName), data);
            console.log(`Data added to ${collectionName}`);
        } catch (error) {
            console.error(`Error adding data to ${collectionName}:`, error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addImage = async (image) => {
        if (image) {
            const storageRef = ref(storage, `Product_images/${image.name}`);
            await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(storageRef);  // Ensure to get the URL correctly
            return imageUrl;
        }
        return null;  // Return null if no image is provided
    };

    const addProducts = async (data) => {
        setLoading(true);
        data.image = await addImage(data.image);  // Await the image upload
        await addDataToCollection("products", data);
        setLoading(false);
    };

    const removedDataFromCollection = async (collectionName, id) => {
        try {
            setLoading(true);
            await deleteDoc(doc(db, collectionName, id));
            console.log(`Data removed from ${collectionName}`);
        } catch (error) {
            console.error(`Error removing data from ${collectionName}:`, error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        await removedDataFromCollection("products", id);
        setLoading(false);
    };

    const updateDataInCollection = async (collectionName, id, data) => {
        try {
            setLoading(true);
            await updateDoc(doc(db, collectionName, id), data);
            console.log(`Data updated in ${collectionName}`);
        } catch (error) {
            console.error(`Error updating data in ${collectionName}:`, error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, data) => {
        setLoading(true);
        await updateDataInCollection("products", id, data);  // Await the update call
        setLoading(false);
    };

    //     const updateProduct = async (id, updatedData) => {
    //   try {
    //     const productRef = doc(db, "products", id);
    //     await updateDoc(productRef, updatedData);
    //     console.log(`Product with ID ${id} updated successfully`);
    //   } catch (error) {
    //     console.error(`Error updating product with ID ${id}:`, error);
    //   }
    // };



    const getCategories = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "categories")); // Fetch from the "categories" collection
            const categories = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                categories.push({ name: data.name, image: data.image }); // Store name and image
            });
            return categories; // Return array of objects with name and image
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (data) => {
        try {
            setLoading(true);
            if (data.image) {
                data.image = await addImage(data.image); // Upload image and get URL
            }
            await addDataToCollection("categories", data); // Add name and image to "categories" collection
        } catch (error) {
            console.error("Error adding category:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // const addOrder = async (data) => {
    //      try {
    //     setLoading(true);
    //     if (data.image) {
    //         data.image = await addImage(data.image); // Upload image and get URL
    //     }
    //     await addDataToCollection("CustomerOrder", { name: data.name, image: data.image }); // Add name and image to "categories" collection
    // } catch (error) {
    //     console.error("Error adding category:", error);
    //     throw error;
    // } finally {
    //     setLoading(false);
    // }
    // }
    //   const addOrder = async (data) => {
    //     try {
    //         setLoading(true);

    //         // Create the orderData object by spreading all properties from data
    //         const orderData = {
    //             ...data,              // Spread all properties from data
    //             image: data.image || null, // Ensure the image is optional
    //         };

    //         // You can log the orderData to check its structure before saving
    //         console.log("Order Data to save:", orderData);

    //         // Save the orderData to Firestore
    //         await addDataToCollection("CustomerOrder", orderData);  // Ensure orderData is an object
    //         console.log("Order added successfully");
    //     } catch (error) {
    //         console.error("Error adding data to CustomerOrder:", error);
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const addOrder = async (data) => {
        try {
            setLoading(true);

            // Create the orderData object by spreading all properties from data
            const orderData = {
                ...data,              // Spread all properties from data
                image: data.image || null, // Ensure the image is optional
                // Include firstName and lastName in orderData
                firstName: data.firstName,
                lastName: data.lastName
            };

            // Log the orderData to check its structure before saving
            console.log("Order Data to save:", orderData);

            // Save the orderData to Firestore
            await addDataToCollection("CustomerOrder", orderData);  // Ensure orderData is an object
            console.log("Order added successfully");
        } catch (error) {
            console.error("Error adding data to CustomerOrder:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'CustomerOrder', orderId); // Reference to the order document
            await updateDoc(orderRef, { status: newStatus });  // Update the status field in Firestore
            console.log(`Order status updated to ${newStatus} for order ${orderId}`);
        } catch (error) {
            console.error('Error updating order status:', error);
            throw error;
        }
    };

    const getOrders = () => getDataFromCollection("CustomerOrder");
    // const updateOrderStatus = async (orderId, newStatus) => {
    //     try {
    //         const orderRef = doc(db, 'CustomerOrder', orderId); // Reference to the order document
    //         await updateDoc(orderRef, { status: newStatus });  // Update the status field in Firestore
    //         console.log(Order status updated to ${ newStatus } for order ${ orderId });
    //     } catch (error) {
    //         console.error('Error updating order status:', error);
    //         throw error;
    //     }
    // };
    // const getCurrentStatus = async (orderId) => {
    //     try {
    //         const orderRef = doc(db, 'CustomerOrder', orderId);
    //         const orderSnapshot = await getDoc(orderRef);

    //         if (orderSnapshot.exists()) {
    //             const orderData = orderSnapshot.data();
    //             console.log(Order ID: ${ orderId }, Status: ${ orderData.status }); // Check if status is present
    //             return orderData.status;
    //         } else {
    //             console.error(Order with ID ${ orderId } does not exist.);
    //             return null; // or a default status
    //         }
    //     } catch (error) {
    //         console.error('Error fetching order status:', error);
    //         throw error;
    //     }
    // };


const getCurrentStatus = async (orderId) => {
    try {
        const orderRef = doc(db, 'CustomerOrder', orderId);
        const orderSnapshot = await getDoc(orderRef);
        
        if (orderSnapshot.exists()) {
            const orderData = orderSnapshot.data();
            console.log(`Order ID: ${orderId}, Status: ${orderData.status}`); // Check if status is present
            return orderData.status;
        } else {
            console.error(`Order with ID ${orderId} does not exist.`);
            return null; // or a default status
        }
    } catch (error) {
        console.error('Error fetching order status:', error);
        throw error;
    }
};

    const addUserInfo = (data) => addDataToCollection("usersDetails", data);
    // const addOrder    = (data) => addDataToCollection("orders", data);
    const addCart = (data) => addDataToCollection("cart", data);

    const getUserInfo = () => getDataFromCollection("usersDetails");
    // const getProducts = () => getDataFromCollection("products");
    const getProducts = useCallback(() => getDataFromCollection("products"), []);
    // const getOrders   = () => getDataFromCollection("CustomerOrder");
    const getCart = () => getDataFromCollection("cart");

    const fireContextValue = {
        isLogin,
        user,
        loading,
        SignUp,
        SignIn,
        SignOut,
        updateOrderStatus,
        getCurrentStatus,
        addCategory,
        getCategories,
        deleteProduct,
        updateProduct,
        getUserInfo,
        getProducts,
        getOrders,
        getCart,
        addProducts,
        addUserInfo,
        addOrder,
        addCart
    };

    return <FireContext.Provider value={fireContextValue}>{children}</FireContext.Provider>;
};

export const useFireContext = () => useContext(FireContext);





// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db, storage } from "../utiles/utils.js"; // Make sure storage is imported here

//     export const FireContext = createContext(null);

//     export const FireProvider = ({ children }) => {
//         const [user, setUser]       = useState(null);
//         const [loading, setLoading] = useState(true);
//         const navigate              = useNavigate();

//         console.log("FireProvider mounted");

//         useEffect(() => {
//             const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//                 setUser(currentUser);
//                 setLoading(false);
//             });

//             return () => unsubscribe();
//         }, []);

//         const isLogin = () => {
//             return Boolean(auth.currentUser);
//         };

//         const SignUp = async (email, password) => {
//             return await createUserWithEmailAndPassword(auth, email, password);
//         };

//         const SignIn = async (email, password) => {
//             return await signInWithEmailAndPassword(auth, email, password);
//         };

//         const SignOut = () => {
//             return signOut(auth);
//         };

//         const getDataFromCollection = async (collectionName) => {
//             try {
//                 setLoading(true);
//                 const querySnapshot = await getDocs(collection(db, collectionName));
//                 const data          = [];
//                 querySnapshot.forEach((doc) => {
//                     data.push(doc.data());
//                 });
//                 return data;
//             } catch (error) {
//                 console.error(Error fetching ${collectionName}:, error);
//                 throw error;
//             }finally {
//                 setLoading(false);
//             }
//         };

//         const addDataToCollection = async (collectionName, data) => {
//             try {
//                 setLoading(true);
//                 await addDoc(collection(db, collectionName), data);
//                 console.log(Data added to ${collectionName});
//             } catch (error) {
//                 console.error(Error adding data to ${collectionName}:, error);
//                 throw error;
//             }finally {
//                 setLoading(false);
//             }
//         };

//         const addImage = async (image) => {
//             if (image) {
//                 const storageRef = ref(storage, Product_images/${image.name});
//                 await uploadBytes(storageRef, image);
//                 const imageUrl = await getDownloadURL(storageRef);  // Ensure to get the URL correctly
//                 return imageUrl;
//             }
//             return null;  // Return null if no image is provided
//         };

//         const addProducts = async (data) => {
//             setLoading(true);
//             data.image = await addImage(data.image);  // Await the image upload
//             await addDataToCollection("products", data);
//             setLoading(false);
//         };

//         const removedDataFromCollection = async (collectionName, id) => {
//             try {
//                 setLoading(true);
//                 await deleteDoc(doc(db, collectionName, id));
//                 console.log(Data removed from ${collectionName});
//             } catch (error) {
//                 console.error(Error removing data from ${collectionName}:, error);
//                 throw error;
//             }finally {
//                 setLoading(false);
//             }
//         };

//         const deleteProduct = async (id) => {
//             setLoading(true);
//             await removedDataFromCollection("products", id);
//             setLoading(false);
//         };

//         const addUser  = (data) => addDataToCollection("users", data);
//         const addOrder = (data) => addDataToCollection("orders", data);
//         const addCart  = (data) => addDataToCollection("cart", data);

//         const getUsers    = () => getDataFromCollection("users");
//         const getProducts = () => getDataFromCollection("products");
//         const getOrders   = () => getDataFromCollection("orders");
//         const getCart     = () => getDataFromCollection("cart");

//         const fireContextValue = {
//             isLogin,
//             user,
//             loading,
//             SignUp,
//             SignIn,
//             SignOut,
//             deleteProduct,
//             getUsers,
//             getProducts,
//             getOrders,
//             getCart,
//             addProducts,
//             addUser,
//             addOrder,
//             addCart
//         };

//         return <FireContext.Provider value = {fireContextValue}>{children}</FireContext.Provider>;
//     };

//     export const useFireContext = () => useContext(FireContext);