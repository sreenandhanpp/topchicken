import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AppInput from '../../components/Input/AppInput';
import AppButton from '../../components/appButton/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import styles from './updateOrder.module.css';

const UpdateOrder = () => {
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const enumData = {
        branch: ['Main Branch', 'Branch A', 'Branch B', 'Branch C'],
        product: ['Chicken', 'Beef', 'Pork', 'Fish'],
        flavour: ['Plain', 'Spicy', 'Sweet', 'Salty'],
        size: ['Small', 'Medium', 'Large'],
        quantity: ['1kg', '2kg', '3', '4', '5']
    };

    useEffect(() => {
        dispatch({ type: USER.FETCH_ORDER_REQUEST });

        axios.get(import.meta.env.VITE_ROOT_URL + 'user/api/get-order/' + id,)
            .then(res => {
                console.log(res);
                setFormValues({
                    ...formValues,
                    branch: res.data.order.branch,
                    product: res.data.order.product,
                    flavour: res.data.order.flavour,
                    size: res.data.order.size,
                    qty: res.data.order.qty,
                    expectedDate: res.data.order.expectedDate,
                    orderedBy: res.data.order.orderedBy
                });

                dispatch({ type: USER.FETCH_ORDER_SUCCESS, payload: res.data.order });
            })
            .catch(err => {
                dispatch({ type: USER.FETCH_ORDER_FAILED, payload: err.response.data.message });
            });
    }, []);

    const newErrors = [];

    const validateForm = () => {
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = await validateForm();

        if (newErrors.length === 0) {
            try {
                dispatch({ type: USER.UPDATE_ORDER_REQUEST });

                axios.put(import.meta.env.VITE_ROOT_URL + 'user/api/update-order/' + id, formValues)
                    .then(res => {
                        if (res.status === 200) {
                            dispatch({ type: USER.UPDATE_ORDER_SUCCESS });
                            navigate('/', { replace: true });
                            toast.success(res.data.message, { position: toast.POSITION.BOTTOM_CENTER });
                        }
                    })
                    .catch(err => {
                        toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER });
                        dispatch({ type: USER.UPDATE_ORDER_FAILED, payload: err });
                    });
            } catch (err) {
                toast.error("Something went wrong while updating the order", {
                    position: toast.POSITION.BOTTOM_CENTER
                });

                dispatch({ type: USER.UPDATE_ORDER_FAILED, payload: err });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleChange = (e, fieldName) => {
        setFormValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        const updatedErrors = errors.filter(error => error.field !== fieldName);
        setErrors(updatedErrors);
    };


    return (
        <div className={styles.update_order}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-12">
                        <div className="">
                            <h1 className='p-3'>Update Order</h1>
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
                                            value={formValues.branch}
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
                                            value={formValues.product}
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
                                            value={formValues.flavour}
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
                                            value={formValues.size}
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
                                            value={formValues.qty}
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
                                            value={formValues.expectedDate}
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
                                            value={formValues.orderedBy}
                                        />
                                    </div>
                                    <div className={`col-md-6 d-flex justify-content-end align-items-center ${styles.resp_margin}`}>
                                        <AppButton onclick={handleSubmit} text="Update Order" />
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

export default UpdateOrder;
