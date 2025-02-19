import http.client
import json
from openai import OpenAI
import os

from dotenv import load_dotenv
load_dotenv()

client = OpenAI()

ass_conn = http.client.HTTPSConnection("twinword-word-associations-v1.p.rapidapi.com")
syn_conn = http.client.HTTPSConnection("languagetools.p.rapidapi.com")

ass_headers = {
    'x-rapidapi-key': "83a7dc6a73msh32ae7d9530874bep17eeb6jsne96b7d24ddd8",
    'x-rapidapi-host': "twinword-word-associations-v1.p.rapidapi.com"
}

syn_headers = {
    'x-rapidapi-key': "83a7dc6a73msh32ae7d9530874bep17eeb6jsne96b7d24ddd8",
    'x-rapidapi-host': "languagetools.p.rapidapi.com"
}

def get_word_associations(keyword):
  # Pass in the word in question, it will return a list of word associations that are graded by their alleged relation to the word in question. 
  # We can allow this to be a slight factor but the associative grading isn't that good IMO
  try:
      
    ass_conn.request("GET", f"/associations/?entry={keyword}", headers=ass_headers)
    res = ass_conn.getresponse()
    data = res.read()

    decoded_data = data.decode("utf-8")
    parsed_json = json.loads(decoded_data)

    associations_scored = parsed_json.get("associations_scored", {})
    if not associations_scored:
      return []
    ass_array = [word for word, score in associations_scored.items()]
    return ass_array
  except Exception as e:
    print(f"An error occurred while getting associations for '{keyword}'. Error: {str(e)}")
    return []
  # A dictionary list of two items apiece


def get_synonyms(word):
  # Pass in the word in question, it will return a list of word associations that are graded by their alleged relation to the word in question. 
  # We can allow this to be a slight factor but the associative grading isn't that good IMO
  try:
    syn_conn.request("GET", f"/synonyms/{word}", headers=syn_headers)
    res = syn_conn.getresponse()
    data = res.read()
    decoded_data = data.decode("utf-8")
    parsed_json = json.loads(decoded_data)
    synonyms_list = parsed_json.get('synonyms', [])
    return synonyms_list
    # A dictionary list of two items apiece
  except Exception as e:
    print(f"An error occurred while getting synonyms for '{word}'. Error: {str(e)}")
    return []


def get_chatgpt_suggestions(word):
  prompt = f"""Come up with a list of single English words that would help a human playing a game guess the word I provide. Each word must stand alone as a helpful clue as only one will be chosen. Synonyms, word associations, and related words are preferred. You must suggest only real English words and only single words are allowed.
  Answer as a comma separated list of 40 words without spaces.

  The provided word is: {word}"""

  # prompt = f"""Come up with a list of single English words that would help a human playing a game guess the word I provide. Each word must stand alone as a helpful clue as only one will be chosen. Synonyms, word associations, and related words are preferred. You must suggest only real English words and only single words are allowed. Using my provided letters as much as possible is preffered, but your clue must still relate meaningfully to my provided word. Please use each letter at least once among all suggestions.
  # Answer as a comma separated list of 25 words without spaces.

  # The provided word is: {word}
  # The provided letters are: {letters}"""

  completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
      {"role": "system", "content": "You are an assistant helping to provide clue words for a game."},
      {"role": "user", "content": prompt}
    ]
  )

  gpt_words_str = completion.choices[0].message.content
  words = gpt_words_str.split(',')
  print(words)
  return words


def get_letters():
    # Initialize lists to store unique letters for each group
    while True:
        # Prompt the user for input
        input_string = input("Enter your trust, amplify, and suspicion letters in order without spaces. Ex. 'TTTAAS' > ")
        
        # Ensure the input is exactly 6 characters long
        if len(input_string)!= 6:
            print(len(input_string))
            continue
        
        # Assign the first three letters to 'trust', the next two to 'amplify', and the last one to 'suspicion'
        trust_letters = list(input_string[:3])
        amplify_letters = list(input_string[3:5])
        suspicion_letter = input_string[5]
        
        # Check for uniqueness within each group and between 'suspicion' and the other groups
        if len(set(trust_letters)) == 3 and len(set(amplify_letters)) == 2 and suspicion_letter not in trust_letters + amplify_letters:
            break
        else:
            print("Invalid input. All letters must be unique. Try again.")
    
    # print("Trust letters:", trust_letters)
    # print("Amplify letters:", amplify_letters)
    # print("Suspicion letter:", suspicion_letter)
    return trust_letters, amplify_letters, suspicion_letter


