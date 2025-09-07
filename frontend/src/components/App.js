//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, Component } from "react";
import './App.css';
import './alien.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LetterGrid from './LetterGrid';
import LetterInputs from './LetterInputs';
import AlienWordInputs from './AlienWordInputs';
import UseGetSuggestions from './GetSuggestions';
import ClueWordInputSet from './ClueWordInputSet';
import AutoGrader from './AutoGrader';


const commonLetters = ['A','E','I','L','N','O','R','S','T']
const uncommonLetters = ['B','C','D','F','G','H','M','P','U','W','Y']
const rareLetters = ['J','K','Q','V','X','Z']


function App() {
  const [letters, setLetters] = useState(['', '', '', '', '', '']);
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const suggestions = UseGetSuggestions(fetchTrigger, letters, words, setIsLoading, setError);

  const [currentViewingPlayerMode, setCurrentViewingPlayerMode] = useState(null); // null, 'alien', or 'human'

  const handleViewingPlayerModeChange = (mode) => {
    setCurrentViewingPlayerMode(mode);
    // Clear any errors when switching modes
    setError(null);
  };

  const getCSSBodyClass = () => {
    if (currentViewingPlayerMode === 'alien') return 'alien-mode';
    if (currentViewingPlayerMode === 'human') return 'human-mode';
    return 'landing-mode';
  };

  //something to check for duped input letters/words
  const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };


  function breaksLetterPattern(letterArray) {
    console.log(letterArray[0].toUpperCase());
    // Rule 1: positions 0 and 3 must be common letters
    if (!commonLetters.includes(letterArray[0].toUpperCase()) || 
        !commonLetters.includes(letterArray[3].toUpperCase())) {
        console.log("Positions 1 and 4 must be common (green) letters");
        return true;
    }
    // Rule 2: positions 1, 2, and 4 must be uncommon OR rare
    const restrictedPositions = [1, 2, 4];
    for (let pos of restrictedPositions) {
        if (!uncommonLetters.includes(letterArray[pos].toUpperCase()) && 
            !rareLetters.includes(letterArray[pos].toUpperCase())) {
            console.log(`Position ${pos + 1} must be uncommon (black) or rare (red) letters`);
            return true;
        }
    }
    // Rule 3: no more than one rare letter total
    const rareCount = letterArray.filter(letter => 
        rareLetters.includes(letter.toUpperCase())
    ).length;
    if (rareCount > 1) {
        console.log("Cannot have more than one rare (red) letter");
        return true;
    }
    return false; // Passes all letter rules
  }

  // takes in letters and words from HTML, posts them to Flask function and then displays the suggestions
  function submitLetterWords() {
    const letterInputs = document.querySelectorAll('.alien-letter-input-box');
    const newLetters = Array.from(letterInputs).map(input => input.value.toLowerCase());
    
    const wordsInputs = document.querySelectorAll('.word-input-box');
    const newWords = Array.from(wordsInputs).map(input => input.value.toLowerCase());

    if (hasDuplicates(newLetters)) {
      setError(new Error("All six letters must be distinct."));
      return;
    }

    if (hasDuplicates(newWords)) {
      setError(new Error("All words must be distinct."));
      return;
    }

    if (breaksLetterPattern(newLetters)) {
      setError(new Error("Make sure you have exactly one common (green) trust and amplify letter, and no more than one rare (red) letter in your code."));
      return;
    }

    setLetters(newLetters);
    setWords(newWords);
    setIsLoading(true);
    setError(null);
    setFetchTrigger(false);
    setTimeout(() => {
      setFetchTrigger(true);
    }, 0);
  }


  return (
      <div className="full-body">
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <h1 className="text-center mb-4">Message From The Stars Helper</h1>
                <p className="text-center">
                  <a href="https://www.allplay.com/board-games/a-message-from-the-stars/">Message From The Stars</a> is a word game equal parts logic puzzle and deductive reasoning.<br/>
                  This tool can help you play more effectively as the alien or human player.<br/>
                  As the alien player, enter in your letter grid and key words and we'll suggest possible clues for you to give your humans.<br/>
                  As the human player, enter in the words and grades that you have so far and we'll eliminate impossible letters so you don't have to second guess.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <p className="text-right">Suggest Potential Clue Words</p>
              </div>
              <div className="col-2">
                <p className="text-center">- or -</p>
              </div>
              <div className="col-5">
                <p className="text-left">Rule Out the Impossible</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <button type="button" className="btn btn-md" aria-pressed="true">Play As Alien</button>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-md" aria-pressed="true">Play As Human</button>
              </div>
            </div>
          </div>
        </header>

        <div class="alien-half">
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
          <button type="button" className="btn btn-primary btn-md" onClick={submitLetterWords}>Get Suggestions As Alien</button>

          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}

          <AutoGrader letters={letters} />

          <p>If one of your words comes back with no results, it could be that you have a typo, our APIs have no suggestions for you (rare but happens) or our APIs have merely timed out and you should try again in a few seconds.</p>

          {suggestions && ( // If there are suggestions, we will display them
            <div class="suggestions-list">
              {Object.keys(suggestions).map(word => ( // Iterate over each word in the suggestions object
                <div key={word}>
                  <h3>{word}</h3>
                  <ul>

                    {Array.isArray(suggestions[word]) ? ( // Check if the value for the word is an array

                      suggestions[word].map((suggestion, index) => ( // Map over each suggestion for the current word
                        <li key={index}>
                          {suggestion.suggestion.split('').map((char, i) => ( //Split the suggestion string into individual characters and map over them
                            letters.includes(char) ? // Check if current character is in letters array (meaning it's a relevant letter)
                            <b key={i}><u key={i}>{char}</u></b> : // If so, <b><u> that sucker for visual clarity
                            <span key={i}>{char}</span> // If not, leave it be
                          ))} {/* end of suggestion.suggestion.split */}
                          {' '}(Grade: {suggestion.grade}, Density: {suggestion.density.toFixed(2)})
                        </li>
                      )) // end of suggestions[word].map
                    ) : ( // end of suggestions if. Else we have nothing to display
                      <li>No suggestions available</li>

                    )}
                  </ul>
                </div> // end of suggestion section for one key word
              ))} {/* end of Object.keys */}
            </div> 
          )} {/* end of suggestions */}
          
        </div> {/* end of .alien-half */}
          <hr></hr>
        <div class="human-half">
          <ClueWordInputSet />
          {/* <LetterGrid/> */}
        </div>


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
  ) // end of React return
}

export default App;