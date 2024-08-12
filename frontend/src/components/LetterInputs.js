import React, { useState, useEffect } from 'react';


function LetterInputs () {
  const [trustLetter1, setTrustLetter1] = useState('');
  const [trustLetter2, setTrustLetter2] = useState('');
  const [trustLetter3, setTrustLetter3] = useState('');
  const [amplifyLetter1, setAmplifyLetter1] = useState('');
  const [amplifyLetter2, setAmplifyLetter2] = useState('');
  const [suspicionLetter1, setSuspicionLetter1] = useState('');

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
  const handleInput = (event, setLetter, nextInputId) => {
    const value = event.target.value.toLowerCase();
    if (/[a-zA-Z]/.test(value)) {
      setLetter(value);
      if (nextInputId) {
        document.getElementById(nextInputId).focus();
      }
    } else {
      setLetter('');
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
          value={trustLetter1}
          onInput={(e) => handleInput(e, setTrustLetter1, 'box2')}
          onKeyDown={(e) => handleKeyDown(e, setTrustLetter1, null)}
          type="text"
          maxLength="1"
          className="input-box"
          id="box1"
        />
        <input
          value={trustLetter2}
          onInput={(e) => handleInput(e, setTrustLetter2, 'box3')}
          onKeyDown={(e) => handleKeyDown(e, setTrustLetter2, 'box1')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box2"
        />
        <input
          value={trustLetter3}
          onInput={(e) => handleInput(e, setTrustLetter3, 'box4')}
          onKeyDown={(e) => handleKeyDown(e, setTrustLetter3, 'box2')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box3"
        />
      </div>
      <div id="amplify-letter-inputs" className="key-letter-grouping">
        <p>Amplify Letters</p>
        <input
          value={amplifyLetter1}
          onInput={(e) => handleInput(e, setAmplifyLetter1, 'box5')}
          onKeyDown={(e) => handleKeyDown(e, setAmplifyLetter1, 'box3')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box4"
        />
        <input
          value={amplifyLetter2}
          onInput={(e) => handleInput(e, setAmplifyLetter2, 'box6')}
          onKeyDown={(e) => handleKeyDown(e, setAmplifyLetter2, 'box4')}
          type="text"
          maxLength="1"
          className="input-box"
          id="box5"
        />
      </div>
      <div id="suspicion-letter-inputs" className="key-letter-grouping">
        <p>Suspicion Letters</p>
        <input
          value={suspicionLetter1}
          onInput={(e) => handleInput(e, setSuspicionLetter1, null)}
          onKeyDown={(e) => handleKeyDown(e, setSuspicionLetter1, 'box5')}
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
  