def grade_word(test_words, trust_letters, amplify_letters, suspicion_letter):
    graded_associations = []  # List to store the graded associations
    
    # Iterate through each association
    for _word in test_words:
        word = _word.strip()
        if ' ' in word:
            continue  # Skip entries with spaces
        
        if any(assoc['suggestion'] == word for assoc in graded_associations):
            continue  # Skip duplicate entries

        grade = 0  # Initialize the grade for this association
        
        # Count occurrences of trust, amplify, and suspicion letters
        trust_count = sum([word.count(letter) for letter in trust_letters])
        if trust_count == 0:
            continue # No trust letters means grade = 0; skip it
        
        amplify_count = sum([word.count(letter) for letter in amplify_letters])
        suspicion_count = word.count(suspicion_letter)
        
        # Apply grading rules
        grade += trust_count * 1  # Every instance of a trust letter adds 1 to the grade
        grade *= 2 ** amplify_count  # Every instance of an amplify letter doubles the grade
        if suspicion_count > 0:  # Any instance of the suspicion letter makes the grade negative
            grade *= -1
        
        # Calculate density
        density = (trust_count + amplify_count + suspicion_count) / len(word)
        
        # Store the original score, the associated word, the new grade, and the density
        graded_associations.append({
            "suggestion": word,
            "grade": grade,
            "density": density,
        })
    
    # Sort graded_associations by 'weight' in descending order
    sorted_word_suggestions = sorted(graded_associations, key=lambda x: x['density'], reverse=True)

    return sorted_word_suggestions


def get_words():
    collected_words = []  # List to store the successfully collected words
    
    while len(collected_words) < 3:
        # Prompt the user for a word
        word = input("Please enter a word: ")
        
        try:
            # Attempt to get word associations
            word_associations = get_word_associations(word)
            word_synonyms = get_synonyms(word)
            
            # If successful, add the word to the collected_words list
            collected_words.append((word, word_associations+word_synonyms))
            
            # Optionally, print the associations to confirm success
            # print(f"Associations for '{word}': {word_associations}")
            
        except Exception as e:
            # Handle any exceptions raised by get_word_associations
            print(f"An error occurred while getting associations for '{word}'. Please try a different word.")
            print(e)  # Optionally, print the exception details for debugging
    print(collected_words)
    return collected_words


def main():
    # Get the trust, amplify, and suspicion letters
    trust_letters, amplify_letters, suspicion_letter = get_letters()
    
    # Collect words and their associations
    collected_words = get_words()
    
    # Prepare a dictionary to store the graded associations for each word
    word_to_graded_associations = {}
    
    # Loop through each word and its associations
    for word, associations in collected_words:
        # Grade the associations for the current word
        graded_associations = grade_word(associations, trust_letters, amplify_letters, suspicion_letter)
        
        # Group the graded associations by the original word
        word_to_graded_associations[word] = graded_associations
    
    # Sort the graded associations for each word by 'weight' in descending order
    for original_word, graded_associations in word_to_graded_associations.items():
        sorted_graded_associations = sorted(graded_associations, key=lambda x: x['density'], reverse=True)
        
        # Display the top 10 results for each original word
        print(f"\nOriginal Word: {original_word}")
        for i, item in enumerate(sorted_graded_associations[:25]):
            print(f"Rank {i+1}: Suggested Word: {item['suggestion']}, Grade: {item['grade']}, Density: {item['density']:.2f}") # With all the bells and whistles
            # print(f"Suggestion: {item['suggestion']}, Score: {item['grade']}")
        print("-" * 40)  # Separator line for readability



# From this space forward we are refactoring necessary functions for the frontend interface

# main() changed to work well with frontend
def produce_suggestions(letters_str, words_str):
    # Get the trust, amplify, and suspicion letters
    trust_letters, amplify_letters, suspicion_letter = process_letters(letters_str)
    
    # let's test some bad values
    # Collect words and their associations
    collected_words = process_words(words_str)
    # collected_words = process_words("cat,dog,leedle")
    
    # Prepare a dictionary to store the graded associations for each word
    word_to_graded_associations = {}
    
    # Loop through each word and its associations
    for word, associations in collected_words:
        # Grade the associations for the current word
        graded_associations = grade_word(associations, trust_letters, amplify_letters, suspicion_letter)
        
        # Group the graded associations by the original word
        word_to_graded_associations[word] = graded_associations
    
    # print("")
    # print(word_to_graded_associations)
    return word_to_graded_associations


    
        
        


def process_letters(letters_str):
    letters_str=letters_str.replace(",","")
    print(f"after trim {letters_str}")
    # Confirm the input string length is exactly 6 characters
    if len(letters_str) != 6:
        raise ValueError("Input must contain exactly 6 characters.")

    # Convert the string to a set to remove duplicates and check uniqueness
    unique_letters = set(letters_str)
    if len(unique_letters) != 6:
        raise ValueError("All letters must be unique.")

    # Categorize the letters based on their positions
    trust_letters = letters_str[:3]
    amplify_letters = letters_str[3:5]
    suspicion_letter = letters_str[5]

    return trust_letters, amplify_letters, suspicion_letter


def process_words(words_str):
    collected_words = []  # List to store the successfully collected words
    words = words_str.split(',')

    for word in words:
        # Two separate API calls
        chatgpt_suggestions = get_chatgpt_suggestions(word)
        # synonym_suggestions = get_synonyms(word) # we might keep this one out - it's suggestions are just bad
        association_suggestions = get_word_associations(word)
        # If successful, add the word to the collected_words list
        # collected_words.append((word, word_associations+word_synonyms))
        
        collected_words.append((word, chatgpt_suggestions + association_suggestions))
        # Optionally, print the associations to confirm success
        # print(f"Associations for '{word}': {word_associations}")
            
    # print(collected_words)
    return collected_words

if __name__ == '__main__':
    print(produce_suggestions("p,e,x,i,y,r", "robes"))
