from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_session import Session
from dotenv import load_dotenv
# import sys
# # Add the path to the directory containing constants.py to sys.path
# # import constants

# python imports
import json
import os
import re

# logic imports
# import requests
# import random

load_dotenv()
app = Flask(__name__, template_folder="../templates", static_folder="../static")
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/')
def index():
    session['message'] = "Hello World"
    session['example-js'] = 1
    return render_template('index.html', message=session['message'])

# does nothing but serve as guidance/example between JS and Flask
@app.route('/do-thing', methods=['POST'])
def do_thing():
    session['example-js'] += 1

    return jsonify(example_js = session['example-js']
                   )

# @app.route('/submit-decklist', methods=['POST'])
# def submit_decklist():
#     decklist_str = request.form['decklist']
#     # print(decklist_str)
#     decklist = parse_decklist(decklist_str)
#     # print(decklist)
#     # Split the decklist into chunks and fetch images for each chunk
#     deck_chunks = split_into_chunks(decklist)
#     full_deck = []
#     for chunk in deck_chunks:
#         chunk_with_images = fetch_card_images(chunk)
#         full_deck.extend(chunk_with_images)  # Combine the results
#     # full_deck now contains the combined results of all chunks
#     # print(full_deck)
#     session['deck'] = full_deck
#     session['current_hand'] = shuffle_and_deal(full_deck)
#     session['deck_length'] = len(full_deck)

#     # print(session['current_hand'])

#     # return 'Decklist submitted'
#     return jsonify(current_hand=session['current_hand'], 
#                    deck_length=session['deck_length']


#                     
if __name__ == '__main__':
    app.run(debug=True, port=3000)