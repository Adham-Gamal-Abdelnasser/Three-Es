import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext.js'
import { Button, Card, Label, TextInput } from 'flowbite-react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaTrash } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
import { Field, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

export default function CartCalculations() {
  const [cartProducts,setCartProducts] = useState([])
  const [cartDetails,setCartDetails] = useState(null)
  const [cartId,setCartId] = useState("")
  const notify = (type, msg) => toast[type](msg);
  const navigate = useNavigate();
  let activeClientId = localStorage.getItem("activeClientId") != null ? localStorage.getItem("activeClientId") : ""

 
  // todo make calculations
  const calculationsSchema = Yup.object({
    shippingCost: Yup.number().required(),
    customsCost: Yup.number().required(),
    customsClearance: Yup.number().required(),
    storage: Yup.number().required(),
    localShipping: Yup.number().required(),
    otherCosts: Yup.number().required(),
    setup: Yup.number().required(),
    transportation: Yup.number().required(),
    discountRate: Yup.number().required(),
    commission: Yup.number().required(),
    currencyRate: Yup.number().required(),
    profitMargin: Yup.number().required(),
    taxRate: Yup.number().required(),
  });
  let calculationsInitialValues = {
    shippingCost: "",
    customsCost: "",
    customsClearance: "",
    storage: "",
    localShipping: "",
    otherCosts: "",
    setup: "",
    transportation: "",
    discountRate: "",
    commission: "",
    currencyRate: "",
    profitMargin: "",
    taxRate: "",
  };
  const calculationsHandleSubmit = async (values) => {
    activeClientId =
      localStorage.getItem("activeClientId") != null
        ? localStorage.getItem("activeClientId")
        : "";

    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}calculations/client/${activeClientId}/calculate`,
        values
      );
      if (response.status == 200) {
        setCartDetails(response.data.data);
        setCartProducts(response.data.data.cartItems);
      }
    } catch (error) {
    }
  };
  return (
    <>
      <Formik initialValues={calculationsInitialValues} validationSchema={calculationsSchema} onSubmit={calculationsHandleSubmit}>
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="p-5 flex flex-wrap">
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="currencyRate">Currency Rate</Label>
                  <Field name="currencyRate" as={TextInput} type="number" id="currencyRate" placeholder="Currency Rate..." className="w-3/4"></Field>
                  {errors.currencyRate && touched.currencyRate ? (
                    <div className="w-full text-red-600 text-center">{errors.currencyRate}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="shippingCost">
                    Shipping Cost
                  </Label>
                  <Field name="shippingCost" as={TextInput} type="number" id="shippingCost" placeholder="Shipping Cost..." className="w-3/4"></Field>
                  {errors.shippingCost && touched.shippingCost ? (
                    <div className="w-full text-red-600 text-center">{errors.shippingCost}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="customsCost">Custom Cost</Label>
                  <Field name="customsCost" as={TextInput} type="number" id="customsCost" placeholder="Custom Cost..." className="w-3/4"></Field>
                  {errors.customsCost && touched.customsCost ? (
                    <div className="w-full text-red-600 text-center">{errors.customsCost}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="customsClearance">Custom Clearence</Label>
                  <Field name="customsClearance" as={TextInput} type="number" id="customsClearance" placeholder="Custom Clearence..." className="w-3/4"></Field>
                  {errors.customsClearance && touched.customsClearance ? (
                    <div className="w-full text-red-600 text-center">{errors.customsClearance}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="storage">Storage</Label>
                  <Field name="storage" as={TextInput} type="number" id="storage" placeholder="Storage..." className="w-3/4"></Field>
                  {errors.storage && touched.storage ? (
                    <div className="w-full text-red-600 text-center">{errors.storage}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="localShipping">Local Shipping</Label>
                  <Field name="localShipping" as={TextInput} type="number" id="localShipping"placeholder="Local Shipping..." className="w-3/4"></Field>
                  {errors.localShipping && touched.localShipping ? (
                    <div className="w-full text-red-600 text-center">{errors.localShipping}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="otherCosts">Other Costs</Label>
                  <Field name="otherCosts" as={TextInput} type="number" id="otherCosts" placeholder="Other Costs..." className="w-3/4"></Field>
                  {errors.otherCosts && touched.otherCosts ? (
                    <div className="w-full text-red-600 text-center">{errors.otherCosts}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="setup">Setup</Label>
                  <Field name="setup" as={TextInput} type="number" id="setup" placeholder="Setup..." className="w-3/4"></Field>
                  {errors.setup && touched.setup ? (
                    <div className="w-full text-red-600 text-center">{errors.setup}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="transportation">Transportation</Label>
                  <Field name="transportation" as={TextInput} type="number" id="transportation" placeholder="Transportation..." className="w-3/4"></Field>
                  {errors.transportation && touched.transportation ? (
                    <div className="w-full text-red-600 text-center">{errors.transportation}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="discountRate">Discount Rate</Label>
                  <Field name="discountRate" as={TextInput} type="number" id="discountRate" placeholder="Discount Rate..." className="w-3/4"></Field>
                  {errors.discountRate && touched.discountRate ? (
                    <div className="w-full text-red-600 text-center">{errors.discountRate}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="commission">Commission</Label>
                  <Field name="commission" as={TextInput}type="number" id="commission" placeholder="Commission..." className="w-3/4"></Field>
                  {errors.commission && touched.commission ? (
                    <div className="w-full text-red-600 text-center">{errors.commission}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="profitMargin">Profit Margin</Label>
                  <Field name="profitMargin" as={TextInput} type="number" id="profitMargin" placeholder="Profit Margin..." className="w-3/4"
                  ></Field>
                  {errors.profitMargin && touched.profitMargin ? (
                    <div className="w-full text-red-600 text-center">{errors.profitMargin}</div>) : null}
                </div>
                <div className="lg:w-1/3 md:w-1/2 sm:w-full flex items-center mb-3 flex-wrap">
                  <Label className="w-1/4 text-center" htmlFor="taxRate">Tax Rate</Label>
                  <Field name="taxRate" as={TextInput} type="number" id="taxRate" placeholder="Tax Rate..." className="w-3/4"></Field>
                  {errors.taxRate && touched.taxRate ? (
                    <div className="w-full text-red-600 text-center">{errors.taxRate}</div>) : null}
                </div>
              </div>
              <div className="w-full flex items-center justify-center mb-3">
                <Button type="submit" color className="bg-black w-full mx-3 text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl">
                  <span className="flex items-center">Submit</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      <div className="grid grid-cols-12">
        
          


        <div className="w-full col-span-3 rounded-xl border-gray-100 border-2 shadow-xl m-3 py-3">
          <h2 className="mx-6 text-xl capitalize font-bold text-gray-800">Calaculations</h2>
          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Total Items</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.totalItems : "0"}
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Total Base Price</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.totalBasePrice : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Total Base Price</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.totalBasePrice : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Commission Amount</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.commissionAmount : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Discount Amount</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.discountAmount : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Profit</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.profit : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Taxes</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.tax : "0"} EGP
            </p>
          </div>

          <div className="w-full flex p-4 justify-between">
            <p className="text-gray-600">Cost per item</p>
            <p className="font-bold">
              {cartDetails ? cartDetails.costPerItem : "0"} EGP
            </p>
          </div>



          <div className="w-full flex items-center justify-center mb-3">
            <Link className='w-full py-4 flex items-center justify-center' to="/order">
              <Button color className="bg-black w-full mx-3 text-white hover:bg-transparent hover:text-black border-2 border-black rounded-3xl">
                <span className="flex items-center">CREATE ORDER <FaArrowRight className="ml-2" /></span>
              </Button>
            </Link>
          </div>
          
        </div>

        <div className="w-full col-span-9 flex px-5 flex-wrap overflow-y-auto">
          {cartProducts?.map((pro, index) => {
            return (
              <div key={index} className="lg:w-1/4 md:w-1/2 sm:w-full p-1">
                <Card imgAlt={pro.product.title} imgSrc={pro.product.imageCover} className="max-w-md p-2">
                  <div className="w-full flex items-center justify-between flex-wrap">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{pro.product.title}</h5>
                    <p className='bg-lime-700 text-white px-2 rounded-full'>{pro.quantity}</p>
                    <div className="w-full mt-3 flex justify-between">
                      <p className="text-gray-600">{pro.product.type == "OutSide" ? "@United States": "@Egypt"}</p>
                      <p className="text-black-600 font-bold">{pro.newPrice * pro.quantity} EGP</p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
