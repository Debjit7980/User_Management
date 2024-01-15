import React from 'react'
import { Link } from 'react-router-dom'

function Delete() {
  return (
    <div className='container mx-auto p-2 mt-5  text-center shadow bg-dark delete-page'>
        <h5 className='text-light mx-auto'>The record has been deleted Successfully</h5>
        <Link to="/" className='btn btn-success mt-2 w-100 mx-auto'>Back</Link>
    </div>
  )
}

export default Delete
