// import React from 'react'
import { useNavigate } from 'react-router-dom';

const DateSheet = () => {
    const navigate = useNavigate();
  return (
    <button className='bg-blue text-sm py-3 px-3 justify-center items-center' onClick={()=>navigate("/")}>Back</button>
  )
}

export default DateSheet
