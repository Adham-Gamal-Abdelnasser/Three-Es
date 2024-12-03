import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavCategories from '../NavCategories/NavCategories.jsx'
import { categoryContext } from '../../Context/CategoryContext.js';
import { Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import {  TextInput } from 'flowbite-react';
import { RiSearch2Fill } from 'react-icons/ri';

export default function ProductsLayout() {
    const [products, setProducts] = useState([]);
    const [categories,setCategories] = useState([])

    // todo : recieve categories from context
    let {getCategories}= useContext(categoryContext)
    async function recieveCategories() {
        let response = await  getCategories()
        // console.log(response.data.allCategories);
        setCategories(response.data.allCategories)        
    }
    useEffect(()=>{
        recieveCategories()
    },[])
  return (
    <>
        <div className="flex justify-start items-center mb-4">
            <h2 className="text-lg font-bold">Products</h2>
            <div className='w-1/2 flex'>
                {/* <TextInput className='w-4/6 me-10' placeholder='Search product...' icon={RiSearch2Fill} /> */}
                <Link className='w-2/6 flex items-center justify-center' to="/addProduct">
                    <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
                        <span className='flex items-center justify-center'>Add Product <FaPlus className='ms-2' /></span>
                    </Button>
                </Link>
            </div>
        </div>
        <div className="flex space-x-3 mb-4">
            <NavCategories></NavCategories>
        </div>
        <Outlet></Outlet>
    </>
  )
}
