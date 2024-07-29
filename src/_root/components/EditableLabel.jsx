import React, { useEffect, useState } from "react";

function EditableLabel(props) {
  const [text, setText] = useState(props.text || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
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

  useEffect(() => {
    if(!isEditing) {
      props.onEditDone?.(text);
    }
  }, [isEditing])


return (
  <div className="flex items-center justify-center">
    {isEditing ? (
      <input
        className="text-black font-bold m-1"
        type="text"
        value={text}
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