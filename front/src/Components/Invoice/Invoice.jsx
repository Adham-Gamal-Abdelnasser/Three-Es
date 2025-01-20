import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Invoice() {
    const [invoiceInfo, setInvoiceInfo] = useState({})
    let orderId = localStorage.getItem("orderId") != null ? localStorage.getItem("orderId") : ""
    // todo : get invoice info
    async function getInvoiceInfo() {
        orderId = localStorage.getItem("orderId") != null ? localStorage.getItem("orderId") : ""
        console.log(orderId);
        
        try {
            let response = await axios.get(`${process.env.REACT_APP_BASE_URL}orders/${orderId}/invoice`);
            console.log(response);

            if (response.status === 200) {
                
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
        <h2 className='text-5xl text-center'>Invoice</h2>
        <table className='w-full'>
            <thead className='border-b-2 border-slate-400'>
                <th className='py-5'>Item</th>
                <th className='py-5'>QTY</th>
                <th className='py-5'>any</th>
                <th className='py-5'>Price</th>
            </thead>
            <tbody>
                <tr>
                    <td className='text-center'>Item</td>
                    <td className='text-center'>QTY</td>
                    <td className='text-center'>Price</td>
                    <td className='text-center'>Price</td>
                </tr>
            </tbody>
            <tfoot className='border-t-2 border-slate-400'>
                <tr>
                    <td colSpan={3} className='text-right font-bold text-lg'>subtotal</td>
                    <td className='text-center font-medium'>400</td>
                </tr>
                <tr>
                    <td colSpan={3} className='text-right font-bold text-lg'>tax</td>
                    <td className='text-center font-medium'>10%</td>
                </tr>
                <tr>
                    <td colSpan={3} className='text-right font-bold text-lg'>total</td>
                    <td className='text-center font-medium'>440</td>
                </tr>
            </tfoot>
        </table>
    </>
  )
}
