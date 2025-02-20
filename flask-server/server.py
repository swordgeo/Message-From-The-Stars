from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

# python imports
import os
import re
import sys
import traceback

# file imports
# file imports
try:
    from logic.alien import produce_suggestions
    from logic.human import produce_valid_letters
    print("Successfully imported logic modules")
except Exception as e:
    print(f"Error importing logic modules: {str(e)}")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Python path: {sys.path}")
    print(f"Directory contents: {os.listdir('.')}")
    if os.path.exists('logic'):
        print(f"Logic directory contents: {os.listdir('logic')}")
    traceback.print_exc()

load_dotenv()
# app = Flask(__name__, template_folder="../src", static_folder="../frontend/src/index.js")
app = Flask(__name__)
CORS(app)  # Apply CORS to all routes


@app.route('/api/get-suggestions', methods=['POST'])
def get_suggestions():
    try:
      letters_str = request.form.get('letters', '')
      words_str = request.form.get('words', '')
      print(letters_str)
      print(words_str)
    
      final_suggestions = produce_suggestions(letters_str, words_str)
      # final_suggestions = {'poop': [{'suggestion': 'turd', 'grade': -3, 'density': 1.0}, 'blood': [{'suggestion': 'pressure', 'grade': -4, 'density': 0.625}, {'suggestion': 'artery', 'grade': -1, 'density': 0.5}], 'cat': [{'suggestion': 'cheetah', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'tiger', 'grade': -1, 'density': 0.4}]}
      print(final_suggestions)
      return jsonify(suggestions = final_suggestions)
    except ValueError as e:
      print(f"Error in get-suggestions: {str(e)}")
      traceback.print_exc()
      return jsonify(error=str(e), trace=traceback.format_exc()), 500
    

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
        print("Processed data:", processed_data)

        if not processed_data:  # If no valid words remain, return empty result
            print("Only invalid words; bailing")
            return jsonify({'possible_letters': [], 'distinct_combinations': []})
        
        # Check if possible_letters_data has any empty lists
        has_empty_list = (
            isinstance(possible_letters_data, list) and 
            any(isinstance(sublist, list) and len(sublist) == 0 
                for sublist in possible_letters_data)
        )

        # pass to human scripts
        if possible_letters_data is None or has_empty_list:
          possible_letters, distinct_combinations = produce_valid_letters(processed_data)
        else:
          possible_letters, distinct_combinations = produce_valid_letters(processed_data, possible_letters_data)
        
        # Return the processed data as a JSON response
        return jsonify({
          'possible_letters': possible_letters,
          'distinct_combinations': distinct_combinations
        })
    except Exception as e:
        print(f"Error in process-clues: {str(e)}")
        traceback.print_exc()
        return jsonify(error=str(e), trace=traceback.format_exc()), 500
    

@app.route('/api/test', methods=['GET'])
def test():
    try:
        return jsonify({"message": "Backend is working!", "cwd": os.getcwd(), "files": os.listdir('.')})
    except Exception as e:
        return jsonify({"error": str(e), "trace": traceback.format_exc()}), 500


# Only for local development
if __name__ == '__main__':
  app.run(debug=True, port=5000)