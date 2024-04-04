import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server when the component mounts
    axios.get(import.meta.env.VITE_ROOT_URL + 'user/api/get-all-orders')
      .then(response => {
        console.log(response)
        setOrders(response.data.orders);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col border">
          <h1 className="border-bottom p-2">All Orders</h1>
          <ul className="list-unstyled">
            {orders.map(order => (
              <Link to={`/update-order/${order.orderId}`} >
                <li key={order._id} className="py-2 border-bottom">
                  {/* Display order details */}
                  <div>Branch: {order.branch}</div>
                  <div>Product: {order.product}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="col border">
          <h1 className="border-bottom p-2">Pending Orders</h1>
          <ul className="list-unstyled">

          </ul>
        </div>
        <div className="col border">
          <h1 className="border-bottom p-2">Finished Orders</h1>
          <ul className="list-unstyled">

          </ul>
        </div>
      </div>
    </div>

  );
}

export default Home;
