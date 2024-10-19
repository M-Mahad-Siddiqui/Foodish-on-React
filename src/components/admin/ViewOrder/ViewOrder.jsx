// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../../context/FireContext';
// import './ViewOrder.css';

// export default function ViewOrder() {
//   const { getOrders }         = useFireContext();  // Fetch orders from Firestore
//   const [orders, setOrders]   = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const     data = await getOrders();  // Fetch all customer orders
//         setOrders(data);                     // Set orders data
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [getOrders]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className = "orders-grid">
//     <div className = "orders-title-bar">
//         <p>ID</p>
//         <p>Product</p>
//         <p>Customer Name</p>
//         <p>Quantity</p>
//         <p>Total Price</p>
//         <p>User Info</p>
//         <p>Status</p>
//       </div>

//       {orders.map((order, index) => (
//         <div className = "order-row" key = {index}>
//           <p>{order.id}</p>
//           <p>{order.name}</p>
//           <p>{`${order.firstName} ${order.lastName}`}</p>
//           <p>{order.quantity}</p>
//           <p>${order.totalPrice}</p>

//           {/* Chip for user info */}
//           <p>
//             <span className = "chip" onClick = {() => alert(`User Info:\n${order.firstName} ${order.lastName}\n${order.email}\n${order.phone}`)}>
//               Info
//             </span>
//           </p>

//           {/* Dropdown for order status */}
//           <p>
//             <select value = {order.status} onChange = {(e) => console.log(`Status changed to ${e.target.value}`)}>
//             <option value = "Received">Received</option>
//             <option value = "On the way">On the way</option>
//             <option value = "Placed">Placed</option>
//             <option value = "Delivered">Delivered</option>
//             </select>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useFireContext } from '../../../context/FireContext';
// import './ViewOrder.css';

// export default function ViewOrder() {
//   const { getOrders, getCurrentStatus }                     = useFireContext();
//   const [orders, setOrders]               = useState([]);
//   const [loading, setLoading]             = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null);    // For modal data
//   const [modalOpen, setModalOpen]         = useState(false);   // Control modal visibility

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await getOrders();
//         setOrders(data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [getOrders]);

//   const openModal = (order) => {
//     setSelectedOrder(order);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className = "orders-grid">
//     <div className = "orders-title-bar">
//         <p>ID</p>
//         <p>Product</p>
//         <p>Customer Name</p>
//         <p>Quantity</p>
//         <p>Total Price</p>
//         <p>User Info</p>
//         <p>Status</p>
//       </div>

//       {orders.map((order, index) => (
//         <div className = "order-row" key = {index}>
//           <p>{order.id}</p>
//           <p id = 'order-name'>
//             {order.selectedItems.map(item => item.name).join(', ')}
//           </p>
//           <p>{`${order.firstName} ${order.lastName}`}</p>
//           <p>
//             {order.selectedItems.map(item => item.quantity).join(', ')}
//           </p>
//           <p>
//             ${order.selectedItems.reduce((acc, item) => acc + item.total, 0)}
//           </p>
//           <p>
//             <span className = "chip" onClick = {() => openModal(order)}>
//               Information
//             </span>
//           </p>
//           <p>
//             <select
//               value     = {order.status}
//               onChange  = {(e) => console.log(`Status changed to ${e.target.value}`)}
//               className = "status-dropdown"
//             >
//               <option>{getCurrentStatus(order.id) }</option>
//               <option value = "Received">Received</option>
//               <option value = "On the way">On the way</option>
//               <option value = "Placed">Placed</option>
//               <option value = "Delivered">Delivered</option>
//             </select>
//           </p>
//         </div>
//       ))}


//       {modalOpen && selectedOrder && (
//         <div className = "modal-overlay" onClick = {closeModal}>
//         <div className = "modal-content" onClick = {(e) => e.stopPropagation()}>
//             <h2>Customer Information</h2>
//             <p><strong>First Name              : </strong> {selectedOrder.firstName}</p>
//             <p><strong>Last  Name              : </strong> {selectedOrder.lastName}</p>
//                              <p><strong>Email  : </strong> {selectedOrder.email}</p>
//                              <p><strong>Street : </strong> {selectedOrder.street}</p>
//                              <p><strong>City   : </strong> {selectedOrder.city}</p>
//                              <p><strong>State  : </strong> {selectedOrder.state}</p>
//             <p><strong>Zip   Code              : </strong> {selectedOrder.zipCode}</p>
//                              <p><strong>Country: </strong> {selectedOrder.country}</p>
//                              <p><strong>Phone  : </strong> {selectedOrder.phone}</p>
//             <button className = "close-btn" onClick = {closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useFireContext } from '../../../context/FireContext';
import './ViewOrder.css';

export default function ViewOrder() {
  const { getOrders, getCurrentStatus, updateOrderStatus } = useFireContext(); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        console.log('Fetched orders:', data); // Log fetched orders

        // Fetch the current status for each order
        const ordersWithStatus = await Promise.all(data.map(async (order) => {
          const status = await getCurrentStatus(order.id);
          console.log(`Fetched status for Order ID: ${order.id} - Status: ${status}`); // Log fetched status
          return { ...order, status }; // Include the status in the order object
        }));

        setOrders(ordersWithStatus);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [getOrders, getCurrentStatus]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus); // Update status in Firestore
      // Fetch updated orders after status change
      const updatedOrders = await Promise.all(orders.map(async (order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus }; // Update the order with new status
        }
        const status = await getCurrentStatus(order.id); // Fetch the latest status
        console.log(`Updated status for Order ID: ${order.id} - Status: ${status}`); // Log updated status
        return { ...order, status }; // Return updated order
      }));
      setOrders(updatedOrders);
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="orders-grid">
      <div className="orders-title-bar">
        <p>ID</p>
        <p>Product</p>
        <p>Customer Name</p>
        <p>Quantity</p>
        <p>Total Price</p>
        <p>User Info</p>
        <p>Status</p>
      </div>

      {orders.map((order, index) => (
        <div className="order-row" key={index}>
          <p>{order.id}</p>
          <p id='order-name'>
            {order.selectedItems.map(item => item.name).join(', ')}
          </p>
          <p>{`${order.firstName} ${order.lastName}`}</p>
          <p>
            {order.selectedItems.map(item => item.quantity).join(', ')}
          </p>
          <p>
            ${order.selectedItems.reduce((acc, item) => acc + item.total, 0)}
          </p>
          <p>
            <span className="chip" onClick={() => openModal(order)}>
              Information
            </span>
          </p>
          <p>
            <select
              value={order.status || ''} // Display current status
              onChange={(e) => handleStatusChange(order.id, e.target.value)} // Update status on change
              className="status-dropdown"
            >
              <option value="Received">Received</option>
              <option value="On the way">On the way</option>
              <option value="Placed">Placed</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
        </div>
      ))}

      {modalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Customer Information</h2>
            <p><strong>First Name:</strong> {selectedOrder.firstName}</p>
            <p><strong>Last Name:</strong> {selectedOrder.lastName}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Street:</strong> {selectedOrder.street}</p>
            <p><strong>City:</strong> {selectedOrder.city}</p>
            <p><strong>State:</strong> {selectedOrder.state}</p>
            <p><strong>Zip Code:</strong> {selectedOrder.zipCode}</p>
            <p><strong>Country:</strong> {selectedOrder.country}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <button className = "close-btn" onClick = {closeModal}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}
