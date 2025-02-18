import { useState, useEffect } from 'react';

function UseGetPossibleLetters(words = [], grades = [], setIsLoading, setError) {
  const [data, setData] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (words.length === 0 || grades.length === 0) return;

    let storedPossibleLetters = null;
    try {
      const stored = sessionStorage.getItem("possible_letters");
      storedPossibleLetters = stored ? JSON.parse(stored) : null;
      console.log("Retrieved from sessionStorage:", storedPossibleLetters);
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
      storedPossibleLetters = null;
    }

    // Combine words and grades into a single list of objects
    const combinedData = words.map((word, index) => ({
      word,
      grade: grades[index]
    })).filter(item => item.word); // Filter out items where word is null or empty

    const requestData = {
      wordsData: combinedData,
      possible_letters: storedPossibleLetters
    };

    // Encode the data as JSON
    const encodedData = JSON.stringify(requestData);

    console.log("Beginning fetch with combined data:", encodedData);

    fetch(`${API_URL}/process-clues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: encodedData
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data); // Log the fetched data
      setData(data); // Ensure we are setting the correct part of the response
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching possible letters:', error);
      setError(error);
      setIsLoading(false);
    });
  }, [words, grades, API_URL, setIsLoading, setError]);

  return data || { possible_letters: [], distinct_combinations: [] };
}

export default UseGetPossibleLetters;
