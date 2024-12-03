import React from 'react'
import glitch from '../../assets/error-404jpg.jpg'

export default function NotFound() {
  return (
    <div className="w-96 mx-auto">
        <img className='w-full' src={glitch} alt="error page not found" />
    </div>
  )
}
