// import { menu_list } from '../../assets/assets'
// import './ExploreMenu.css'
// import {useFireContext} from '../../context/FireContext'


// export default function ExploreMenu({ category, setCategory }) {

//     const { getCategories } = useFireContext();

//     return (
//         <div className = 'explore-menu' id = 'explore-menu'>
//             <h1>Explore our Menu</h1>
//             <p   className = 'explore-menu-text'>Choose from a diverse collection of delicious array of dishes and drinks with the finest ingredients and culinary expertise. Our mission is to satisfy our customers with quality food and make food accessible to all.</p>
//             <div className = 'explore-menu-list' >
//                 {menu_list.map((item, index) => {
//                     return (
//                         <div className = 'explore-menu-list-item' onClick                  = {() => setCategory(pre => (pre === item.menu_name ? 'All' : item.menu_name))} key = {index}>
//                         <img className = {category === item.menu_name ? 'active' : ''} src = {item.menu_image} alt                                                             = {item.menu_name} />
//                             <p>{item.menu_name}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//             <hr />
//         </div>
//     )
// }


import { useEffect, useState } from 'react';
import { menu_list } from '../../assets/assets';
import { useFireContext } from '../../context/FireContext';
import './ExploreMenu.css';

export default function ExploreMenu({ category, setCategory }) {
    const { getCategories } = useFireContext();
    const [categories, setCategories] = useState([]); // State for categories

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories(); // Fetch categories
                setCategories(data); // Set categories state
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories(); // Call the function on component mount
    }, [getCategories]); // Depend on getCategories

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className='explore-menu-text'>
                Choose from a diverse collection of delicious array of dishes and drinks...
            </p>
            <div className='explore-menu-list'>
                {menu_list.map((item, index) => (
                    <div className='explore-menu-list-item' onClick={() => setCategory(pre => (pre === item.menu_name ? 'All' : item.menu_name))} key={index}>
                        <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
                {/* Render categories from Firestore with images */}
                {categories.map((cat, index) => (
                    <div className='explore-menu-list-item' onClick={() => setCategory(pre => (pre === cat.name ? 'All' : cat.name))} key={index}>
                        <img src={cat.image || 'path/to/default/image.jpg'} alt={cat.name} /> {/* Fallback image */}
                        <p>{cat.name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
}
