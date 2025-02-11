import React, { useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card, Label, TextInput } from 'flowbite-react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Payment from '../Payment/Payment.jsx';

export default function Order() {
    const [orderDetails,setOrderDetails] = useState({})
    const [orderProducts,setOrderProducts] = useState([])
    const [ordersLength,setOrdersLength] = useState(0)
    const notify = (type, msg) => toast[type](msg);
    const navigate = useNavigate();
    let activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""

     // todo create order
      async function createOrder() {
        activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
          try {
          const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}orders/${activeClientId}`, {});
          localStorage.setItem("orderId", data.data._id);
          getOrderDetailsForClient()
        } catch (error) {
          console.log(error);
          notify("error", `an error occurred while creating order: ${error.response.data.error}`);
        }
    } 

    // todo get order details
    async function getOrderDetailsForClient() {
        activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
        try {
            let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/client/${activeClientId}`);            
            if (response.status === 200) {
                setOrderDetails(response.data.data[0]) 
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        createOrder()
    },[])
  return (
    <>
        <div className="grid grid-cols-12">
            <div className="w-full col-span-3 rounded-xl border-gray-100 border-2 shadow-xl m-3 py-3">
                <h2 className="mx-6 text-xl capitalize font-bold text-gray-800">Order Summary</h2>
                <div className='w-full flex sm:flex-col justify-between'>
                    <h3 className='mx-6 text-md capitalize font-light text-gray-800'>@ {orderDetails?.clientName}</h3>
                    <h3 className='mx-6 text-md capitalize font-bold text-green-600'>{orderDetails?.status ? `is ${orderDetails.status}`:""}</h3>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Amount paid</p>
                    <p className="font-bold">{orderDetails ? orderDetails.amountPaid : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Comission Amount</p>
                    <p className="font-bold">{orderDetails ? orderDetails.commissionAmount : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Comission rate</p>
                    <p className="font-bold">{orderDetails ? orderDetails.commissionRate : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Discount Amount</p>
                    <p className="font-bold">{orderDetails ? orderDetails.discountAmount : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Outstanding Amount</p>
                    <p className="font-bold">{orderDetails ? orderDetails.outstandingAmount : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">Discount rate</p>
                    <p className="font-bold">{orderDetails ? orderDetails.discountRate : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">tax rate</p>
                    <p className="font-bold">{orderDetails ? orderDetails.taxRate : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">tax amount</p>
                    <p className="font-bold">{orderDetails ? orderDetails.taxAmount : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">sub total</p>
                    <p className="font-bold">{orderDetails ? orderDetails.subtotal : "0"}</p>
                </div>
                <div className="w-full flex p-4 justify-between">
                    <p className="text-gray-600">total amount</p>
                    <p className="font-bold">{orderDetails ? orderDetails.totalAmount : "0"}</p>
                </div>
                <div className="w-full flex items-center justify-center mb-3">
                    <Link className='w-full py-4 flex items-center justify-center' to="/get-invoice">
                        <Button color className="bg-black w-full mx-3 text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl">
                            <span className="flex items-center">GENERATE INVOICE <FaArrowRight className="ml-2" /></span>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="w-full col-span-9 flex px-5 flex-wrap overflow-y-auto">
                    {orderDetails?.orderItems?.map((pro, index) => {
                                return (
                                <div key={index} className="lg:w-1/4 md:w-1/2 sm:w-full p-1">
                                    <Card imgAlt={pro.product.title} imgSrc={pro.product.imageCover} className="max-w-md p-2">
                                    <div className="w-full flex items-center justify-between flex-wrap">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{pro.product.title}</h5>
                                        <p className='bg-lime-700 text-white px-2 rounded-full'>{pro.quantity}</p>
                                        <div className="w-full mt-3 flex justify-between">
                                        <p className="text-gray-600">{pro.product.type == "OutSide" ? "@United States": "@Egypt"}</p>
                                        <p className="text-black-600 font-bold">{pro.newPrice * pro.quantity} EGP</p>
                                        </div>
                                    </div>
                                    </Card>
                                </div>
                                );
                    })}
            </div>
        </div>

    </>
  )
}

