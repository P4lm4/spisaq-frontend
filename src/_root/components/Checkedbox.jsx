import React, { useState } from "react";

function Checkbox(props) {
  function onClickChange(e) {
    props.onChange?.(e.target.checked);
  }

  return (
    <input
      className="m-1 accent-green-700"
      type="checkbox"
      checked={props.check}
      onChange={onClickChange}
    />
  );
}

export default Checkbox;
