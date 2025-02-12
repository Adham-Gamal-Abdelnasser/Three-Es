import axios from 'axios';
import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function OrderDetails() {
  const [order, setOrder] = useState({})
  let {selectedOrderId} = useParams()
  // todo get order details
  async function getOrderDetails() {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/${selectedOrderId}`);            
      if (response.status === 200) {
        setOrder(response.data.data) 
        console.log(order);
        
      }
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(()=>{
      getOrderDetails()
    },[selectedOrderId])
  return (
    <>
      <div className='w-full mb-4 px-5 py-3 rounded-lg  bg-zinc-50 shadow-lg'>
        <h2 className='font-bold text-3xl capitalize'>{order.clientName}</h2>
        <h3 className='text-md font-light text-gray-800'>{order?.client?.email}</h3>
        <p>{order?.client?.mobileNumber}</p>
      </div>
      <div className='w-full flex justify-between mb-4 px-5 py-3 rounded-lg  bg-zinc-50 shadow-lg'>
        <div className='w-full'>
            <div className="w-full flex p-4 justify-between">
                <p className="text-gray-600">Amount paid</p>
                <p className="font-bold">{order ? order.amountPaid : "0"}</p>
            </div>
            <div className="w-full flex p-4 justify-between">
                <p className="text-gray-600">Comission Amount</p>
                <p className="font-bold">{order ? order.commissionAmount : "0"}</p>
            </div>
            <div className="w-full flex p-4 justify-between">
                <p className="text-gray-600">Comission rate</p>
                <p className="font-bold">{order ? order.commissionRate : "0"}</p>
            </div>
            <div className="w-full flex p-4 justify-between">
                <p className="text-gray-600">Discount Amount</p>
                <p className="font-bold">{order ? order.discountAmount : "0"}</p>
            </div>
            <div className="w-full flex p-4 justify-between">
                <p className="text-gray-600">Outstanding Amount</p>
                <p className="font-bold">{order ? order.outstandingAmount : "0"}</p>
            </div>
        </div>
        <div className='w-full'>
          <div className="w-full flex p-4 justify-between">
              <p className="text-gray-600">Discount rate</p>
              <p className="font-bold">{order ? order.discountRate : "0"}</p>
          </div>
          <div className="w-full flex p-4 justify-between">
              <p className="text-gray-600">tax rate</p>
              <p className="font-bold">{order ? order.taxRate : "0"}</p>
          </div>
          <div className="w-full flex p-4 justify-between">
              <p className="text-gray-600">tax amount</p>
              <p className="font-bold">{order ? order.taxAmount : "0"}</p>
          </div>
          <div className="w-full flex p-4 justify-between">
              <p className="text-gray-600">sub total</p>
              <p className="font-bold">{order ? order.subtotal : "0"}</p>
          </div>
          <div className="w-full flex p-4 justify-between">
              <p className="text-gray-600">total amount</p>
              <p className="font-bold">{order ? order.totalAmount : "0"}</p>
          </div>
        </div>
      </div>
      {order?.orderItems?.map((pro, index) => {
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
    </>
  )
}
