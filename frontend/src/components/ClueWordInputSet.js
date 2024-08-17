import React, { useState } from 'react';
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


  const letterData = UseGetPossibleLetters(fetchTrigger ? words : [], fetchTrigger ? grades : [], setIsLoading, setError);
  // letterData.possible_letters and data.distinct_combinations

  const handleLetterChange = (id, letter) => {
    setSelectedLetters(prevLetters => {
      const newSelectedLetters = [...prevLetters];
      newSelectedLetters[id] = letter; // Assuming id is a number from 0 to 5
      return newSelectedLetters;
    });
  };

  // Ensure filteredCombinations is computed only when letterData.distinct_combinations is available
  const filteredCombinations = letterData && letterData.distinct_combinations ? letterData.distinct_combinations.filter(combination => 
    selectedLetters.every((letter, index) => !letter || combination[index] === letter)
  ) : [];


  function submitClueWords() {
    const clueWordInputs = document.querySelectorAll('.clue-word-input-box');
    const newClueWords = Array.from(clueWordInputs).map(input => input.value);
    
    const clueGradeInputs = document.querySelectorAll('.clue-grade-input-box');
    const newClueGrades = Array.from(clueGradeInputs).map(input => input.value);
  
    console.log("ClueWordInputSet 22", newClueWords, newClueGrades);

    setWords(newClueWords);
    setGrades(newClueGrades);

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