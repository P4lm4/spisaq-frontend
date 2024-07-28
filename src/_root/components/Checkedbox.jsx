import React, { useState } from 'react'

function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(false);

function onClickChange() {
  setIsChecked(!props.check);
}

  return (
    <input className='m-1' type='checkbox' value={props.check} onChange={onClickChange} />
    
  )
}

export default Checkbox