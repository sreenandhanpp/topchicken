import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppInput from '../../components/Input/AppInput';
import AppButton from '../../components/appButton/AppButton';
import styles from './createOrder.module.css';
import { useDispatch } from 'react-redux';
import { USER } from '../../redux/constants/user';



const CreateOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formValues, setFormValues] = useState({
        branch: '',
        product: '',
        flavour: '',
        size: '',
        qty: '',
        expectedDate: '',
        orderedBy: ''
    });

    const newErrors = [];

    const enumData = {
        branch: ['Main Branch', 'Branch A', 'Branch B', 'Branch C'],
        product: ['Chicken', 'Beef', 'Pork', 'Fish'],
        flavour: ['Plain', 'Spicy', 'Sweet', 'Salty'],
        size: ['Small', 'Medium', 'Large'],
        quantity: ['1kg', '2kg', '3', '4', '5']
    };


    const validateForm = () => {
        const newErrors = [];

        // Check if the branch is empty or set to the default value
        if (!formValues.branch) {
            newErrors.push({ field: 'branch', message: 'Please select a branch' });
        }

        // Check if the product is empty or set to the default value
        if (!formValues.product) {
            newErrors.push({ field: 'product', message: 'Please select a product' });
        }

        // Check if the flavour is empty or set to the default value
        if (!formValues.flavour) {
            newErrors.push({ field: 'flavour', message: 'Please select a flavour' });
        }

        // Check if the size is empty or set to the default value
        if (!formValues.size) {
            newErrors.push({ field: 'size', message: 'Please select a size' });
        }

        // Check if the quantity is empty or set to the default value
        if (!formValues.qty) {
            newErrors.push({ field: 'qty', message: 'Please select a quantity' });
        }

        // Check if the expectedDate is empty
        if (!formValues.expectedDate || formValues.expectedDate.trim() === '') {
            newErrors.push({ field: 'expectedDate', message: 'Expected Date is required' });
        }

        // Check if the orderedBy field is empty
        if (!formValues.orderedBy || formValues.orderedBy.trim() === '') {
            newErrors.push({ field: 'orderedBy', message: 'Ordered by is required' });
        }

        setErrors(newErrors);
        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentErr = await validateForm();
        console.log(currentErr)
        if (currentErr.length === 0) {
            try {
                // Dispatch an action to indicate the start of the campaign creation process
                dispatch({ type: USER.CREATE_ORDER_FAILED });

                // Make an HTTP POST request to create a new campaign
                axios.post(import.meta.env.VITE_ROOT_URL + 'user/api/create-order', formValues)
                    .then(res => {
                        if (res.status === 201) {
                            console.log(res);
                            // If the creation is successful, dispatch a success action
                            dispatch({ type: USER.CREATE_ORDER_SUCCESS });

                            // Redirect to '/' route
                            navigate('/', { replace: true });

                            // Display a success message using a toast notification
                            toast.success(res.data.message, {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    })
                    .catch(err => {

                        // Display an error message using a toast notification
                        toast.error(err.response.data.message, {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        // Dispatch a failure action with the error payload
                        dispatch({ type: USER.CREATE_ORDER_FAILED, payload: err });
                    });
            } catch (err) {
                // Display a generic error message
                toast.error("Something went wrong while creating the campaign", {
                    position: toast.POSITION.BOTTOM_CENTER
                });

                // Dispatch a failure action if an error occurs during the creation process
                dispatch({ type: USER.CREATE_ORDER_FAILED, payload: err });
            }
        } else {
            console.log(formValues)
            setErrors(currentErr)
        }
    };

    const handleChange = (e, fieldName) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        const updatedErrors = errors.filter((error) => error.field !== fieldName);
        setErrors(updatedErrors);
    };

    return (
        <div className={styles.create_order}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="">
                            <h1 className='p-3'>Create Order</h1>
                            <form>
                                <div className={`row m-2 ${styles.input_group}`}>
                                    <div className="col-md-6">
                                        <AppInput
                                            type="select"
                                            id="branch"
                                            placeholder="Branch"
                                            name="branch"
                                            options={enumData.branch}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className={`col-md-6 ${styles.resp_margin}`}>
                                        <AppInput
                                            type="select"
                                            id="product"
                                            placeholder="Product"
                                            name="product"
                                            options={enumData.product}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <div className={`row m-2 ${styles.input_group}`}>
                                    <div className="col-md-6">
                                        <AppInput
                                            type="select"
                                            id="flavour"
                                            placeholder="Flavour"
                                            name="flavour"
                                            options={enumData.flavour}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className={`col-md-6 ${styles.resp_margin}`}>
                                        <AppInput
                                            type="select"
                                            id="size"
                                            placeholder="Size"
                                            name="size"
                                            options={enumData.size}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <div className={`row m-2 ${styles.input_group}`}>
                                    <div className="col-md-6">
                                        <AppInput
                                            type="select"
                                            id="qty"
                                            placeholder="Quantity"
                                            name="qty"
                                            options={enumData.quantity}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className={`col-md-6 ${styles.resp_margin}`}>
                                        <AppInput
                                            type="date"
                                            id="expectedDate"
                                            placeholder="Expected Date"
                                            name="expectedDate"
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                </div>
                                <div className={`row m-2 ${styles.input_group}`}>
                                    <div className="col-md-6">
                                        <AppInput
                                            type="text"
                                            id="orderedBy"
                                            placeholder="Ordered By"
                                            name="orderedBy"
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </div>
                                    <div className={`col-md-6 d-flex justify-content-end align-items-center ${styles.resp_margin}`}>
                                        <AppButton onclick={handleSubmit} text="Create Order" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateOrder;
