import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import { FaArrowRight } from "react-icons/fa";
import React from 'react'
import * as Yup from 'yup';
import { toast } from 'react-toastify';


export default function AddClient() {
    const notify = (type, msg) => toast[type](msg);
    // todo : add validation
    const clientSchema = Yup.object().shape({
        firstName: Yup.string().required("first name is required :)"),
        lastName: Yup.string().required("last name is required :)"),
        email: Yup.string().email().required("email is required :)"),
        mobileNumber: Yup.number().required("phone number is required :)")
    })
    // todo : send client data to server
    const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}client`, values)
            if (response.data.message === 'Client added successfully' || response.data.status == 201) {
                notify("success",response.data.message)
                console.log('Client added successfully:', response.data);
            }
        } catch (error) {
            console.error('Error adding Client:', error);
            notify("error",`an error occured : ${error.message}`)
        }
    }
  return (
    <>
        <div className='p-6'>
            <Formik 
                initialValues={{
                    firstName:"",
                    lastName:"",
                    email:"",
                    mobileNumber:"",
                }}
                validationSchema={clientSchema}
                onSubmit={handleSubmit}
            >
                {({errors,touched})=>(
                    <Form>
                         <div className='w-full flex items-center mb-3 flex-wrap'>
                            <Label className='w-1/4 text-center' htmlFor="firstName">Client's first Name</Label>
                            <Field name="firstName" as={TextInput} id="firstName" placeholder="first Name" required className='w-3/4' />
                            {errors.firstName && touched.firstName ? (
                                <div className="w-full text-red-500 text-center">{errors.firstName}</div>
                            ) : null}
                         </div>

                         <div className='w-full flex items-center mb-3 flex-wrap'>
                            <Label className='w-1/4 text-center' htmlFor="lastName">Client's Last Name</Label>
                            <Field name="lastName" as={TextInput} id="lastName" placeholder="Last Name" required className='w-3/4' />
                            {errors.lastName && touched.lastName ? (
                                <div className="w-full text-red-500 text-center">{errors.lastName}</div>
                            ) : null}
                         </div>

                         <div className='w-full flex items-center mb-3 flex-wrap'>
                            <Label className='w-1/4 text-center' htmlFor="email">Client's emial</Label>
                            <Field name="email" as={TextInput} id="email" placeholder="Email" required className='w-3/4' />
                            {errors.email && touched.email ? (
                                <div className="w-full text-red-500 text-center">{errors.email}</div>
                            ) : null}
                         </div>

                         <div className='w-full flex items-center mb-3 flex-wrap'>
                            <Label className='w-1/4 text-center' htmlFor="mobileNumber">Client's Phone Number</Label>
                            <Field name="mobileNumber" as={TextInput} id="mobileNumber" placeholder="Phone Number" required className='w-3/4' />
                            {errors.mobileNumber && touched.mobileNumber ? (
                                <div className="w-full text-red-500 text-center">{errors.mobileNumber}</div>
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
  )
}
