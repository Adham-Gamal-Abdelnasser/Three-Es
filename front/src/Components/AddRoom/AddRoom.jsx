import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik, Form } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import { FaArrowRight } from 'react-icons/fa';
import axios from "axios";


export default function AddRoom() {
  const navigate = useNavigate("");
  const notify = (type, msg) => toast[type](msg);
  let unitId = localStorage.getItem("unitId")  
  // todo : add validation for room's name
  const roomSchema = Yup.object({
    roomName: Yup.string().required().min(3,'room Name must be at least 3 letters long.').max(50,"too long name"),
  });
  // todo : send data to server
  const handleSubmit = async (values) => {
    axios.post(`${process.env.REACT_APP_BASE_URL}room`, values).then(response => {
      notify("success", "Room Added Successfully");
      navigate(`/units/${unitId}`)
    })
    .catch(error => {
      notify("error",`an error occured ${error.message}`);
    })
  }
  return (
    <>
      <div className="p-6">
        <Formik
          initialValues={{
            roomName: "",
            unitId,
          }}
          validationSchema={roomSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="w-full flex items-center mb-3 flex-wrap">
                <Label className="w-1/4 text-center" htmlFor="roomName">Room name</Label>
                <Field name="roomName" as={TextInput} id="roomName" placeholder="Room Name" required className="w-3/4"/>
                {errors.roomName && touched.roomName ? (
                  <div className="w-full text-red-500 text-center">
                    {errors.roomName}
                  </div>
                ) : null}
              </div>

              <div className="w-full flex items-center justify-center mb-3">
                <Button type="submit" color className="bg-black text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl">
                  <span className="flex items-center">Submit<FaArrowRight className="ml-3" /></span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
