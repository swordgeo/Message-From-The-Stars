import React, { useState, useEffect } from 'react';

function AlienWordInputs() {

    const [word1, setWord1] = useState('');
    const [word2, setWord2] = useState('');
    const [word3, setWord3] = useState('');

    return (
        <div id="alien-word-inputs">
          <p>Submit the three words on your card that your teammates will need to guess later:</p>
            <input value={word1} onChange={e => setWord1(e.target.value)}
                type="text" maxlength="30" class="word-input-box" pattern="[a-z]{30}"/>
            <input value={word2} onChange={e => setWord2(e.target.value)}
                type="text" maxlength="30" class="word-input-box" pattern="[a-z]{30}"/>
            <input value={word3} onChange={e => setWord3(e.target.value)}
                type="text" maxlength="30" class="word-input-box" pattern="[a-z]{30}"/>
        </div>
    );
};

export default AlienWordInputs;
  