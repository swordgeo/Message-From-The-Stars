import React, { useState, useEffect } from 'react';


function LetterInputs () {
  const [trustLetter1, setTrustLetter1] = useState('');
  const [trustLetter2, setTrustLetter2] = useState('');
  const [trustLetter3, setTrustLetter3] = useState('');
  const [amplifyLetter1, setAmplifyLetter1] = useState('');
  const [amplifyLetter2, setAmplifyLetter2] = useState('');
  const [suspicionLetter1, setSuspicionLetter1] = useState('');

  function getLetters() {
    return [trustLetter1, trustLetter2, trustLetter3, amplifyLetter1, amplifyLetter2, suspicionLetter1]
  }

  return (
    <div class="input-container">
      <div id="trust-letter-inputs" class="key-letter-grouping">
        <p>Trust Letters</p>
        <input value={trustLetter1} onChange={e => setTrustLetter1(e.target.value)}
          type="text" maxlength="1" class="input-box" id="box1" pattern="[a-z]{1}"/>
        <input value={trustLetter2} onChange={e => setTrustLetter2(e.target.value)}
          type="text" maxlength="1" class="input-box" id="box2" pattern="[a-z]{1}"/>
        <input value={trustLetter3} onChange={e => setTrustLetter3(e.target.value)} 
          type="text" maxlength="1" class="input-box" id="box3" pattern="[a-z]{1}"/>
      </div>
      <div id="amplify-letter-inputs" class="key-letter-grouping">
        <p>Amplify Letters</p>
        <input value={amplifyLetter1} onChange={e => setAmplifyLetter1(e.target.value)}
          type="text" maxlength="1" class="input-box" id="box4" pattern="[a-z]{1}"/>
        <input value={amplifyLetter2} onChange={e => setAmplifyLetter2(e.target.value)}
          type="text" maxlength="1" class="input-box" id="box5" pattern="[a-z]{1}"/>
      </div>
      <div id="suspicion-letter-inputs" class="key-letter-grouping">
        <p>Suspicion Letters</p>
        <input value={suspicionLetter1} onChange={e => setSuspicionLetter1(e.target.value)}
          type="text" maxlength="1" class="input-box" id="box6" pattern="[a-z]{1}"/>
      </div>
    </div>
  );
};

export default LetterInputs;
  