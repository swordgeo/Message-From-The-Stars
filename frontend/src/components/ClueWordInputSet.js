import React, { useState, useEffect } from 'react';
import ClueWordInput from './ClueWordInput';
import UseGetPossibleLetters from './GetPossibleLetters';
import LetterDropDown from './LetterDropDown';

function WordInputSet() {
  const [words, setWords] = useState({});
  const [grades, setGrades] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState(Array(6).fill('')); // Initialize with empty strings

  // now we call the API call
  const letterData = UseGetPossibleLetters(fetchTrigger ? words : [], fetchTrigger ? grades : [], setIsLoading, setError);
  console.log("ClueWordInputSet.js");
  console.log(letterData.possible_letters);
  console.log(letterData.distinct_combinations);
  // letterData.possible_letters and data.distinct_combinations

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
  const filteredCombinations = letterData && letterData.distinct_combinations ? letterData.distinct_combinations.filter(combination => 
    selectedLetters.every((letter, index) => !letter || combination[index] === letter)
  ) : [];


  function resetClueWords() {
    console.log("Reseting possible_letters")
    console.log(sessionStorage.getItem("possible_letters"));
    sessionStorage.removeItem("possible_letters");
    console.log(sessionStorage.getItem("possible_letters"));
    setFetchTrigger(false); // reset the state so we don't ignore the clear
  }


  function submitClueWords() {
    const clueWordInputs = document.querySelectorAll('.clue-word-input-box');
    const newClueWords = Array.from(clueWordInputs).map(input => input.value);
    
    const clueGradeInputs = document.querySelectorAll('.clue-grade-input-box');
    const newClueGrades = Array.from(clueGradeInputs).map(input => input.value);
  
    console.log("ClueWordInputSet.js submitClueWords()", newClueWords, newClueGrades);

    setWords(newClueWords);
    setGrades(newClueGrades);

    // for lazy testing
    // setWords(["pipelayer", "gallery", "combination", "satirical", "cape", "sapient"])
    // setGrades(["4", "0", "8", "0", "2", "4"])

    setIsLoading(true);
    setError(null);
    setFetchTrigger(true); //trigger the fetch
  }


  return (
    <section id="human-half">
      <div className="word-input-set">
        {[...Array(8)].map((_, index) => (
          <ClueWordInput key={index} id={`word${index}`} />
        ))}
        <p>Note: You probably don't want to start this process until about halfway through the game or later. 
          If the program behind this button is used after only one or two words, 
          there will be thousands of possible letter configurations to consider and processing will take a long while.
          <br/>That said, this program remembers the results of your last use, so subsequent words should not take as long.</p>
        <button onClick={submitClueWords}>Submit</button>
        <button onClick={resetClueWords}>Reset</button>
      </div>

      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        
        {/* Display possible_letters */}
        {letterData && letterData.possible_letters && (
        <div>
          <h3>Possible Letters:</h3>
          {letterData.possible_letters.map((letters, index) => (
            <div key={index}>{letters.join(', ')}</div>
          ))}
        </div>
        )}

        {/* Display distinct_combinations */}
        
        {letterData && letterData.distinct_combinations && (
        <div>
          <h3>DISTINCT COMBINATIONS:</h3>
          {filteredCombinations.slice(0, 10).map((combination, index) => (
            <div key={index}>{combination.join(', ')}</div>
          ))}
          <div>{filteredCombinations.length} total combinations</div>
          <p>You can use these dropdown fields to filter the current possible letters to rule out or identify other letters in the code.<br/>If the total combinations reduces to zero, you may need to deselect some chosen letters.</p>
          {letterData.possible_letters && Array.from({ length: 6 }).map((_, index) => (
            <LetterDropDown 
              key={index} 
              id={index} 
              onChange={handleLetterChange} 
              letterList={letterData.possible_letters} 
            />)
          )}
        </div>
        )}
      </div>
    </section>
  );
}

export default WordInputSet;