import React from 'react'

const ErrorBox = (props) => {
  return (
    <div className='error-box p-1 bg-light text-dark rounded z-1'>
        <h5 className='text-danger'>{props.error}</h5>
        </div>
  )
}
export default ErrorBox