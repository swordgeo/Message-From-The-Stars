//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, Component } from "react";
import './App.css';

import LetterGrid from './LetterGrid';
import LetterInputs from './LetterInputs';
import WordInputs from './WordInputs';
import WordOutputs from './WordOutputs';
import UseGetSuggestions from './GetSuggestions';


function App() {

  const [letters, setLetters] = useState([]);
  const [words, setWords] = useState([]);
  // const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  // const API_URL = process.env.REACT_APP_API_URL;
  // console.log("API_URL:", API_URL);

  const suggestions = UseGetSuggestions(fetchTrigger ? letters : [], fetchTrigger ? words : [], setIsLoading, setError);




  // takes in letters from HTML, posts them to Flask function  and then displays the suggestions
  function submitLetterWords() {
    const letterInputs = document.querySelectorAll('.input-box');
    const newLetters = Array.from(letterInputs).map(input => input.value);
    setLetters(newLetters);
    
    const wordsInputs = document.querySelectorAll('.word-input-box');
    const newWords = Array.from(wordsInputs).map(input => input.value);
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
          <LetterInputs/>
          <WordInputs/>
          <button onClick={submitLetterWords}>Submit Letters and Words</button>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {suggestions && (
          <div>
            {Object.keys(suggestions).map(word => (
              <div key={word}>
                <h3>{word}</h3>
                <ul>
                  {Array.isArray(suggestions[word]) ? (
                    suggestions[word].map((suggestion, index) => (
                      <li key={index}>
                        {suggestion.suggestion} (Grade: {suggestion.grade}, Density: {suggestion.density.toFixed(2)})
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

          <WordOutputs/>
          <LetterGrid/>
          
        </div>
        
      </div>
  )
}

export default App;




// function getSuggestions(letters, words) {
//   const encodedLetters = letters.join(',');
//   const encodedWords = words.join(',');
//   console.log(encodedLetters)
//   console.log(encodedWords)

//   // Return the promise from fetch
    // only works if I hardcode localhost:5000
//   return fetch('/get-suggestions', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `letters=${encodeURIComponent(encodedLetters)}&words=${encodeURIComponent(encodedWords)}`
//   })
//     .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json(); // This returns the parsed JSON response body
//     })
//     .then(data => {
//         console.log(data); // Handle the received data
//         // Assuming the data object contains a property named 'suggestions'
//         const suggestions = data.suggestions;
//         console.log(suggestions);
//         // Further processing of the suggestions...
//     })
//     .catch(error => {
//         console.error('Error fetching suggestions:', error);
//     });
// }