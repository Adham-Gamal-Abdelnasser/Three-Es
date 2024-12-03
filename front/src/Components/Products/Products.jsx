import React, { useState, useEffect, useContext } from 'react';
import { Avatar, Button, Card, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Customers from '../Customers/Customers.jsx';
import glitch from '../../assets/error-404jpg.jpg'
import { categoryContext } from '../../Context/CategoryContext.js';
import { cartContext } from '../../Context/CartContext.js';
import { RoomContext } from '../../Context/RoomContext.js';
// ! icons
import { FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { RiSearch2Fill } from 'react-icons/ri';
import NavCategories from '../NavCategories/NavCategories.jsx';
import { toast } from 'react-toastify';


export default function Products() {
    const [products, setProducts] = useState([]);
    const notify = (type, msg) => toast[type](msg);
    const navigate = useNavigate();
    let activeRoomId = localStorage.getItem("activeRoomId") != null ? localStorage.getItem("activeRoomId") : "";

    // todo delete product
    async function deleteProduct(id) {
        axios.delete(`${process.env.REACT_APP_BASE_URL}product/${id}`).then(response=>{
          console.log(response);
          notify("success","deleted successfully")
          GetAllProducts()
        }).catch(error=>{
          console.log(error);
          notify("error",error.data.message)
        })
      }
    // todo add product to cart
    let {addToCart} = useContext(cartContext)
    async function addProductToCart(id) {
        let response = await addToCart(id)
        notify('success', response.data.message)
    }

    // todo : add product to activated room
    let {addProductToRoom} = useContext(RoomContext)
    async function addProductToActivatedRoom(roomId,productId){
        let response = await addProductToRoom(roomId,productId)
        console.log(response);
    }

    // todo Fetch all products from API
    async function GetAllProducts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}product`);
            setProducts(response.data.allProducts)
            console.log(response.data.allProducts);
        } catch (error) {
            notify("error",`an error occurred : ${error.message}`)
        }
    }
    // todo : merge two functions (adding product to cart and adding product to room)
    function addProductToCartAndRoom(roomId,productId){
        addProductToCart(productId)
        addProductToActivatedRoom(roomId,productId)
        GetAllProducts()
    }
    // todo Call GetAllProducts when the component mounts
    useEffect(() => {
        GetAllProducts();
    },[]);

    return (
        <div className="min-h-screen flex flex-col rounded-2xl">
            <div className="flex-grow p-6 flex justify-center">
                <div className="w-full">
                    <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-12 md:grid md:grid-cols-12">
                        <div className="w-full col-span-3">
                            <Customers></Customers>
                        </div>
                        <div className="w-full col-span-9">
                            <div className="flex flex-wrap">
                                {products.map((product, index) =>  (
                                    
                                     <div key={index} className="lg:w-1/4 md:w-1/2 sm:w-full p-1">
                                        <Card className="w-full" imgAlt={product.name} imgSrc={product.imageCover}>
                                            <div className="w-full flex items-center justify-between flex-wrap">
                                                <Link className='w-full' to={`/product/${product._id}`}>
                                                    <div className="w-full flex justify-between">
                                                        <h5 className="text-lg font-semibold tracking-tight text-gray-900 ">{product.title}</h5>
                                                        <p className="mt-2 text-sm text-green-500">{product.priceAfterDiscount<product.price ? <span><del className='mx-2 text-red-600'>{product.price}</del>{product.priceAfterDiscount}</span>:<span>{product.price}</span>}</p>
                                                    </div>
                                                    <p className='my-2 break-words'>{product.description}</p>
                                                </Link>
                                                <div>
                                                    <Button onClick={()=>{addProductToCartAndRoom(activeRoomId,product._id)}} className="text-sm font-normal my-3 bg-black flex items-center">Add to cart <FaShoppingCart className='mx-2'/></Button>
                                                    <FaTrash onClick={()=>{deleteProduct(product._id)}} className='text-red-700 cursor-pointer text-xl'/>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        </div>
    );
}
