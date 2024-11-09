"use client"
import React, { useState } from 'react'

const Dashboard = () => {
  const arr = ['Irs', 'ima', 'rs'];
  const [formValue, setFormValue] = useState([])

  const handleChange = (e) =>{
    arr.forEach(item=> {
      item.toLowerCase().charAt(0) == e.charAt(0) && setFormValue(prev=> [...prev, item]);
    })
  }

  return (
    <div>
      <form>
      <input type='text' value='' className='bg-red-500 text-white flex items-center justify-center ml-52 mt-10' onChange={(e)=> handleChange(e.target.value)} />
      {
        formValue != [] &&
        formValue.map(item => <p className='ml-52'>{item}</p>)
      }
      </form>
    </div>
  )
}

export default Dashboard