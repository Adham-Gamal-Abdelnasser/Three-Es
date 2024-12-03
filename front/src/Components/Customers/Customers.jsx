import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from 'flowbite-react';
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Styles from './Customers.module.css'


export default function Customers() {
  const [clients, setClients] = useState([]);
  const [activeClientId, setActiveClientId] = useState(null);
  const notify = (type, msg) => toast[type](msg);

  // todo delete client
  async function removeClient(id) {
    axios.delete(`${process.env.REACT_APP_BASE_URL}client/${id}`).then(response=>{
      notify("success",response.data.message)
      fetchClients()
    }).catch(error=>{
      notify("error",error.message)
    })
  }
  // todo : get all clients
  const fetchClients = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}client`);
      setClients(response.data.allClients);
      const storedClientId = localStorage.getItem("activeClientId");
      if (storedClientId) {
        setActiveClientId(storedClientId);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };
  useEffect(() => {
    fetchClients();
  }, []);
  // todo : handle client selection by local storage saving 
  const handleActivateClient = (clientId) => {
    localStorage.setItem("activeClientId", clientId);
    setActiveClientId(clientId);
  };

  return (
    <div className="flex flex-col rounded-2xl">
      <div className="flex-grow p-6">
        <h2 className="border-b-2 border-green-400 my-3 text-xl font-bold text-center">Clients</h2>
        <Link className='w-6/6 flex items-center justify-center' to="/addClient">
          <Button color="black" className='bg-transparent border-2 border-black rounded-2xl text-black hover:bg-black hover:text-white'>
              <span className='flex items-center justify-center'>Add Client</span>
          </Button>
        </Link>
        <div className={`sm:p-2 sm:my-2 sm:overflow-auto p-2 lg:block`}>
          {clients.length > 0 ? (
            clients.map((client) => (
              <div key={client._id} className={`lg:${Styles.client} sm:w-full mx-auto mb-2 p-4 shadow-lg rounded-2xl bg-white`}>
                <div className="flex mb-4 justify-between items-center">
                  <Avatar rounded={true} alt={`${client.firstName} ${client.lastName}`}/>
                  <h2 className="text-lg font-medium">{client.firstName} {client.lastName}</h2>
                </div>
                <div className="flex mb-4 justify-between gap-4 items-center">
                  <Button color={activeClientId === client._id ? "green" : "blue"} onClick={() => handleActivateClient(client._id)}>
                    {activeClientId === client._id ? "Activated" : "Activate"}
                  </Button>
                  <FaTrash onClick={()=>{removeClient(client._id)}} className='text-red-700 text-2xl cursor-pointer'/>
                </div>

              </div>
            ))
          ) : (
            <p className="text-center">No clients available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
