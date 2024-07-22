import React, { useState } from "react";

function EditableLabel() {
  
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('Click to edit a name');

  const handleTextClick = () => {
    setIsEditing(true);
  };


  const handleInputChange = (e) => {
    setText(e.target.value);
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
  <div>
    {isEditing ? (
      <input
        className="text-black font-bold"
        type="text"
        value={text}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    ) : (
      <span className="font-bold" onClick={handleTextClick}>{text}</span>
    )}
  </div>
)

}

export default EditableLabel