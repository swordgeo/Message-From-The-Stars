import React, { useState, useEffect } from 'react';
import alienCircle from "../images/alien-circle.png";
import alienSquare from "../images/alien-square.png";
import alienTriangle from "../images/alien-triangle.png";


function AlienWordInputs() {

    const [word1, setWord1] = useState('');
    const [word2, setWord2] = useState('');
    const [word3, setWord3] = useState('');

    return (
        <div id="alien-word-inputs">
          <p>Submit the three words on your card that your teammates will need to guess later:</p>
          <div class="row center">
            <div class="col-md-3 col-sm-4  d-flex flex-column align-items-center">
              <img src={alienCircle} alt="Alien Circle" height="35px"/>
              <input value={word1} onChange={e => setWord1(e.target.value)}
                  type="text" maxLength="30" class="word-input-box " pattern="[a-z]{30}"/>
            </div>
            <div class="col-md-3 col-sm-4 d-flex flex-column align-items-center">
              <img src={alienSquare} alt="Alien Circle" height="35px"/>
              <input value={word2} onChange={e => setWord2(e.target.value)}
                  type="text" maxLength="30" class="word-input-box" pattern="[a-z]{30}"/>
            </div>
            <div class="col-md-3 col-sm-4 d-flex flex-column align-items-center">
              <img src={alienTriangle} alt="Alien Circle" height="35px"/>
              <input value={word3} onChange={e => setWord3(e.target.value)}
                  type="text" maxLength="30" class="word-input-box " pattern="[a-z]{30}"/>
            </div>
          </div> {/* row center */}
        </div>
    );
};

export default AlienWordInputs;
  