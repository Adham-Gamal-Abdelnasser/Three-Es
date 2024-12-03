import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Checkout() {
  const [isPaid, setIsPaid] = useState(false)
  async function getAllOrders() {
    axios.get(`${process.env.REACT_APP_BASE_URL}orders`).then(response=>{
      console.log("ana el response",response.data.data.orders)
    }).catch(error=>{
      console.log("ana el error",error)
    })
  }
  useEffect(()=>{
    getAllOrders()
  },[])
  return (
    <>

    </>
  )
}
