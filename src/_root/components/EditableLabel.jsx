import React, { useState, useEffect } from "react";

function EditableLabel(props) {
  //const {text}=props;
  
  const [isEditing, setIsEditing] = useState(false);
  const [realText, setRealText] = useState(props.text);
  const [editingText, setEditingText] = useState('');



  useEffect(() => {
    // Editing is finished, is there any text?
    if(!isEditing && editingText.trim() !== "") {
        setRealText(editingText);
    }
    // Editing is starting
    else if (isEditing) {
      setEditingText(realText);
    }
  }, [isEditing])

  // Text changed from the outside via props
  useEffect(() => {
    setIsEditing(false);
    setRealText(props.text);
  }, [props.text])

  const handleTextClick = () => {
    setIsEditing(true);
  };


  const handleInputChange = (e) => {
    setEditingText(e.target.value);
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
        value={editingText}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    ) : (
      <span className="font-bold" onClick={handleTextClick}>{realText}</span>
    )}
  </div>
)

}

export default EditableLabel