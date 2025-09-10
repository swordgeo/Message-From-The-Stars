// LetterInputs.js

function LetterInputs ({ alienLetters, onChange }) {


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
    <div className="input-container container-fluid center">
      <div class="row center">
        <div id="trust-letter-inputs" className="key-letter-grouping col-auto">
          <p>Trust Letters</p>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
              value={alienLetters[0] || ''}
              onChange={(e) => handleChange(e, null, 'box2', 0)}
              onKeyDown={(e) => handleKeyDown(e, null, null)}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box1"
            />
            <div className="letter-bars">
              <div className="bar bg-success"></div>
            </div>
          </div>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
            value={alienLetters[1] || ''}
            onChange={(e) => handleChange(e, null, 'box3', 1)}
            onKeyDown={(e) => handleKeyDown(e, null, 'box1')}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box2"
            />
            <div className="letter-bars">
              <div className="bar bg-dark"></div>
              <div className="bar bg-danger"></div>
            </div>
          </div>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
            value={alienLetters[2] || ''}
            onChange={(e) => handleChange(e, null, 'box4', 2)}
            onKeyDown={(e) => handleKeyDown(e, null, 'box2')}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box3"
            />
            <div className="letter-bars">
              <div className="bar bg-dark"></div>
              <div className="bar bg-danger"></div>
            </div>
          </div>
        </div> {/* trust-letter-inputs */}
        <div id="amplify-letter-inputs" className="key-letter-grouping col-auto">
          <p>Amplify Letters</p>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
            value={alienLetters[3] || ''}
            onChange={(e) => handleChange(e, null, 'box5', 3)}
            onKeyDown={(e) => handleKeyDown(e, null, 'box3')}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box4"
            />
            <div className="letter-bars">
              <div className="bar bg-success"></div>
            </div>
          </div>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
            value={alienLetters[4] || ''}
            onChange={(e) => handleChange(e, null, 'box6', 4)}
            onKeyDown={(e) => handleKeyDown(e, null, 'box4')}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box5"
            />
            <div className="letter-bars">
              <div className="bar bg-success"></div>
              <div className="bar bg-dark"></div>
              <div className="bar bg-danger"></div>
            </div>
          </div>
        </div> {/* amplify-letter-inputs */}
        <div id="suspicion-letter-inputs" className="key-letter-grouping col-auto">
          <p>Suspicion Letter</p>
          <div className="d-inline-flex flex-column align-items-center mx-2">
            <input
            value={alienLetters[5] || ''}
            onChange={(e) => handleChange(e, null, null, 5)}
            onKeyDown={(e) => handleKeyDown(e, null, 'box5')}
              type="text"
              maxLength="1"
              className="alien-letter-input-box" 
              id="box6"
            />
            <div className="letter-bars">
              <div className="bar bg-dark"></div>
              <div className="bar bg-danger"></div>
            </div>
          </div>
        </div> {/* suspicion-letter-inputs */}
        
      </div> {/* row center */}
      
    </div>
  );
};

export default LetterInputs;
  