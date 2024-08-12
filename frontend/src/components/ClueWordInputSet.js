import React, { useState } from 'react';
import ClueWordInput from './ClueWordInput';

function WordInputSet() {
  const [wordData, setWordData] = useState({});

  const handleWordChange = (id, word, number) => {
    setWordData((prevData) => ({
      ...prevData,
      [id]: { word, number },
    }));
  };

  const handleSubmit = () => {
    const formattedData = Object.values(wordData).reduce((acc, { word, number }) => {
      if (word) {
        acc[word] = number;
      }
      return acc;
    }, {});

    // Perform the fetch request here
    fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="word-input-set">
      {[...Array(8)].map((_, index) => (
        <ClueWordInput key={index} id={`word${index}`} onChange={handleWordChange} />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default WordInputSet;
