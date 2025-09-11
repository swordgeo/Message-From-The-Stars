// App.js
import { useState } from "react";
import './App.css';
import './alien.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LetterInputs from './LetterInputs';
import AlienWordInputs from './AlienWordInputs';
import UseGetSuggestions from './GetSuggestions';
import ClueWordInputSet from './ClueWordInputSet';
import AutoGrader from './AutoGrader';


const commonLetters = ['A','E','I','L','N','O','R','S','T']
const uncommonLetters = ['B','C','D','F','G','H','M','P','U','W','Y']
const rareLetters = ['J','K','Q','V','X','Z']


function App() {
  const [alienLetters, setLetters] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);


  const [currentViewingPlayerMode, setCurrentViewingPlayerMode] = useState(null); // null, 'alien', or 'human'
  const [alienWords, setAlienWords] = useState(['', '', '']);
  const [humanWords, setHumanWords] = useState(Array(8).fill(''));
  const [humanGrades, setHumanGrades] = useState(Array(8).fill(''));
  const [humanLetterData, setHumanLetterData] = useState({ possible_letters: [], distinct_combinations: [] });

  const suggestions = UseGetSuggestions(fetchTrigger, alienLetters, alienWords, setIsLoading, setError);

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


  // takes in letters and words from HTML, posts them to Flask function and then displays the suggestions
  function submitAlienLettersAndWords() {
    const lowercaseAlienLetters = alienLetters.map(letter => letter.toLowerCase());
    const lowercaseAlienWords = alienWords.map(word => word.toLowerCase()).filter(word => word.trim() !== '');

    if (hasDuplicates(lowercaseAlienLetters.filter(letter => letter !== ''))) {
      setError(new Error("All six letters must be distinct."));
      return;
    }

    if (hasDuplicates(lowercaseAlienWords)) {
      setError(new Error("All words must be distinct."));
      return;
    }

    if (breaksLetterPattern(lowercaseAlienLetters)) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setFetchTrigger(false);
    setTimeout(() => {
      setFetchTrigger(true);
    }, 0);
  }


  function breaksLetterPattern(letterArray) {
    // Rule 1: positions 0 and 3 must be common letters
    if (!commonLetters.includes(letterArray[0].toUpperCase()) || 
        !commonLetters.includes(letterArray[3].toUpperCase())) {
        setError(new Error("Positions 1 and 4 must be common (green) letters"));
        return true;
    }
    // Rule 2: positions 1, 2, and 4 must be uncommon OR rare
    const restrictedPositions = [1, 2, 4];
    for (let pos of restrictedPositions) {
        if (!uncommonLetters.includes(letterArray[pos].toUpperCase()) && 
            !rareLetters.includes(letterArray[pos].toUpperCase())) {
            setError(new Error(`Position ${pos + 1} must be an uncommon (black) or rare (red) letter`));
            return true;
        }
    }
    // Rule 3: no more than one rare letter total
    const rareCount = letterArray.filter(letter => 
        rareLetters.includes(letter.toUpperCase())
    ).length;
    if (rareCount > 1) {
        setError(new Error("Cannot have more than one rare (red) letter"));
        return true;
    }
    return false; // Passes all letter rules
  }


  return (
      <div className={`full-body ${getCSSBodyClass()}`}>

      {/* Landing Page - shown when no mode is selected */}
      {!currentViewingPlayerMode && (
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
            <div className="row mt-5">
              <div className="col-5">
                <p className="text-end">Suggest Potential Clue Words</p>
              </div>
              <div className="col-2">
                <p className="text-center">- or -</p>
              </div>
              <div className="col-5">
                <p className="text-start">Rule Out the Impossible</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="d-grid">
                  <button 
                    type="button" 
                    className="btn btn-alien btn-lg" 
                    onClick={() => handleViewingPlayerModeChange('alien')}
                  >
                    Play As Alien
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="d-grid">
                  <button 
                    type="button" 
                    className="btn btn-human btn-lg" 
                    onClick={() => handleViewingPlayerModeChange('human')}
                  >
                    Play As Human
                  </button>
                </div>
              </div>
            </div>
            <hr/>
            <div className="strategy">
              <p>To play super strategically, you may choose to the other side of this program during play for additional information.</p>
              <p>As an alien player, you might migrate to the human side to figure out what the information you've given has proved or disproved so far (and what areas need more attention).</p>
              <p>As a human player, you might migrate to the alien side with your favorite currently legal combination and your own keywords for suggested that can prove or disprove your hunch</p>
            </div>
          </div>
        </header>
      )} {/* Landing page - null mode */}


      {/* Mode selector (shown when a mode is active) */}
      {currentViewingPlayerMode && (
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <span className="navbar-brand">Message From The Stars Helper</span>
            <div className="navbar-nav ms-auto">
              <button 
                className={`btn me-2 ${currentViewingPlayerMode === 'alien' ? 'btn-alien' : 'btn-secondary'}`}
                onClick={() => handleViewingPlayerModeChange('alien')}
              >
                Alien Mode
              </button>
              <button 
                className={`btn me-2 ${currentViewingPlayerMode === 'human' ? 'btn-human' : 'btn-secondary'}`}
                onClick={() => handleViewingPlayerModeChange('human')}
              >
                Human Mode
              </button>
              <button 
                className="btn me-2 btn-dark"
                onClick={() => handleViewingPlayerModeChange(null)}
              >
                Home
              </button>
            </div>
          </div>
        </nav>
      )} {/* Mode selector*/}


      {/* Alien Section - hidden/shown based on mode */}
      {currentViewingPlayerMode === 'alien' && (
        <div className="alien-half">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title text-center">Alien Player Tools</h2>
                    
                    <LetterInputs 
                      alienLetters={alienLetters} 
                      onChange={(index, value) => {
                        const lowercaseAlienLetters = alienLetters.slice(0, 6);
                        lowercaseAlienLetters[index] = value;
                        setLetters(lowercaseAlienLetters);
                      }}
                    />
                    
                    <AlienWordInputs
                      alienWords={alienWords}
                      onChange={setAlienWords}
                    />
                    
                    <div className="text-center mt-4">
                      <p>When your six letters and three words are ready, hit the submit button to get your results!</p>
                      <button className="btn btn-alien btn-lg" onClick={submitAlienLettersAndWords}>
                        Get Suggestions As Alien
                      </button>
                    </div>

                    {isLoading && <div className="alert alert-info mt-3">Loading...</div>}
                    {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}

                    <AutoGrader alienLetters={alienLetters} />

                    {suggestions && (
                      <div className="suggestions-list mt-4">
                        {Object.keys(suggestions).map(word => (
                          <div key={word} className="mb-3">
                            <h3>{word}</h3>
                            <ul className="list-group">
                              {Array.isArray(suggestions[word]) ? (
                                suggestions[word].map((suggestion, index) => (
                                  <li key={index} className="list-group-item">
                                    {suggestion.suggestion.split('').map((char, i) => (
                                      alienLetters.some(letter => letter.toLowerCase() === char.toLowerCase()) ? 
                                        <b key={i}><u>{char}</u></b> : 
                                        <span key={i}>{char}</span>
                                    ))}
                                    {' '}(Grade: {suggestion.grade}, Density: {suggestion.density.toFixed(2)})
                                  </li>
                                ))
                              ) : (
                                <li className="list-group-item">No suggestions available</li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Human Section - hidden/shown based on mode */}
      {currentViewingPlayerMode === 'human' && (
        <div className="human-half">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title text-center">Human Player Tools</h2>
                    <ClueWordInputSet 
                      humanWords={humanWords}
                      humanGrades={humanGrades}
                      letterData={humanLetterData}
                      onWordsChange={setHumanWords}
                      onGradesChange={setHumanGrades}
                      onLetterDataChange={setHumanLetterData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
        

export default App;