import React from 'react'

function Checkbox(props) {

  function handleClickChange() {
    
  }

  return (
    <input className='m-1' type='checkbox' checked={props.check} value={props.check}  />
    
  )
}

export default Checkbox