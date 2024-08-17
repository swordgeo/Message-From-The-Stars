import React, { useState, useEffect } from 'react';

function LetterDropDown({id, onChange, letterList=[] }) { // Default to an empty array if letterList is undefined
  const [chosenLetter, setChosenLetter] = useState('');
  console.log("Index ", id)

  const handleChange = (event) => {
    setChosenLetter(event.target.value);
    if (onChange) {
      onChange(id, event.target.value); //notify parent of change
    }
  };

  return (
    <div className="letter-drop-down">
      <select name="letter" value={chosenLetter} onChange={handleChange}>
        <option label=" "></option> 
        {letterList[id].map((letter, index) => (
          <option key={index} value={letter}>{letter}</option>
        ))}
      </select>
    </div>
  );
};

export default LetterDropDown;