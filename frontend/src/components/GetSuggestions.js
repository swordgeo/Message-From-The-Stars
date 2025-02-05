import { useState, useEffect } from 'react';


function UseGetSuggestions(fetchTrigger, letters, words, setIsLoading, setError) {
    const [data, setData] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL;

    // Return the promise from fetch
    useEffect(() => {
      if (!fetchTrigger || letters.length === 0 || words.length === 0) return;

      setIsLoading(true);
      setError(null);

      const encodedLetters = letters.join(',');
      const encodedWords = words.join(',');
      console.log("Beginning fetch")

      fetch(`${API_URL}/get-suggestions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `letters=${encodeURIComponent(encodedLetters)}&words=${encodeURIComponent(encodedWords)}`
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
  // }, [letters, words, API_URL, setIsLoading, setError]);
  }, [fetchTrigger]); // Only run when fetchTrigger changes


      return data;
}

export default UseGetSuggestions;