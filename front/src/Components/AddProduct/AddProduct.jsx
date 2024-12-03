import React, { useEffect, useState } from 'react';
import { Button, FileInput, Label, TextInput, Textarea, Select } from "flowbite-react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CiImageOn } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [imageCover, setImageCover] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const notify = (type, msg) => toast[type](msg);
  const navigate = useNavigate("")

  // todo : add validation for product name, description, price, image
  const ProductSchema = Yup.object().shape({
    title: Yup.string().required('Product Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive(),
    priceAfterDiscount: Yup.number(),
    quantity: Yup.number().required('Quantity is required').positive().integer(),
    serialNumber: Yup.string().required('Serial Number is required').min(3,"Min 3 numbers"),
    sold: Yup.number().required('Sold is required').positive().integer(),
    category: Yup.string().required('Category is required')
  });

  const handleImageCoverChange = (event) => {
    setImageCover(event.currentTarget.files[0]);
  };
  const handleImagesChange = (event) => {
    setImages([...event.currentTarget.files]);
  };
  // todo : send product data to server
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('imageCover', imageCover);
    // todo : Key name should match server expectation
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('priceAfterDiscount', values.priceAfterDiscount);
    formData.append('quantity', values.quantity);
    formData.append('serialNumber', values.serialNumber);
    formData.append('sold', values.sold);
    formData.append('category', values.category);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      notify("success",response.data.message)
      navigate("/products")
    } catch (error) {
      notify("error",`an error occurred while adding product : ${error.message}`)
    }
  };
  

  const GetAllCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}category`);
      setCategories(response?.data.allCategories);
    } catch (error) {
      notify("error",`an error occurred getting cateogries : ${error.message}`)
    }

  };

  useEffect(() => {
    GetAllCategories();
  }, []);

  return (
    <div className="min-h-screen flex flex-col rounded-2xl">
      <div className='flex-grow p-6 flex justify-center'>
        <div className="w-1/2">
          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="cover-image"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <CiImageOn size={50} className='opacity-40' />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload cover image</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <FileInput id="cover-image"  className="hidden" onChange={handleImageCoverChange} />
            </Label>
          </div>
          <div className='w-full my-3'>
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="multi-images"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <CiImageOn size={50} className='opacity-40' />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload images</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <FileInput id="multi-images" className="hidden" multiple onChange={handleImagesChange} />
              </Label>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <Formik
            initialValues={{
              title: '',
              serialNumber: '',
              quantity: '',
              price: '',
              priceAfterDiscount: '',
              description: '',
              sold: '',
              category: ''
            }}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="title">Product Name</Label>
                  <Field name="title" as={TextInput} id="title" placeholder="Product Name" required className='w-3/4' />
                  {errors.title && touched.title ? (
                    <div className="w-full text-red-500 text-center">{errors.title}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="serialNumber">Serial Number</Label>
                  <Field name="serialNumber" type="number" as={TextInput} id="serialNumber" placeholder="Serial Number" required className='w-3/4' />
                  {errors.serialNumber && touched.serialNumber ? (
                    <div className="w-full text-red-500 text-center">{errors.serialNumber}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="quantity">Quantity</Label>
                  <Field name="quantity" type="number" as={TextInput} id="quantity" placeholder="Quantity" required className='w-3/4' />
                  {errors.quantity && touched.quantity ? (
                    <div className="w-full text-red-500 text-center">{errors.quantity}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="price">Price</Label>
                  <Field name="price" type="number" as={TextInput} id="price" placeholder="Price" required className='w-3/4' />
                  {errors.price && touched.price ? (
                    <div className="w-full text-red-500 text-center">{errors.price}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="priceAfterDiscount">Price After Discount</Label>
                  <Field name="priceAfterDiscount" type="number" as={TextInput} id="priceAfterDiscount" placeholder="Price After Discount" className='w-3/4' />
                  {errors.priceAfterDiscount && touched.priceAfterDiscount ? (
                    <div className="w-full text-red-500 text-center">{errors.priceAfterDiscount}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="sold">Sold</Label>
                  <Field name="sold" as={TextInput} id="sold" placeholder="Sold" required className='w-3/4' type="number" />
                  {errors.sold && touched.sold ? (
                    <div className="w-full text-red-500 text-center">{errors.sold}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="category">Category</Label>
                  <Field as="select" name="category" id="category" required className='w-3/4 bg-gray-50 border-gray-300'>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category._id}>{category.title}</option>
                    ))}
                  </Field>
                  {errors.category && touched.category ? (
                    <div className="w-full text-red-500 text-center">{errors.category}</div>
                  ) : null}
                </div>
                <div className='w-full flex items-center mb-3 flex-wrap'>
                  <Label className='w-1/4 text-center' htmlFor="description">Description</Label>
                  <Field name="description" as={Textarea} id="description" rows={5} placeholder="Description" required className='w-3/4' />
                  {errors.description && touched.description ? (
                    <div className="w-full text-red-500 text-center">{errors.description}</div>
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
      </div>
    </div>
  );
}
