import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
export default function Cart() {
    const [cartProducts,setCartProducts] = useState([])
    const [cartDetails,setCartDetails] = useState(null)
    const [cartId,setCartId] = useState("")
    const notify = (type, msg) => toast[type](msg);
    const navigate = useNavigate();
    let activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
    let unitId = localStorage.getItem("unitId") != null ? localStorage.getItem("unitId") : ""

    let {getLoggedUserCart,removeItem,updateCart,clearCart} = useContext(cartContext)

    // todo display cart products
    async function getCart() {
      activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""
      let response = await getLoggedUserCart()
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems)  
      setCartId(response?.data.cart._id)      
    }

    //todo do delete item 
    async function deleteItem(id) {
      let response = await removeItem(id)
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems) 
      getCart()      
    }
    
    //todo update quantity 
    async function updateQuantity(id,quantity) {
      if (quantity<1) {
        return null
      }
      else {
        let response = await updateCart(id,quantity)
        console.log(response);
        if (response.data.cart) {
          setCartDetails(response?.data?.cart);
          setCartProducts(response?.data?.cart.cartItems) 
          getCart()
          
        }
      }
    }

    //todo reset cart
    async function resetCart() {
      let response = await clearCart()
      setCartDetails(response?.data.cart);
      setCartProducts(response?.data.cart.cartItems) 
      getCart()
    }

    // todo checkout 
    async function checkout() {
      axios.post(`${process.env.REACT_APP_BASE_URL}orders/clients/${activeClientId}/units/${unitId}/carts/${cartId}`).then(response => {
        console.log(response)
        notify("success",response.data.message)
        navigate('/checkout')
      }).catch(error=>{
        notify("error",`an error occurred while checkout ${error.message}`)
      })
    }

    useEffect(()=>{
      getCart()
    },[activeClientId])

  return (
    <>
      <h3 className='mx-6 text-xl capitalize'>total cart purchase : <span className='text-green-500'>{cartDetails?.totalPrice} EGP</span></h3>
      <div className="flex mx-6 mt-3">
        <Button onClick={()=>resetCart()}>clear all</Button>
        {cartProducts? <Button onClick={()=> checkout()} className="font-bold text-white border-2 mx-2 text-2xl px-1 py-0 ">check out</Button>:""}
      </div>
      <div className="flex p-5 flex-wrap overflow-y-auto">
      {
        cartProducts?.map((pro,index)=>{ 
          console.log(pro);
          
          return <div key={index} className="lg:w-1/5 md:w-1/2 sm:w-full p-1">
                    <Card imgAlt={pro.product.name} imgSrc={pro.product.image} className="max-w-md p-2">
                        <div className="w-full flex items-center justify-between flex-wrap">
                            <div className="w-full flex justify-between">
                              <h5 className="text-lg font-semibold tracking-tight text-gray-900 ">{pro.product.name}</h5>
                              <p className='text-green-500'>{pro.product.price * pro.quantity}</p>
                            </div>
                            <div className='w-full flex justify-between items-center'>
                              <FaTrash onClick={()=>deleteItem(pro._id)} className='text-red-700 cursor-pointer text-xl'/>
                              <div className='flex mt-3 items-center'>
                                  <button onClick={()=>updateQuantity(pro._id,pro.quantity+1)} className="font-bold text-gray-900 dark:text-white text-2xl p-0 rounded-2xl">+</button>
                                  <span className="text-2xl mx-3">{pro.quantity}</span>
                                  <button onClick={()=>updateQuantity(pro._id,pro.quantity-1)} className="font-bold text-gray-900 dark:text-white text-2xl p-0 rounded-2xl">-</button>
                              </div>
                            </div>

                        </div>
                    </Card>
                  </div>
        })
      }
      
      </div>
    </>
  )
}
