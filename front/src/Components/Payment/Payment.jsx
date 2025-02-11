import _ from 'lodash';
import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { Field, Formik } from 'formik';
import React from 'react';
import { Form } from 'react-router-dom';
import * as Yup from 'yup';

export default function Payment() {
    let orderId = localStorage.getItem("orderId") != null ? localStorage.getItem("orderId") : ""        

    const paymentSchema = Yup.object().shape({
        amount: Yup.number().required('Amount is required'),
        note: Yup.string().required('Note is required'),
    });

    const paymentInitialValues = {
        amount: "",
        note: "",
    };


    const paymentHandleSubmit = async (values) => {
        const data = _.pick(values, ['amount', 'note']);
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}orders/payment/${orderId}`, data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Formik initialValues={paymentInitialValues} validationSchema={paymentSchema} onSubmit={paymentHandleSubmit}>
                {({ errors, touched }) => (
                    <Form className='w-full' onSubmit={paymentHandleSubmit}>
                        <div className="p-1">
                            <div className="p-1 flex">
                                <div className="w-full flex items-center mb-3 flex-wrap">
                                    <Label className="w-1/4 text-center font-bold text-lg" htmlFor="amount">Amount</Label>
                                    <Field name="amount" as={TextInput} type="number" id="amount" placeholder="Amount..." className="w-3/4" />
                                    {errors.amount && touched.amount ? (<div className="w-full text-red-600 text-center">{errors.amount}</div>) : null}
                                </div>
                            </div>

                            <div className="p-1 flex flex-wrap">
                                <div className="w-full flex items-center mb-3 flex-wrap">
                                    <Label className="w-1/4 text-center font-bold text-lg" htmlFor="note">Note</Label>
                                    <Field name="note" as={TextInput} id="note" placeholder="Note..." className="w-3/4" />
                                    {errors.note && touched.note ? (<div className="w-full text-red-600 text-center">{errors.note}</div>) : null}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center mb-3">
                            <Button type="submit" color className="bg-black w-full mx-3 text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl">
                                <span className="flex items-center">Submit</span>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

