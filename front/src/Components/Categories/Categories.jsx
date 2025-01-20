import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const notify = (type, msg) => toast[type](msg);

  // todo delete category
  async function deleteCategory(id) {
    axios.delete(`${process.env.REACT_APP_BASE_URL}category/${id}`).then(response=>{
      notify("success","deleted successfully")
      GetAllCategories()
    }).catch(error=>{
      notify("error",`an error occured ${error.message}`)
    })
  }

  //todo Fetch all categories from API
  async function GetAllCategories() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}category`);
      setCategories(response?.data.allCategories);
    } catch (error) {
      notify("error",`an error occured ${error.message}`)
    }
  }

  //todo Call GetAllCategories when the component mounts
  useEffect(() => {
    GetAllCategories();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mx-3 mb-4">
        <h2 className="text-2xl font-bold">All Categories</h2>
        <Link className="w-2/6 flex items-center justify-end" to="/addCategory">
          <Button color="black" className="bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white">
            <span className="flex items-center justify-center">
              Add Category <FaPlus className="ml-2" />
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mx-3">
        {categories.map((category,index) => (
          <Card key={index} imgSrc={category.image} className="max-w-sm">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {category.title}
            </h5>
            <FaTrash onClick={()=>{deleteCategory(category._id)}} className='text-red-700 cursor-pointer text-2xl'/>

          </Card>
        ))}
      </div>
    </div>
  );
}
