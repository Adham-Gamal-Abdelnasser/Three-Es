import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";


export default function ProductDetails() {
  let {productDetailedId} = useParams()
  const [product, setProduct] = useState({})
  const [images,setImages] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  async function getDetails() {
    await axios.get(`${process.env.REACT_APP_BASE_URL}product/${productDetailedId}`).then(response => {
      console.log(response.data.product);
      setProduct(response.data.product)
      setImages(response.data.product.images)
    }).catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getDetails()
  },[productDetailedId])
  return (
    <>
        <div className="bg-white">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <Slider {...settings}>
              <img src={product.imageCover} alt={`${product.title} ${product.description}`} className="rounded-lg bg-gray-100" />
              {images.map((imagePath,index)=>{
                return(
                  <img src={imagePath} key={index} alt={`${product.title} ${product.description}`} className="rounded-lg bg-gray-100" />
                )
              })}
            </Slider>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h2>
              <p className="mt-4 text-gray-500">{product.description}</p>
              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">price</dt>
                  <dd className="mt-2 text-sm text-green-500">{product.priceAfterDiscount<product.price ? <span><del className='mx-2'>{product.price}</del>{product.priceAfterDiscount}</span>:<span>{product.price}</span>}</dd>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">Serial Number</dt>
                  <dd className="mt-2 text-sm text-gray-500">{product.serialNumber}</dd>
                </div>
                
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            
            </div>
          </div>
        </div>

    </>
  )
}
