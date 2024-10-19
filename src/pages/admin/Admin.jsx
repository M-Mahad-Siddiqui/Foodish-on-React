import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../../assets/back.png';
import AddProduct from '../../components/admin/AddProduct/AddProduct';
import ViewOrder from '../../components/admin/ViewOrder/ViewOrder';
import ViewProducts from '../../components/admin/ViewProducts/ViewProducts';
import ViewUsers from '../../components/admin/ViewUsers/ViewUsers';
import './Admin.css';

const VIEWS = {
  ADD_PRODUCT: 'AddProduct',
  VIEW_ORDER: 'ViewOrder',
  VIEW_USERS: 'ViewUsers',
  VIEW_PRODUCTS: 'ViewProducts',
};

function Admin() {
  const [select, setSelect] = useState('');
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectView = (view) => {
    setSelect(view);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false); // Auto-close sidebar after selecting an option on small screens
    }
  };

  return (
    <div className='adminBody'>
      <div className='header'>
        <div className='hamburger' onClick={toggleSidebar}>
          &#9776;
        </div>
        <img onClick={() => navigate('/')} className='back' src={back} alt="Back" />
        <h1>Welcome to Admin Panel</h1>
      </div>
      <div className='main'>
        <div className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
          <span onClick={() => handleSelectView(VIEWS.ADD_PRODUCT)}>Add Product</span>
          <span onClick={() => handleSelectView(VIEWS.VIEW_ORDER)}>View Orders</span>
          <span onClick={() => handleSelectView(VIEWS.VIEW_USERS)}>View Users</span>
          <span onClick={() => handleSelectView(VIEWS.VIEW_PRODUCTS)}>View Products</span>
        </div>
        <div className='body'>
          <div className='content'>
            {select === VIEWS.ADD_PRODUCT && <AddProduct />}
            {select === VIEWS.VIEW_ORDER && <ViewOrder />}
            {select === VIEWS.VIEW_PRODUCTS && <ViewProducts />}
            {select === VIEWS.VIEW_USERS && <ViewUsers />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
