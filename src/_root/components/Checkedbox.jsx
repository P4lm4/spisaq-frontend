import React, { useState } from 'react'

function Checkbox(props) {
const [isChecked, setIsChecked] = useState(props.check);

function checkHandler() {
  setIsChecked(!isChecked);
  
}

  return (
    <input className='m-1' type='checkbox' checked={isChecked} onChange={checkHandler} />
    
  )
}

export default Checkbox