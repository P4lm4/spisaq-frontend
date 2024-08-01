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
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      props.onEditDone?.(text);
    }
  }, [isEditing]);

  return (
    <div className="flex w-full">
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
        <div
          className={`flex-1 mx-auto max-w-sm break-all  ${
            props.completed && "line-through text-gray-700 text-left"
          }`}
          onClick={handleTextClick}
        >
          <p className="tracking-tight font-bold text-balance">{props.text}</p>
        </div>
      )}
    </div>
  );
}

export default EditableLabel;
