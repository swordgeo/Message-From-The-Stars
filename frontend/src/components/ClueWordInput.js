// ClueWordInput.js

function ClueWordInput({ humanWord, humanGrade, onWordChange, onGradeChange, placeholder = "Enter word" }) {

  const handleGradeChange = (e) => {
    const input = e.target.value;
    // Allow zero, empty input or a single "-" (preparing to enter negative number)
    if (input === '0' || input === '' || input === '-') {
      onGradeChange(input);
    } else {
      const parsed = parseInt(input, 10);
      if (!isNaN(parsed)) {
        onGradeChange(parsed);
      }
    }
  };

  return (
    <div className="row mb-2">
      <div className="col-8">
        <input 
          value={humanWord || ''} 
          onChange={e => onWordChange(e.target.value)}
          type="text" 
          maxLength="20" 
          className="form-control clue-word-input-box" 
          pattern="[a-z]{20}" 
          placeholder={placeholder}
        />
      </div>
      <div className="col-4">
        <input 
          value={humanGrade || ''} 
          onChange={handleGradeChange}
          type="text"
          className="form-control clue-grade-input-box"
          placeholder="Grade"
        />
      </div>
    </div>
  );
};

export default ClueWordInput;