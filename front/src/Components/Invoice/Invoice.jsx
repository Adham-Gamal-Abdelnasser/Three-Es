import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Invoice() {
    const [invoiceInfo, setInvoiceInfo] = useState({})
    let orderId = localStorage.getItem("orderId") != null ? localStorage.getItem("orderId") : ""
    // todo : get invoice info
    async function getInvoiceInfo() {
        orderId = localStorage.getItem("orderId") != null ? localStorage.getItem("orderId") : ""        
        try {
            let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/${orderId}/invoice`);
            console.log(response);
            if (response.status === 200) {
                setInvoiceInfo(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInvoiceInfo()
    },[])
  return (
    <>
        <h2 className='text-5xl text-center font-dancing'>3 ES</h2>
        <h3 className='text-3xl text-center font-dancing'>{invoiceInfo?.clientName}</h3>
        <table className='w-full'>
            <thead className='border-b-2 border-slate-400'>
                <th className='py-5'>Date</th>
                <th className='py-5'>Item</th>
                <th className='py-5'>PPU</th>
                <th className='py-5'>QTY</th>
                <th className='py-5'>Price</th>
            </thead>
            <tbody>
                {invoiceInfo?.orderItems?.map((item,index) => (
                    <tr key={index}>
                        <td className='text-center'>{new Date(invoiceInfo.date).toLocaleDateString()}</td>
                        <td className='text-center'>{item.productName}</td>
                        <td className='text-center'>{item.unitPrice}</td>
                        <td className='text-center'>{item.quantity}</td>
                        <td className='text-center'>{item.unitPrice * item.quantity}</td>
                    </tr>
                ))}
                
            </tbody>
            <tfoot className='border-t-2 border-slate-400'>
                <tr>
                    <td colSpan={4} className='text-right font-bold text-lg'>subtotal</td>
                    <td className='text-center font-medium'>400</td>
                </tr>
                <tr>
                    <td colSpan={4} className='text-right font-bold text-lg'>tax</td>
                    <td className='text-center font-medium'>10%</td>
                </tr>
                <tr>
                    <td colSpan={4} className='text-right font-bold text-lg'>total</td>
                    <td className='text-center font-medium'>440</td>
                </tr>
                <tr>
                    <td colSpan={4} className='text-right capitalize font-dancing font-bold text-2xl'>tarek shaheen</td>
                </tr>
            </tfoot>
        </table>
    </>
  )
}
