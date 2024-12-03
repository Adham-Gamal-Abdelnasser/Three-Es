import axios from "axios";
import { Button, Card } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { cartContext } from '../../Context/CartContext.js';
import { RoomContext } from '../../Context/RoomContext.js';
import { toast } from "react-toastify";


export default function ProductByCategory() {
  let { id } = useParams();
  let [products, setProducts] = useState([]);
  const notify = (type, msg) => toast[type](msg);
  let activeRoomId = localStorage.getItem("activeRoomId") != null ? localStorage.getItem("activeRoomId") : "";

  // todo : recieve ading product to cart from context and applying it here
  let {addToCart} = useContext(cartContext)
  async function addProductToCart(id) {
    let response = await addToCart(id)
    notify('success', response.data.message)
  }
  // todo delete product
  async function deleteProduct(id) {
    axios.delete(`${process.env.REACT_APP_BASE_URL}product/${id}`).then(response=>{
      notify("success","deleted successfully")
      getCategorizedProducts()
    }).catch(error=>{
      notify("error",`an error occured ${error.message}`)
    })
  }
  // todo get products counting on their category
  async function getCategorizedProducts() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}category/${id}/product`
      );
      setProducts(response?.data.allProducts);
    } catch (error) {
      notify("error",`an error occured ${error.message}`)
    }
  }
  // todo : add product to activated room
  let {addProductToRoom} = useContext(RoomContext)
  async function addProductToActivatedRoom(roomId,productId){
      let response = await addProductToRoom(roomId,productId)
      console.log(response);
  }
  // todo : merge two functions (adding product to cart and adding product to room)
  function addProductToCartAndRoom(roomId,productId){
    addProductToCart(productId)
    addProductToActivatedRoom(roomId,productId)
    getCategorizedProducts()
}
  useEffect(() => {
    getCategorizedProducts();
  }, [id]);
  
  return (
    <>
      <div className="grid px-2">
        <div className="w-full col-span-12">
          <div className="flex flex-wrap -mx-1 overflow-y-auto">
            {products.map((pro, index) => {
              return (
                <div key={index} className="w-3/12 p-1">
                  <Card className="max-w-md p-2" imgAlt={pro.name} imgSrc={pro.imageCover}>
                    <Link to={`/product/${pro._id}`}>
                      <div className="w-full flex items-center justify-between flex-wrap">
                        <h5 className="mb-3 w-full text-lg font-semibold tracking-tight text-gray-900 ">{pro.title}</h5>
                        <div className="w-full flex items-center justify-between">
                          <span className=" font-bold text-gray-900 dark:text-white border-2 border-black p-2 rounded-2xl">${pro.price}</span>
                        </div>
                      </div>
                    </Link>
                    <Button  onClick={()=>addProductToCartAndRoom(activeRoomId,pro._id)} className="text-sm font-normal bg-black flex items-center">Add to cart <FaShoppingCart/></Button>
                    <FaTrash onClick={()=>{deleteProduct(pro._id)}} className='text-red-700 cursor-pointer text-2xl'/>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
