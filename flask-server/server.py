from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_session import Session
from dotenv import load_dotenv
from flask_cors import CORS
# import sys
# # Add the path to the directory containing constants.py to sys.path
# # import constants

# python imports
import os


# logic imports
# import requests
# import random

# file imports
from logic.alien import produce_suggestions # produce_suggestions

load_dotenv()
app = Flask(__name__, template_folder="../src", static_folder="../frontend/src/index.js")
CORS(app)  # Apply CORS to all routes
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)



# @app.route('/')
# def index():
#     session['message'] = "Hello World"
#     session['example-js'] = 1
#     # return render_template('index.html', message=session['message'])


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return "Not Found", 404


@app.route('/get-suggestions', methods=['POST'])
def get_suggestions():
    print("hello")
    letters_str = request.form['letters']
    words_str = request.form['words']
    print("Received")
    print(letters_str)
    print(words_str)
    

    try:
        final_suggestions = produce_suggestions(letters_str, words_str)
        # print(final_suggestions)
        # final_suggestions = {'poop': [{'suggestion': 'turd', 'grade': -3, 'density': 1.0}, {'suggestion': 'dirt', 'grade': -2, 'density': 0.75}, {'suggestion': 'shit', 'grade': 4, 'density': 0.75}, {'suggestion': 'shite', 'grade': 4, 'density': 0.6}, {'suggestion': 'stern', 'grade': -2, 'density': 0.6}, {'suggestion': 'quarter', 'grade': -2, 'density': 0.5714285714285714}, {'suggestion': 'digest', 'grade': 4, 'density': 0.5}, {'suggestion': 'dung', 'grade': 2, 'density': 0.5}, {'suggestion': 'sludge', 'grade': 4, 'density': 0.5}, {'suggestion': 'nutrient', 'grade': -3, 'density': 0.5}, {'suggestion': 'urinary', 'grade': -1, 'density': 0.42857142857142855}, {'suggestion': 'waste', 'grade': 2, 'density': 0.4}, {'suggestion': 'filth', 'grade': 2, 'density': 0.4}, {'suggestion': 'sweat', 'grade': 2, 'density': 0.4}, {'suggestion': 'mulch', 'grade': 2, 'density': 0.4}, {'suggestion': 'disposal', 'grade': 4, 'density': 0.375}, {'suggestion': 'manure', 'grade': -1, 'density': 0.3333333333333333}, {'suggestion': 'toilet', 'grade': 2, 'density': 0.3333333333333333}, {'suggestion': 'aft', 'grade': 1, 'density': 0.3333333333333333}, {'suggestion': 'digestion', 'grade': 4, 'density': 0.3333333333333333}, {'suggestion': 'secretion', 'grade': -2, 'density': 0.3333333333333333}, {'suggestion': 'fertilizer', 'grade': -1, 'density': 0.3}, {'suggestion': 'forecastle', 'grade': -2, 'density': 0.3}, {'suggestion': 'excrete', 'grade': -1, 'density': 0.2857142857142857}, {'suggestion': 'compost', 'grade': 2, 'density': 0.2857142857142857}, {'suggestion': 'consumption', 'grade': 4, 'density': 0.2727272727272727}, {'suggestion': 'deck', 'grade': 1, 'density': 0.25}, {'suggestion': 'peat', 'grade': 1, 'density': 0.25}, {'suggestion': 'tail', 'grade': 1, 'density': 0.25}, {'suggestion': 'dope', 'grade': 1, 'density': 0.25}, {'suggestion': 'excretion', 'grade': -1, 'density': 0.2222222222222222}, {'suggestion': 'excrement', 'grade': -1, 'density': 0.2222222222222222}, {'suggestion': 'ingestion', 'grade': 2, 'density': 0.2222222222222222}, {'suggestion': 'evacuation', 'grade': 2, 'density': 0.2}, {'suggestion': 'low-down', 'grade': 1, 'density': 0.125}, {'suggestion': 'eliminate', 'grade': 1, 'density': 0.1111111111111111}], 'blood': [{'suggestion': 'pressure', 'grade': -4, 'density': 0.625}, {'suggestion': 'serum', 'grade': -2, 'density': 0.6}, {'suggestion': 'artery', 'grade': -1, 'density': 0.5}, {'suggestion': 'roue', 'grade': -1, 'density': 0.5}, {'suggestion': 'erythrocyte', 'grade': -4, 'density': 0.45454545454545453}, {'suggestion': 'transfusion', 'grade': -8, 'density': 0.45454545454545453}, {'suggestion': 'jugular', 'grade': -2, 'density': 0.42857142857142855}, {'suggestion': 'disease', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'descent', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'stock', 'grade': 2, 'density': 0.4}, {'suggestion': 'arterial', 'grade': -1, 'density': 0.375}, {'suggestion': 'ancestry', 'grade': -2, 'density': 0.375}, {'suggestion': 'bloodstream', 'grade': -4, 'density': 0.36363636363636365}, {'suggestion': 'cardiovascular', 'grade': -4, 'density': 0.35714285714285715}, {'suggestion': 'venous', 'grade': 2, 'density': 0.3333333333333333}, {'suggestion': 'stemma', 'grade': 2, 'density': 0.3333333333333333}, {'suggestion': 'glucose', 'grade': 2, 'density': 0.2857142857142857}, {'suggestion': 'histocompatibility', 'grade': 12, 'density': 0.2777777777777778}, {'suggestion': 'clot', 'grade': 1, 'density': 0.25}, {'suggestion': 'antibody', 'grade': 2, 'density': 0.25}, {'suggestion': 'pedigree', 'grade': -1, 'density': 0.25}, {'suggestion': 'leukocyte', 'grade': 2, 'density': 0.2222222222222222}, {'suggestion': 'coagulate', 'grade': 2, 'density': 0.2222222222222222}, {'suggestion': 'lymphatic', 'grade': 2, 'density': 0.2222222222222222}, {'suggestion': 'parentage', 'grade': -1, 'density': 0.2222222222222222}, {'suggestion': 'lipid', 'grade': 1, 'density': 0.2}, {'suggestion': 'profligate', 'grade': -1, 'density': 0.2}, {'suggestion': 'coagulation', 'grade': 2, 'density': 0.18181818181818182}, {'suggestion': 'antigen', 'grade': 1, 'density': 0.14285714285714285}, {'suggestion': 'bloodline', 'grade': 1, 'density': 0.1111111111111111}], 'cat': [{'suggestion': 'rat', 'grade': -1, 'density': 0.6666666666666666}, {'suggestion': 'retch', 'grade': -2, 'density': 0.6}, {'suggestion': 'rodent', 'grade': -2, 'density': 0.5}, {'suggestion': 'deer', 'grade': -1, 'density': 0.5}, {'suggestion': 'quat', 'grade': 2, 'density': 0.5}, {'suggestion': 'cast', 'grade': 2, 'density': 0.5}, {'suggestion': 'spue', 'grade': 2, 'density': 0.5}, {'suggestion': 'khat', 'grade': 2, 'density': 0.5}, {'suggestion': 'regurgitate', 'grade': -3, 'density': 0.45454545454545453}, {'suggestion': 'cheetah', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'pouched', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'upchuck', 'grade': 4, 'density': 0.42857142857142855}, {'suggestion': 'tiger', 'grade': -1, 'density': 0.4}, {'suggestion': 'mouse', 'grade': 2, 'density': 0.4}, {'suggestion': 'purge', 'grade': -1, 'density': 0.4}, {'suggestion': 'chuck', 'grade': 2, 'density': 0.4}, {'suggestion': 'anteater', 'grade': -2, 'density': 0.375}, {'suggestion': 'disgorge', 'grade': -2, 'density': 0.375}, {'suggestion': 'marsupial', 'grade': -2, 'density': 0.3333333333333333}, {'suggestion': 'rabbit', 'grade': -1, 'density': 0.3333333333333333}, {'suggestion': 'pachyderm', 'grade': -2, 'density': 0.3333333333333333}, {'suggestion': 'guy', 'grade': 1, 'density': 0.3333333333333333}, {'suggestion': 'qat', 'grade': 1, 'density': 0.3333333333333333}, {'suggestion': 'kat', 'grade': 1, 'density': 0.3333333333333333}, {'suggestion': 'leopard', 'grade': -1, 'density': 0.2857142857142857}, {'suggestion': 'Caterpillar', 'grade': -1, 'density': 0.2727272727272727}, {'suggestion': 'tail', 'grade': 1, 'density': 0.25}, {'suggestion': 'ringtail', 'grade': -1, 'density': 0.25}, {'suggestion': 'elephant', 'grade': 2, 'density': 0.25}, {'suggestion': 'puke', 'grade': 1, 'density': 0.25}, {'suggestion': 'panda', 'grade': 1, 'density': 0.2}, {'suggestion': 'vomit', 'grade': 1, 'density': 0.2}, {'suggestion': "cat-o'-nine-tails", 'grade': 4, 'density': 0.17647058823529413}, {'suggestion': 'coyote', 'grade': 1, 'density': 0.16666666666666666}]}
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
    app.run(debug=True, port=5000)