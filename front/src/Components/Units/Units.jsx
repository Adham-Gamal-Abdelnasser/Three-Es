import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUnit from '../AddUnit/AddUnit';
import { Button } from 'flowbite-react';
import { Link, Outlet } from 'react-router-dom';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Styles from './Units.module.css'

export default function Units() {
  const [units, setUnits] = useState([]);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const notify = (type,msg) => toast[type](msg);
  let activeClientId = localStorage.getItem("activeClientId")


  // todo remove unit
  async function removeUnit(id) {
    axios.delete(`${process.env.REACT_APP_BASE_URL}unit/${id}`).then(response => {
      console.log(response);
      notify("success","deleted successfully")
      getUnitsByUserId()
    }).catch(error=>{
      console.log(error);
    })
  }

  // todo get units
  async function getUnitsByUserId() {
    activeClientId = localStorage.getItem("activeClientId")
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}unit/clients/${activeClientId}/units`);
        if(response.status === 200){
          setUnits(response.data.units);
          const savedUnitId = localStorage.getItem('activeUnitId');
          if (savedUnitId) {
            setActiveUnitId(savedUnitId);
          }
        }
    } catch (error) {
      console.log("error fe el units",error)
    }    
  }
  useEffect(() => {
    getUnitsByUserId();
  }, []);
  // const fetchUnits = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}unit`);
  //     setUnits(response.data.allUnits);
  //     const savedUnitId = localStorage.getItem('activeUnitId');
  //       if (savedUnitId) {
  //         setActiveUnitId(savedUnitId);
  //       }
  //   } catch (error) {
  //     console.error("Error fetching units:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUnits();
  // }, []);



  // const fetchUnits = async () => {
  //   activeClientId = localStorage.getItem("activeClientId")
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}unit/clients/${activeClientId}/units`);
  //     setUnits(response.data.allUnits);
  //     const savedUnitId = localStorage.getItem('activeUnitId');
  //       if (savedUnitId) {
  //         setActiveUnitId(savedUnitId);
  //       }
  //   } catch (error) {
  //     console.error("Error fetching units:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUnits();
  // }, []);

  // todo handle activation of units
  const handleUnitActivation = (id) => {
    localStorage.setItem("activeUnitId",id)
    setActiveUnitId(`${id}`)
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <h2 className="border-b-2 border-green-500 my-6 text-2xl font-bold text-center text-gray-800">Units</h2>
      <div className="flex">
        <Link className='w-2/6 py-4 flex items-center justify-center' to="/addUnit">
          <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
            <span className='flex items-center justify-center'>Add Unit <FaPlus className='ms-2' /></span>
          </Button>
        </Link>
        <Link className='w-2/6 py-4 flex items-center justify-center' to="/addRoom">
          <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
            <span className='flex items-center justify-center'>Add Room <FaPlus className='ms-2' /></span>
          </Button>
        </Link>
      </div>
      <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-12 md:grid md:grid-cols-12">
        <div className="w-full col-span-3">
          <div className="">
            {units.length > 0 ? (
              <div className={`sm:flex  sm:gap-2 sm:p-2 sm:my-2 sm:overflow-auto p-2 lg:block`}>
                {units.map((unit) => {
                    return <div key={unit._id} id={unit._id} className={`${Styles.unit} mx-auto mb-2 p-4 shadow-lg rounded-2xl bg-white`}>
                    <Link  to={unit._id}>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">{unit.unitName}</h3>
                      <p className="text-gray-700 mb-1"><strong>Floor Number:</strong> {unit.floorNum}</p>
                      <p className="text-gray-700 mb-1"><strong>Address:</strong> {unit.address}</p>
                      {/* <p className="text-gray-500"><strong>Created At:</strong> {new Date(unit.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-500"><strong>Updated At:</strong> {new Date(unit.updatedAt).toLocaleDateString()}</p> */}
                      <div className="flex justify-between items-center">
                        <Button className='my-4' color={activeUnitId === unit._id ? "green" : "blue"} onClick={() => {handleUnitActivation(unit._id)}}>
                          {activeUnitId === unit._id ? "Activated" : "Activate"}
                        </Button>
                        <FaTrash onClick={()=>{removeUnit(unit._id)}} className='text-red-700 cursor-pointer text-2xl'/>
                      </div>
                    </Link>
                    </div>
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600">No units available.</p>
          )}
          </div>
        </div>
        <div className="w-full col-span-9">
          
          <Outlet></Outlet>
        </div>
      </div>     
    </div>
  );
}
