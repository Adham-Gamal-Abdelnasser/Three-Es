import React, { useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card, Label, TextInput } from 'flowbite-react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Field, Formik, useFormik } from 'formik';
import Styles from './OrderHistory.module.css'
import * as Yup from 'yup';
export default function OrderHistory() {
  const [orders,setOrders] = useState([])
  const [orderProducts,setOrderProducts] = useState([])
  const notify = (type, msg) => toast[type](msg);
  const navigate = useNavigate();
  let activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""

   
  // todo get order details
  async function getOrderDetailsForClient() {
      activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
      try {
        let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/client/${activeClientId}`);
        if (response.status === 200) {
          setOrders(response.data.data);
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
        <div className="w-full col-span-4">
          <div className=''></div>
          { orders.map((order,index)=>{
            return(
              <Link key={order._id} to={`${order._id}`} className={`${Styles.order}`}>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Order {index + 1}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
