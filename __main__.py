import http.client
import json

conn = http.client.HTTPSConnection("twinword-word-associations-v1.p.rapidapi.com")

headers = {
    'x-rapidapi-key': "83a7dc6a73msh32ae7d9530874bep17eeb6jsne96b7d24ddd8",
    'x-rapidapi-host': "twinword-word-associations-v1.p.rapidapi.com"
}

def get_word_associations(word):
  # Pass in the word in question, it will return a list of word associations that are graded by their alleged relation to the word in question. 
  # We can allow this to be a slight factor but the associative grading isn't that good IMO
  conn.request("GET", f"/associations/?entry={word}", headers=headers)

  res = conn.getresponse()
  data = res.read()

  decoded_data = data.decode("utf-8")
  parsed_json = json.loads(decoded_data)

  associations_scored = parsed_json["associations_scored"]
  # for word, score in associations_scored.items():
  #  print(f"{word}: {score}")

  return associations_scored
  # A dictionary list of two items apiece


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


def grade_word(word_associations, trust_letters, amplify_letters, suspicion_letter):
    graded_associations = []  # List to store the graded associations
    
    # Iterate through each association
    for assoc_word, score in word_associations.items():
        grade = 0  # Initialize the grade for this association
        
        # Count occurrences of trust, amplify, and suspicion letters
        trust_count = sum([assoc_word.count(letter) for letter in trust_letters])
        if trust_count == 0:
            continue # No trust letters means grade = 0; skip it
        amplify_count = sum([assoc_word.count(letter) for letter in amplify_letters])
        suspicion_count = assoc_word.count(suspicion_letter)
        
        # Apply grading rules
        grade += trust_count * 1  # Every instance of a trust letter adds 1 to the grade
        grade *= 2 ** amplify_count  # Every instance of an amplify letter doubles the grade
        if suspicion_count > 0:  # Any instance of the suspicion letter makes the grade negative
            grade *= -1
        
        # Calculate density
        density = (trust_count + amplify_count + suspicion_count) / len(assoc_word)
        
        # Store the original score, the associated word, the new grade, and the density
        graded_associations.append({
            "original_score": score,
            "associated_word": assoc_word,
            "new_grade": grade,
            "density": density,
            "weight": density*2 + score # the density should be most important; score is less than 1 so this reduces the score's contribution
        })
    
    # Sort graded_associations by 'weight' in descending order
    sorted_graded_associations = sorted(graded_associations, key=lambda x: x['weight'], reverse=True)

    return sorted_graded_associations


def get_words():
    collected_words = []  # List to store the successfully collected words
    
    while len(collected_words) < 3:
        # Prompt the user for a word
        word = input("Please enter a word: ")
        
        try:
            # Attempt to get word associations
            word_associations = get_word_associations(word)
            
            # If successful, add the word to the collected_words list
            collected_words.append((word, word_associations))
            
            # Optionally, print the associations to confirm success
            # print(f"Associations for '{word}': {word_associations}")
            
        except Exception as e:
            # Handle any exceptions raised by get_word_associations
            print(f"An error occurred while getting associations for '{word}'. Please try a different word.")
            print(e)  # Optionally, print the exception details for debugging
            
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
        sorted_graded_associations = sorted(graded_associations, key=lambda x: x['weight'], reverse=True)
        
        # Display the top 10 results for each original word
        print(f"\nOriginal Word: {original_word}")
        for i, item in enumerate(sorted_graded_associations[:15]):
            print(f"Rank {i+1}: Original Score: {item['original_score']:.2f}, Associated Word: {item['associated_word']}, New Grade: {item['new_grade']}, Density: {item['density']:.2f}, Weight: {item['weight']:.2f}") # With all the bells and whistles
            # print(f"Suggestion: {item['associated_word']}, Score: {item['new_grade']}")
        print("-" * 40)  # Separator line for readability



if __name__ == '__main__':
    main()