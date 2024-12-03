import React, { useState } from 'react';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { HiFire } from "react-icons/hi";
// Icons
import { CiImageOn } from 'react-icons/ci';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CategorySchema = Yup.object().shape({
    title: Yup.string().required('Category Title is required'),
    image: Yup.mixed().required('Image is required')
});

export default function AddCategory() {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate("");
    const notify = (type,msg) => toast[type](msg);
    const handleImageChange = (event) => {
        setImage(event.currentTarget.files[0]);
    };

    // todo : add category
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', values.title);

        console.log({
            title: values.title,
            image: image
        });
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}category`, formData);
            if (response.data.message === 'Added') {
                notify("success",'Category Added Successfully')
            }
            resetForm();
            setImage(null);
            navigate("/categories")
        } catch (error) {
            // console.log(error);
            notify("error",`an error occurred ${error.message}`)
        } finally {
            setSubmitting(false);

        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-6">
                <Formik
                    initialValues={{ title: '', image: null }}
                    validationSchema={CategorySchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className='w-full flex items-center mb-3 flex-wrap'>
                                <Label className='w-1/4 text-center' htmlFor="title">Category Title</Label>
                                <Field name="title" as={TextInput} id="title" placeholder="Category Title" required className='w-3/4' />
                                {errors.title && touched.title ? (
                                    <div className="w-full text-red-500 text-center">{errors.title}</div>
                                ) : null}
                            </div>
                            <div className="flex w-full items-center justify-center mb-4">
                                <Label
                                    htmlFor="image"
                                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <CiImageOn size={50} className='opacity-40' />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload image</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="hidden"
                                        onChange={(event) => {
                                            handleImageChange(event);
                                            setFieldValue("image", event.currentTarget.files[0]);
                                        }}
                                    />
                                </Label>
                                {errors.image && touched.image ? (
                                    <div className="w-full text-red-500 text-center">{errors.image}</div>
                                ) : null}
                            </div>
                            <div className='w-full flex items-center justify-center mb-3'>
                                <Button type='submit' className='bg-black text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl' disabled={isSubmitting}>
                                    <span className='flex items-center'>Submit<FaArrowRight className='ml-3' /></span>
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
