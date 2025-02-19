from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from dotenv import load_dotenv
from flask_cors import CORS

# python imports
import os
import re

# file imports
from logic.alien import produce_suggestions
from logic.human import produce_valid_letters

load_dotenv()
# app = Flask(__name__, template_folder="../src", static_folder="../frontend/src/index.js")
app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://message-from-the-stars.vercel.app",  # production frontend; we'll have to change this if we get a domain name
            # have to change it in vercel.json too
            "http://localhost:3000"  # local development frontend
        ],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})


@app.route('/api/get-suggestions', methods=['POST'])
def get_suggestions():
    letters_str = request.form.get('letters', '')
    words_str = request.form.get('words', '')
    print(letters_str)
    print(words_str)
    try:
        final_suggestions = produce_suggestions(letters_str, words_str)
        # final_suggestions = {'poop': [{'suggestion': 'turd', 'grade': -3, 'density': 1.0}, {'suggestion': 'shit', 'grade': 4, 'density': 0.75}], 'blood': [{'suggestion': 'pressure', 'grade': -4, 'density': 0.625}, {'suggestion': 'artery', 'grade': -1, 'density': 0.5}], 'cat': [{'suggestion': 'cheetah', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'tiger', 'grade': -1, 'density': 0.4}]}
        print(final_suggestions)
        return jsonify(suggestions = final_suggestions)
    except ValueError as e:
        return jsonify(error=str(e)), 400
    

@app.route('/api/process-clues', methods=['POST'])
def process_clues():
    try:
        # Retrieve JSON data from the request
        data = request.get_json()
        
        # Print the received data for debugging
        print("Received data:", data)

        # At this point our data variable is now a two-parter
        # Received data: {'wordsData': [{'word': 'leedle', 'grade': '-12'}, {'word': 'pimple', 'grade': '6'}], 'possible_letters': []}
        # So we need to split it up first
        word_data = data.get("wordsData", [])  # Better to do it this way instead of word_data = data[0] in case the frontend ever flips them by accident
        possible_letters_data = data.get("possible_letters", [])

        if not word_data or not isinstance(word_data, list):  # Ensure word_data is a list
            return jsonify({'possible_letters': [], 'distinct_combinations': []})
        
        # Assuming data is a list of dictionaries with 'word' and 'grade' keys
        processed_data = {}
        for item in word_data:
            word = item.get('word', '').strip().upper()  # Remove spaces and convert to uppercase (original code uses uppercase)
            word = re.sub(r'[^A-Z]', '', word)  # Remove non-alphabetic characters

            grade = item.get('grade', '0')  # Default to '0' if missing
            try:
              grade = int(grade) # Convert to integer
            except ValueError:
              grade = 0

            if word:
              processed_data[word] = grade
        
        # Print the processed data for debugging
        # print("Processed data:", processed_data)

        if not processed_data:  # If no valid words remain, return empty result
            # print("Only invalid words; bailing")
            return jsonify({'possible_letters': [], 'distinct_combinations': []})

        # pass to human scripts
        if possible_letters_data is None:
          possible_letters, distinct_combinations = produce_valid_letters(processed_data)
        else:
          possible_letters, distinct_combinations = produce_valid_letters(processed_data, possible_letters_data)
        
        # Return the processed data as a JSON response
        return jsonify({
          'possible_letters': possible_letters,
          'distinct_combinations': distinct_combinations
        })
    except Exception as e:
        return jsonify(error=str(e)), 400


# Only for local development
if __name__ == '__main__':
  app.run(debug=True, port=5000)