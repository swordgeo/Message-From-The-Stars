// LetterDropDown.js

import { useState, useEffect } from 'react';

function LetterDropDown({id, onChange, letterList=[] }) { // Default to an empty array if letterList is undefined
  const [chosenLetter, setChosenLetter] = useState('');
  // console.log("Index ", id)

  const handleChange = (event) => {
    setChosenLetter(event.target.value);
    if (onChange) {
      onChange(id, event.target.value); //notify parent of change
    }
  };

  // Reset the dropdown when letterList changes (new data loaded)
  useEffect(() => {
    setChosenLetter('');
    if (onChange) {
      onChange(id, '');
    }
  }, [letterList]);

  // Make sure we have valid data before trying to render options
  const availableLetters = letterList[id] || [];

  return (
    <div className="letter-drop-down">
      <select 
        name="letter" 
        value={chosenLetter} 
        onChange={handleChange}
        className="form-select form-select-sm"
      >
        <option value="">Select...</option>
        {availableLetters.map((letter, index) => (
          <option key={index} value={letter}>{letter}</option>
        ))}
      </select>
    </div>
  );
}

export default LetterDropDown;