import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Button, TextInput, Label } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function AddUnit() {
  const navigate = useNavigate("")
  const notify = (type,msg) => toast[type](msg);
  // todo : add validation 
  const unitSchema = Yup.object({
    unitName: Yup.string().required().min(3,'Unit Name must be at least 3 letters long.'),
    floorNum: Yup.number().required(),
    client: Yup.string().required(),
  })
  let activeClientId = localStorage.getItem("activeClientId")
  // todo : send unit's data to server
  const handleSubmit = async (values)=> {
    axios.post(`${process.env.REACT_APP_BASE_URL}unit`, values).then(response=>{
      // console.log(response);
      notify("success",response.data.message)
      navigate("/units")
    }).catch(error=>{
      // console.error('Error adding unit:', error);
      notify("error",'Error adding unit')
    })
  }
  return (
    <>
      <div className="p-6">
      <Formik 
        initialValues={{
          unitName:"",
          floorNum:"",
          client: activeClientId,
        }}
        validationSchema={unitSchema}
        onSubmit={handleSubmit}
      >
        {({errors,touched})=>(
          <Form>
            <div className='w-full flex items-center mb-3 flex-wrap'>
              <Label className='w-1/4 text-center' htmlFor="unitName">Name Unit</Label>
              <Field name="unitName" as={TextInput} id="unitName" placeholder="unit name" required className='w-3/4' />
              {errors.unitName && touched.unitName ? (
                  <div className="w-full text-red-500 text-center">{errors.unitName}</div>
              ) : null}
            </div>

            <div className='w-full flex items-center mb-3 flex-wrap'>
              <Label className='w-1/4 text-center' htmlFor="floorNum">floors number</Label>
              <Field name="floorNum" as={TextInput} id="floorNum" placeholder="floor number" required className='w-3/4' />
              {errors.floorNum && touched.floorNum ? (
                  <div className="w-full text-red-500 text-center">{errors.floorNum}</div>
              ) : null}
            </div>

            <div className='w-full flex items-center justify-center mb-3'>
              <Button type='submit' color className='bg-black text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl'>
                  <span className='flex items-center'>Submit<FaArrowRight className='ml-3' /></span>
              </Button>
            </div>

          </Form>
        )}
      </Formik>
      </div>
    </>
  );
}
