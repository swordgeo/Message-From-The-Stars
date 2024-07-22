

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.input-box');

  inputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
          const value = event.target.value;
          // Ensure only alphabetic characters are allowed
          if (!/^[A-Za-z]$/.test(value)) {
            event.target.value = '';
            return;
          }
          if (value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
          }
      });

      input.addEventListener('keydown', (event) => {
          if (event.key === 'Backspace' && index > 0 && !event.target.value) {
              inputs[index - 1].focus();
          }
      });
  });
});


// takes in letters from HTML, posts them to Flask function  and then displays the suggestions
function submitLetters() {
  const inputs = document.querySelectorAll('.input-box');
  const values = Array.from(inputs).map(input => input.value);
  console.log(values);
}


// does nothing but serve as guidance/example between JS and Flask
function doThing() {
  fetch('/do-thing', { method: 'POST' })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
          document.getElementById('example-js').textContent = data.example_js;
      });
}


// document.getElementById('decklistForm').addEventListener('submit', function(e) {
//   e.preventDefault(); // Prevents the default form submission

//   // Get the decklist value from the form
//   var decklist = this.elements['decklist'].value;

//   // Create an AJAX request to the /submit-decklist route
//   fetch('/submit-decklist', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: 'decklist=' + encodeURIComponent(decklist)
//   })
//   .then(response => response.json())
//   .then(data => {

//       // console.log(data);
//       // Update the page with the response data
//       // For example, update current_hand and deck display
//       document.getElementById('deck-length').textContent = data.deck_length;

//       // console.log(data.current_hand);

//       dealHand(data.current_hand);
//       // .textContent = data.current_hand;
//       // ... other DOM updates based on 'data.deck'
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// });
