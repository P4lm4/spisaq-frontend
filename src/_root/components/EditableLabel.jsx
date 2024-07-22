import React, { useState, useEffect } from "react";

function EditableLabel(props) {
  const {text}=props;
  
  const [isEditing, setIsEditing] = useState(false);
  const [text2, setText2] = useState(text);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    if(!isEditing && newText.trim() !== "") {
        setText2(newText);
    }
    else if (isEditing) {
      setNewText(text);
    }
    setText2(text)
  }, [isEditing, text])

  const handleTextClick = () => {
    setIsEditing(true);
  };


  const handleInputChange = (e) => {
    setNewText(e.target.value);
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
        value={newText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    ) : (
      <span className="font-bold" onClick={handleTextClick}>{text2}</span>
    )}
  </div>
)

}

export default EditableLabel