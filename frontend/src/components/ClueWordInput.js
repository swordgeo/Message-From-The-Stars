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
        onChange={e => setGrade(parseInt(e.target.value, 10) || 0)} // Parse the input to integer
        type="number" 
        class="clue-grade-input-box"
      />
    </div>
  );
};

export default ClueWordInput;