// AlienWordInputs.js
import alienCircle from "../images/alien-circle.png";
import alienSquare from "../images/alien-square.png";
import alienTriangle from "../images/alien-triangle.png";


function AlienWordInputs({alienWords, onChange}) {

    const handleWordChange = (index, newValue) => {
      const newWords = [...alienWords];
      newWords[index] = newValue;
      onChange(newWords);
    };

    return (
        <div id="alien-word-inputs">
          <p>Submit the three words on your card that your teammates will need to guess later:</p>
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-4 d-flex flex-column align-items-center">
              <img src={alienCircle} alt="Alien Circle" height="35px"/>
              <input 
                value={alienWords[0] || ''} 
                onChange={e => handleWordChange(0, e.target.value)}
                type="text" 
                maxLength="30" 
                className="word-input-box form-control mt-2" 
                pattern="[a-z]{30}"
                placeholder="First word"
              />
            </div>
            <div className="col-md-3 col-sm-4 d-flex flex-column align-items-center">
              <img src={alienSquare} alt="Alien Circle" height="35px"/>
              <input 
                value={alienWords[1] || ''} 
                onChange={e => handleWordChange(1, e.target.value)}
                type="text" 
                maxLength="30" 
                className="word-input-box form-control mt-2" 
                pattern="[a-z]{30}"
                placeholder="Second word"
              />
            </div>
            <div className="col-md-3 col-sm-4 d-flex flex-column align-items-center">
              <img src={alienTriangle} alt="Alien Circle" height="35px"/>
              <input 
                value={alienWords[2] || ''} 
                onChange={e => handleWordChange(2, e.target.value)}
                type="text" 
                maxLength="30" 
                className="word-input-box form-control mt-2" 
                pattern="[a-z]{30}"
                placeholder="Third word"
              />
            </div>
          </div> {/* row center */}
        </div>
    );
};

export default AlienWordInputs;
  