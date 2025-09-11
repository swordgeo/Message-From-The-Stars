import { useState, useEffect } from 'react';


function UseGetSuggestions(fetchTrigger, alienLetters, alienWords, setIsLoading, setError) {
    const [data, setData] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    // Return the promise from fetch
    useEffect(() => {
      if (!fetchTrigger || alienLetters.length === 0 || alienWords.length === 0) return;

      setIsLoading(true);
      setError(null);

      const normalizedLetters = alienLetters.map(l => l.toLowerCase());
      const normalizedWords = alienWords.map(w => w.toLowerCase());

      const encodedLetters = normalizedLetters.join(',');
      const encodedWords = normalizedWords.join(',');
      console.log("Beginning fetch")

      fetch(`${API_URL}/get-suggestions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `alienLetters=${encodeURIComponent(encodedLetters)}&alienWords=${encodeURIComponent(encodedWords)}`
    })
    .then(response => response.json())
    .then(data => {
      console.log("Fetched data:", data); // Log the fetched data
      setData(data.suggestions); // Ensure we are setting the correct part of the response
    })
    .catch(error => {
      console.error('Error fetching suggestions:', error);
      setError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [fetchTrigger]); // Only run when fetchTrigger changes


      return data;
}

export default UseGetSuggestions;