import React, { useState, useEffect } from 'react';


function LetterInputs ({ letters, onChange }) {
  // const [trustLetter1, setTrustLetter1] = useState('');
  // const [trustLetter2, setTrustLetter2] = useState('');
  // const [trustLetter3, setTrustLetter3] = useState('');
  // const [amplifyLetter1, setAmplifyLetter1] = useState('');
  // const [amplifyLetter2, setAmplifyLetter2] = useState('');
  // const [suspicionLetter1, setSuspicionLetter1] = useState('');

  // filter out non-letter characters
  const handleKeyDown = (event, setLetter, prevInputId) => {
    const char = String.fromCharCode(event.which);
    if (!/[a-zA-Z]/.test(char) && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }

    //on backspace, focus on the previous letter
    if (event.key === 'Backspace' && !event.target.value) {
      if (prevInputId) {
        document.getElementById(prevInputId).focus();
      }
    }
  };

  // auto-focus on the next input-box after a keystroke
  const handleChange = (event, setLetter, nextInputId, index) => {
    const value = event.target.value;
    if (/[a-zA-Z]/.test(value)) {
      if (nextInputId) {
        document.getElementById(nextInputId).focus();
      }
      onChange(index, value); //update parent component
    } else {
      onChange(index, ''); // Clear the input if invalid
    }
  };

  return (
    <div className="input-container">
      <p class="center">Make sure your letters are assigned correctly; 
        this program will not ensure your letters are valid.</p>
      <p>If one of your words comes back with no results, it could be that you have a typo, our APIs have no suggestions for you (rare but happens) or our APIs have merely timed out and you should try again in a few seconds.</p>
      <div id="trust-letter-inputs" className="key-letter-grouping">
        <p>Trust Letters</p>
        <input
          value={letters[0] || ''}
          onChange={(e) => handleChange(e, null, 'box2', 0)}
          onKeyDown={(e) => handleKeyDown(e, null, null)}
          type="text"
          maxLength="1"
          className="input-box"
          id="box1"
        />
        <input
          value={letters[1] || ''}
          onChange={(e) => handleChange(e, null, 'box3', 1)}
          onKeyDown={(e) => handleKeyDown(e, null, 'box1')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box2"
        />
        <input
          value={letters[2] || ''}
          onChange={(e) => handleChange(e, null, 'box4', 2)}
          onKeyDown={(e) => handleKeyDown(e, null, 'box2')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box3"
        />
      </div>
      <div id="amplify-letter-inputs" className="key-letter-grouping">
        <p>Amplify Letters</p>
        <input
          value={letters[3] || ''}
          onChange={(e) => handleChange(e, null, 'box5', 3)}
          onKeyDown={(e) => handleKeyDown(e, null, 'box3')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box4"
        />
        <input
          value={letters[4] || ''}
          onChange={(e) => handleChange(e, null, 'box6', 4)}
          onKeyDown={(e) => handleKeyDown(e, null, 'box4')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box5"
        />
      </div>
      <div id="suspicion-letter-inputs" className="key-letter-grouping">
        <p>Suspicion Letters</p>
        <input
          value={letters[5] || ''}
          onChange={(e) => handleChange(e, null, null, 5)}
          onKeyDown={(e) => handleKeyDown(e, null, 'box5')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box6"
        />
      </div>
    </div>
  );
};

export default LetterInputs;
  