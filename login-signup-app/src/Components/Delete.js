import React from 'react'
import { Link } from 'react-router-dom'

function Delete() {
  return (
    <div className='container mx-auto p-2 m-5 w-25 text-center shadow bg-dark'>
        <h5 className='text-light mx-auto'>The record has been deleted Successfully</h5>
        <Link to="/" className='btn btn-success m-2 w-100 mx-auto'>Back</Link>
    </div>
  )
}

export default Delete
