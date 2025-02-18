import React, { useState, useEffect } from 'react';

function ClueWordInput(id, onChange) {
  const [word, setWord] = useState('');
  const [grade, setGrade] = useState(0);

  return (
    <div class="clue-word-input">
      <input 
        value={word} 
        onChange={e => setWord(e.target.value)}
        type="text" 
        maxlength="20" 
        class="clue-word-input-box" 
        pattern="[a-z]{20}" 
        placeholder="Enter word"
      />
      <input 
        value={grade} 
        onChange={e => {
          const input = e.target.value;
          // Allow empty input or a single "-" (preparing to enter negative number)
          if (input === '' || input === '-') {
            setGrade(input);
          } else {
            const parsed = parseInt(input, 10);
            if (!isNaN(parsed)) {
              setGrade(parsed);
            }
          }
        }}
        type="text"  // Change to text to allow natural input
        class="clue-grade-input-box"
      />
    </div>
  );
};

export default ClueWordInput;