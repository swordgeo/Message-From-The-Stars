// ClueWordInputSet.js

import { useState, useEffect } from 'react';
import ClueWordInput from './ClueWordInput';
import UseGetPossibleLetters from './GetPossibleLetters';
import LetterDropDown from './LetterDropDown';

function ClueWordInputSet({ humanWords, humanGrades, letterData, onWordsChange, onGradesChange, onLetterDataChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState(Array(6).fill('')); // Initialize with empty strings


  const handleWordChange = (index, newValue) => {
    const newWords = [...humanWords];
    newWords[index] = newValue.toLowerCase();
    onWordsChange(newWords);
  };

  const handleGradeChange = (index, newValue) => {
    const newGrades = [...humanGrades];
    newGrades[index] = newValue;
    onGradesChange(newGrades);
  };

  // now we call the API
  UseGetPossibleLetters(
    humanWords, 
    humanGrades,
    letterData,
    onLetterDataChange,
    setIsLoading, 
    setError,
    fetchTrigger
  );
  console.log("ClueWordInputSet.js");
  console.log(letterData.possible_letters);
  console.log(letterData.distinct_combinations);


  useEffect(() => {
    if (letterData.possible_letters && letterData.possible_letters.length > 0) {
      sessionStorage.setItem("possible_letters", JSON.stringify(letterData.possible_letters)); // sessionStorage only saves it in the current tab; refreshing or new window won't keep the data
    }
  }, [letterData.possible_letters]); // Only run when possible_letters changes

  const handleLetterChange = (id, letter) => {
    setSelectedLetters(prevLetters => {
      const newSelectedLetters = [...prevLetters];
      newSelectedLetters[id] = letter;
      return newSelectedLetters;
    });
  };

  // Ensure filteredCombinations is computed only when letterData.distinct_combinations is available
  const filteredCombinations = letterData && letterData.distinct_combinations ? 
    letterData.distinct_combinations.filter(combination => 
      selectedLetters.every((letter, index) => !letter || combination[index] === letter)
    ) : [];


  function resetClueWords() {
    // console.log("Reseting possible_letters")
    // console.log(sessionStorage.getItem("possible_letters"));
    sessionStorage.removeItem("possible_letters");
    // console.log(sessionStorage.getItem("possible_letters"));
    setFetchTrigger(false); // reset the state so we don't ignore the clear
  }


  function submitClueWords() {
    console.log("ClueWordInputSet.js submitClueWords()", humanWords, humanGrades);
    setIsLoading(true);
    setError(null);

    // Reset first, then set to true to ensure the change is detected
    setFetchTrigger(false);
    setTimeout(() => {
    setFetchTrigger(true);
    }, 0);

  }


  return (
    <section id="human-half">
      <div className="word-input-set">
        <div className="row mb-3">
          <div className="col-8">
            <strong>Word</strong>
          </div>
          <div className="col-4">
            <strong>Grade</strong>
          </div>
        </div>
        
        {/* This is the RIGHT way - using components! */}
        {Array.from({ length: 8 }, (_, index) => (
          <ClueWordInput
            key={index}
            humanWord={humanWords[index]}
            humanGrade={humanGrades[index]}
            onWordChange={(value) => handleWordChange(index, value)}
            onGradeChange={(value) => handleGradeChange(index, value)}
            placeholder={`Word ${index + 1}`}
          />
        ))}
        
        <p className="mt-3">
          <strong>Note:</strong> You probably don't want to start this process until about halfway through the game or later. 
          If the program behind this button is used after only one or two words, 
          there will be thousands of possible letter configurations to consider and processing will take a long while.
          <br/>That said, this program remembers the results of your last use, so subsequent words should not take as long.
        </p>
        
        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-human" onClick={submitClueWords}>Submit</button>
          <button className="btn btn-outline-secondary" onClick={resetClueWords}>Reset</button>
        </div>
      </div>

      <div className="mt-4">
        {isLoading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">Error: {error.message}</div>}
        
        {/* Display possible_letters */}
        {letterData && letterData.possible_letters && letterData.possible_letters.length > 0 && (
          <div className="mt-4">
            <h4>Possible Letters:</h4>
            <div className="row">
              {letterData.possible_letters.map((letters, index) => (
                <div key={index} className="col-12 mb-1">
                  <span className="badge bg-secondary me-2">Position {index + 1}:</span>
                  {letters.join(', ')}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display distinct_combinations */}
        {letterData && letterData.distinct_combinations && letterData.distinct_combinations.length > 0 && (
          <div className="mt-4">
            <h4>DISTINCT COMBINATIONS:</h4>
            <div className="bg-light p-3 rounded">
              {filteredCombinations.slice(0, 10).map((combination, index) => (
                <div key={index} className="font-monospace">{combination.join(', ')}</div>
              ))}
              <div className="mt-2">
                <strong>{filteredCombinations.length} total combinations</strong>
              </div>
            </div>
            
            <p className="mt-3">
              You can use these dropdown fields to filter the current possible letters to rule out or identify other letters in the code.
              <br/>If the total combinations reduces to zero, you may need to deselect some chosen letters.
            </p>
            
            <div className="row">
              {letterData.possible_letters && Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-2 mb-2">
                  <label className="form-label">Pos {index + 1}:</label>
                  <LetterDropDown 
                    id={index} 
                    onChange={handleLetterChange} 
                    letterList={letterData.possible_letters} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );


}

export default ClueWordInputSet;