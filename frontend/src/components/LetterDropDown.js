import React, { useState, useEffect } from 'react';

function LetterDropDown({id, onChange, letterList=[] }) { // Default to an empty array if letterList is undefined
  const [chosenLetter, setChosenLetter] = useState('');

  const handleChange = (event) => {
    setChosenLetter(event.target.value);
    if (onChange) {
      onChange(id, event.target.value); //notify parent of change
    }
  };

  return (
    <div className="letter-drop-down">
      <select name="letter" value={chosenLetter} onChange={handleChange}>
        {letterList.map((letter, index) => (
          <option key={index} value={letter}>{letter}</option>
        ))}
      </select>
    </div>
  );
};

export default LetterDropDown;