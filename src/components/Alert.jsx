import React from 'react'

function Alert({message,closeAlert}) {
  
  return (
    <div id='alert-container'>
      <h2>{message}</h2>
      <p onClick={closeAlert}>X</p>
    </div>
  )
}

export default Alert
