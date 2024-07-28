import React, { useState } from "react";

function EditableLabel(props) {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    props.onTextChange(e.target.value);
  };

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      setIsEditing(false);
    }
  };


return (
  <div className="flex items-center justify-center">
    {isEditing ? (
      <input
        className="text-black font-bold m-1"
        type="text"
        value={props.text}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    ) : (
      <span className="font-bold" onClick={handleTextClick}>{props.text}</span>
    )}
  </div>
)

}

export default EditableLabel