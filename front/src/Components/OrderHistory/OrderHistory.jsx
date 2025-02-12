import React, { useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card, Label, TextInput } from 'flowbite-react'
import { Form, Link, Outlet, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Field, Formik, useFormik } from 'formik';
import Styles from './OrderHistory.module.css'
import * as Yup from 'yup';

// todo get history 
export function getHistory(date) {
  return new Date(date).toLocaleDateString();
}
export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  let activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""

  // todo get order details
  async function getOrderDetailsForClient() {
      activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/client/${activeClientId}`);            
        if (response.status === 200) {
          setOrders(response.data.data) 
          console.log(orders);
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    getOrderDetailsForClient()
  },[])

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="w-full col-span-3 rounded-xl border-gray-100 border-2 shadow-xl m-3 p-3 overflow-auto h-screen">

          {orders.map((order , index) => (
            <Link key={index} to={`${order._id}`}>
              <div  className='shadow-md my-3 bg-gray-100 p-3 border-gray-100 border-2'>
                <p className='font-bold capitalize bg-lime-700 px-2 rounded-full text-white h-8 w-8 flex justify-center items-center'>{orders.length-(index+1)}</p>
                <p className='font-bold capitalize'>{getHistory(order.createdAt)}</p>
                <p className='font-bold capitalize text-lime-700'>{order.status}</p> 
              </div>
            </Link>
          ))}
          
        </div>
        <div className="w-full col-span-9 p-5 overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  )
}
