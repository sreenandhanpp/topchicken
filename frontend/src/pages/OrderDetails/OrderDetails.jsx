import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { USER } from '../../redux/constants/user';
import { useDispatch, useSelector } from 'react-redux';

function OrderDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { order } = useSelector(state => state.fetchOrder)


    useEffect(() => {
        dispatch({ type: USER.FETCH_ORDER_REQUEST });
        axios.get(import.meta.env.VITE_ROOT_URL + 'user/api/get-order/' + id,)
            .then(res => {
                dispatch({ type: USER.FETCH_ORDER_SUCCESS, payload: res.data.order });
            })
            .catch(err => {
                dispatch({ type: USER.FETCH_ORDER_FAILED, payload: err.response.data.message });
            });
    }, []);

    return (
        <div className="container">
            <h1 className="mt-5 mb-4">Order Details</h1>
            {order ? (
                <div className="row">
                    <div className="col-md-6">
                        <dl className="row">
                            <dt className="col-sm-4">Order ID:</dt>
                            <dd className="col-sm-8">{order.orderId}</dd>

                            <dt className="col-sm-4">Product Name:</dt>
                            <dd className="col-sm-8">{order.product}</dd>

                            <dt className="col-sm-4">Expected Date:</dt>
                            <dd className="col-sm-8">{order.expectedDate}</dd>

                            <dt className="col-sm-4">Date:</dt>
                            <dd className="col-sm-8">{order.orderCreationDate}</dd>

                            <dt className="col-sm-4">Ordered By:</dt>
                            <dd className="col-sm-8">{order.orderedBy}</dd>

                            <dt className="col-sm-4">Branch Name:</dt>
                            <dd className="col-sm-8">{order.branch}</dd>

                            <dt className="col-sm-4">Size:</dt>
                            <dd className="col-sm-8">{order.size}</dd>

                            <dt className="col-sm-4">Quantity:</dt>
                            <dd className="col-sm-8">{order.qty}</dd>
                        </dl>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default OrderDetails;
