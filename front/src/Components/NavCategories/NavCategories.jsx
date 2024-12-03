import React, { useContext, useEffect, useState } from 'react'
import { categoryContext } from '../../Context/CategoryContext.js';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';

export default function NavCategories() {
    const [categories,setCategories] = useState([])
    // todo : recieve categories from context
    let {getCategories}= useContext(categoryContext)
    async function recieveCategories() {
        let response = await  getCategories()
        setCategories(response.data.allCategories)        
    }
    useEffect(()=>{
        recieveCategories()
    },[])

  return (
    <>
    <Link className="mx-3" to={`/products`}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">All</h5>
    </Link>
     {categories.map((category,index) => (
        <Link key={index} className="mx-3" to={`/products/${category._id}`}>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{category.title}</h5>
        </Link>
    ))}
    <Link className="mx-3" to="/addCategory">
        <Button color="black" className="py-0 bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white">
            <span><FaPlus/></span>
        </Button>
    </Link>
    </>
  )
}
