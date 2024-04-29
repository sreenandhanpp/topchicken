// OrderListing.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import './orderListing.css';
import AppButton from '../../components/appButton/AppButton';
import Filter from '../../components/Filter/Filter';

function OrderListing() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.fetchAllOrders);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filters, setFilters] = useState({
        branch: [],
        product: [],
        status: [],
        expectedDate: '',
        createdDate: ''
    });
    
    console.log(filters)

    useEffect(() => {
        // Fetch orders from the server when the component mounts
        dispatch({ type: USER.FETCH_ALL_ORDERS_REQUEST });
        axios.get(import.meta.env.VITE_ROOT_URL + 'user/api/get-all-orders')
            .then(res => {
                dispatch({ type: USER.FETCH_ALL_ORDERS_SUCCESS, payload: res.data.orders });
                setFilteredOrders(res.data.orders);
            })
            .catch(error => {
                dispatch({ type: USER.FETCH_ALL_ORDERS_FAILED, payload: error.response.data.message });
            });
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleFilterClick = () => {
        // Apply filtering logic here
        const filteredOrders = orders.filter(order => {
            // Check if each order matches the filter criteria
            const branchMatch = !filters.branch.length || filters.branch.includes(order.branch);
            const productMatch = !filters.product.length || filters.product.includes(order.product);
            const statusMatch = !filters.status.length || filters.status.includes(order.status);
            const expectedDateMatch = !filters.expectedDate || order.expectedDate >= filters.expectedDate;
            const createdDateMatch = !filters.createdDate || order.createdDate >= filters.createdDate;
            return branchMatch && productMatch && statusMatch && expectedDateMatch && createdDateMatch;
        });
        // Update the state with the filtered orders
        setFilteredOrders(filteredOrders);
    };
    

    const handleClearFilters = () => {
        setFilters({
            branch: '',
            product: '',
            status: '',
            expectedDate: '',
            createdDate: ''
        });
        setFilteredOrders(orders);
    };

    const enumData = {
        branch: ['Main Branch', 'Branch A', 'Branch B', 'Branch C'],
        product: ['Chicken', 'Beef', 'Pork', 'Fish'],
        status: ['Pending', 'Processing', 'Completed']
    };


    return (
        <div>
            <div className="row m-4">
                <Filter
                    options={[
                        { name: 'branch', label: 'Branch', values: enumData.branch },
                        { name: 'product', label: 'Product', values: enumData.product },
                        { name: 'status', label: 'Status', values: enumData.status },
                        { name: 'expectedDate', label: 'Expected Date', values: [] },
                        { name: 'createdDate', label: 'Created Date', values: [] },
                    ]}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    onFilterClick={handleFilterClick}
                    onClearFilters={handleClearFilters}
                />
            </div>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Branch</th>
                        <th>Expected Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={index}>
                            <td>
                                <Link to={`/order-details/${order.orderId}`}>
                                    {order.orderId}
                                </Link>
                            </td>
                            <td>{order.branch}</td>
                            <td>{order.expectedDate}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderListing;
