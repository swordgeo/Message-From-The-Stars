import { useState } from 'react';

function AutoGrader({ alienLetters }) {
  const [text, setText] = useState('');

  const handleInput = (event) => {
    const value = event.target.value;
    setText(value);
    AutoGrade(value);
  };

  function AutoGrade(currentText) {
    const newLetters = alienLetters.filter(letter => letter !== '');
    // console.log(newLetters, currentText)

    let outputMessage = ''
    if (newLetters.length === 6 && new Set(newLetters).size === 6) {
      outputMessage = gradeWord(newLetters, currentText || '');
      // console.log("after gradeWord", outputMessage);
    } else {
      outputMessage = 'To grade this word, fill all letters with unique values';
    }
    document.getElementById("auto-grader-output").textContent = outputMessage;

  } //end of AutoGrade()


  function gradeWord(alienLetters, word) {
    if(!word) {
      return `Grade: 0`;
    }
  
    // Extract trust, amplify, and suspicion letters based on indices
    const trustLetters = alienLetters.slice(0, 3); // Indices 0, 1, 2
    const amplifyLetters = alienLetters.slice(3, 5); // Indices 3, 4
    const suspicionLetter = alienLetters[5]; // Index 5

    let trustCount = 0;
    let amplifyCount = 0;
    let suspicionCount = 0;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (trustLetters.includes(letter)) {
        trustCount += 1
      } else if (amplifyLetters.includes(letter)) {
        amplifyCount += 1
      } else if (letter === suspicionLetter) {
        suspicionCount = 1 // count doesn't matter; only if it exists or not
      }
    }

    let grade = 0;
    // Apply grading rules
    grade += trustCount; // Every instance of a trust letter adds 1 to the grade
    grade *= 2 ** amplifyCount; // Every instance of an amplify letter doubles the grade
    if (suspicionCount > 0) { // Any instance of the suspicion letter makes the grade negative
      grade *= -1;
    }
  
    // Return the grade as a message
    return `Grade: ${grade}`;
  } //end of gradeWord()


  return (
    <div id="auto-grader">
      <h3>Auto Grader</h3>
      <p>Word to Grade: </p>
      <input type="text" id="auto-grader-input" pattern="[a-z]"
      value={text} onInput = {handleInput}/>
      <span id="auto-grader-output"></span>
    </div>
  )
}

export default AutoGrader;