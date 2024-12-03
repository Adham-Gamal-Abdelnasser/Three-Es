import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function RoomByUnit() {
    const [rooms,setRooms] = useState([])
    const notify = (type, msg) => toast[type](msg);
    let {unitId} = useParams()
    localStorage.setItem("unitId",unitId)
    const [activeRoomId, setActiveRoomId] = useState(null);
    

    // todo : remove product in a room 
    async function removeRoomProduct(roomId,productId) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}room/${roomId}/product/${productId}`);
        notify("success", "Product removed successfully");
        getRooms()
        getRooms()
      } catch (error) {
        notify("error", `an error occured ${error.message}`);
      }
    }
    // todo : remove room 
    async function removeRoom(id) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}room/${id}`);
        // console.log(response);
        notify("success", "room removed successfully");
        getRooms()
      } catch (error) {
        // console.error("Error deleting rooms:", error);
        notify("error",`an error occured ${error.message}`)
      }
    }
    // todo : get rooms
    async function getRooms() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}room/units/${unitId}/rooms`);
        console.log(response.data.rooms);
        setRooms(response.data.rooms)    
        const savedRoomId = localStorage.getItem('activeRoomId');
        if (savedRoomId) {
          setActiveRoomId(savedRoomId);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    useEffect(()=>{
        getRooms()   
    },[unitId])

    // todo handle activation of rooms
    const handleRoomActivation = (id) => {
      localStorage.setItem("activeRoomId",id)
      setActiveRoomId(`${id}`)
    }
  return (
    <>
        <div className="grid px-2">
            <div className="w-full col-span-12">
            <div className="flex flex-wrap -mx-1 overflow-y-auto">
                {rooms?.map((room, index) => {
                
                return (
                    <div key={index} className="w-full m-2">
                        <Card className="w-full p-2">
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <h5 className="w-full text-lg font-semibold tracking-tight text-gray-900 ">{room.roomName}</h5>
                                <h6 className="w-full text-sm font-semibold tracking-tight text-green-700 ">{`${room.unitName.unitName} floor number ${room.unitName.floorNum}`}</h6>
                                <div className='my-5 w-full p-4 flex flex-wrap overflow-auto'>
                                  <Link className='py-4 flex items-center justify-center' to="/products">
                                    <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
                                      <span className='flex items-center justify-center'>Add Product <FaPlus className='ms-2' /></span>
                                    </Button>
                                  </Link>
                                  <div className="w-full flex justify-between items-center">
                                    <Button className='my-4' color={activeRoomId == room._id ? "green" : "blue"} onClick={() => {handleRoomActivation(room._id)}}>
                                      {activeRoomId === room._id ? "Activated" : "Activate"}
                                    </Button>
                                    {activeRoomId === room._id ? <p className='text-green-600'>you can add now</p> : <p className='text-red-600'>activate unit and room to add products</p>}
                                    <FaTrash onClick={()=>{removeRoom(room._id)}} className='text-red-700 cursor-pointer text-2xl'/>
                                  </div>
                                  <div className="flex flex-wrap w-full">
                                    {room.roomItems?.map((i, index) => {
                                      return (
                                          <div key={index} className="lg:w-1/4 md:w-1/3 sm:w-1/2 p-1">
                                              <Card className='w-full' imgAlt={i.item?.title} imgSrc={i.item?.imageCover}>
                                                <Link to={`/product/${i.item._id}`}>
                                                  <div className="w-full">
                                                    <h5 className="w-full text-lg font-semibold tracking-tight text-gray-900 ">{`${i.item?.title}`}</h5>
                                                    <h5 className="w-full text-lg font-semibold tracking-tight text-gray-900 ">{`${i.item?.price} EGP`}</h5>
                                                  </div>
                                                </Link>
                                                <FaTrash onClick={()=>{removeRoomProduct(room._id,i.item._id)}} className='text-red-700 cursor-pointer mt-5'/>
                                              </Card>
                                          </div>
                                      )
                                    })}
                                  </div>
                                </div>
                                
                            </div>
                        </Card>
                    </div>
                );
                })}
            </div>
            </div>
        </div>
    </>
  )
}
 
