from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS

# python imports
import os

# file imports
from logic.alien import produce_suggestions # produce_suggestions

load_dotenv()
app = Flask(__name__, template_folder="../src", static_folder="../frontend/src/index.js")
CORS(app)  # Apply CORS to all routes
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "Not Found", 404


@app.route('/get-suggestions', methods=['POST'])
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
    

# does nothing but serve as guidance/example between JS and Flask
@app.route('/do-thing', methods=['POST'])
def do_thing():
    session['example-js'] += 1

    return jsonify(example_js = session['example-js']
                   )

               
if __name__ == '__main__':
    app.run(debug=True, port=5000)