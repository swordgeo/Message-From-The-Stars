//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, Component } from "react";
import './App.css';

import LetterGrid from './LetterGrid';
import LetterInputs from './LetterInputs';
import AlienWordInputs from './AlienWordInputs';
import UseGetSuggestions from './GetSuggestions';
import ClueWordInputSet from './ClueWordInputSet';
import AutoGrader from './AutoGrader';


function App() {

  const [letters, setLetters] = useState(['', '', '', '', '', '']);
  const [words, setWords] = useState([]);
  // const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // const API_URL = process.env.REACT_APP_API_URL;
  // console.log("API_URL:", API_URL);

  const suggestions = UseGetSuggestions(fetchTrigger ? letters : [], fetchTrigger ? words : [], setIsLoading, setError);

  //something to check for duped input letters/words
  const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };


  // takes in letters and words from HTML, posts them to Flask function  and then displays the suggestions
  function submitLetterWords() {
    const letterInputs = document.querySelectorAll('.input-box');
    const newLetters = Array.from(letterInputs).map(input => input.value);
    
    const wordsInputs = document.querySelectorAll('.word-input-box');
    const newWords = Array.from(wordsInputs).map(input => input.value);

    if (hasDuplicates(newLetters)) {
      setError(new Error("All six letters must be distinct."));
      return;
    }

    if (hasDuplicates(newWords)) {
      setError(new Error("All words must be distinct."));
      return;
    }

    setLetters(newLetters);
    setWords(newWords);

    setIsLoading(true);
    setError(null);
    setFetchTrigger(true); //trigger the fetch
  }

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  
  // console.log("Suggestions:", suggestions); // Log the suggestions state
  


  return (
      <div>
        <header class="center">
          <h1>Message From The Stars Helper</h1>
          <p>This tool can help your team by suggesting useful words to your alien player or by ruling out impossible letters for your human player(s)</p>
        </header>
        <div>
        <LetterInputs 
          letters={letters} 
          onChange={(index, value) => {
            const newLetters = letters.slice(0, 6); // Ensure we always have 6 elements
            newLetters[index] = value;
            setLetters(newLetters);
          }}
        />
          <AlienWordInputs/>
          <p>When your six letters and three words are ready, hit the submit button to get your results!</p>
          <button onClick={submitLetterWords}>Submit Letters and Words</button>

          <AutoGrader letters={letters} />

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {suggestions && ( // Check if there are suggestions to display
          <div>
            {Object.keys(suggestions).map(word => ( // Iterate over each word in the suggestions object
              <div key={word}>
                <h3>{word}</h3>
                <ul>
                {Array.isArray(suggestions[word]) ? ( // Check if the value for the word is an array
            suggestions[word].map((suggestion, index) => ( // Map over each suggestion for the current word
              <li key={index}>
                {suggestion.suggestion.split('').map((char, i) => ( //Split the suggestion string into individual characters and map over them
                // Check if current character is in letters array
                // If so, <b><u> that sucker so aliens can easily track their relevant letters
                  letters.includes(char) ? 
                  <b key={i}><u key={i}>{char}</u></b> : 
                    <span key={i}>{char}</span>
                ))}
                {' '}(Grade: {suggestion.grade}, Density: {suggestion.density.toFixed(2)})
              </li>
            ))
                  ) : (
                    <li>No suggestions available</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}



        <hr></hr>
          <ClueWordInputSet />
          <LetterGrid/>

          <button class="btn btn-primary">BOOTSTRAP</button>
          
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>


        </div>
        
      </div>
  )
}

export default App;