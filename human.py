import constants
import recursive
import answer_key

def initPossiblePuzzleLetters():
    possiblePuzzleLetters = []

    for puzzleLetter in constants.PUZZLE_LETTERS:
        # determine which rarity lists to consider
        validRarities = puzzleLetter["valid_rarities"]

        # create a list of all letters of the valid rarities.
        possiblePuzzleLetters.append(list(dict(filter(lambda x: x[1] in validRarities, constants.ALL_LETTERS.items())).keys()))
    return possiblePuzzleLetters


def prettyPrintPossiblePuzzleLetters(possiblePuzzleLetters):
    for idx, puzzleLetter in enumerate(constants.PUZZLE_LETTERS):
        letterCategory = puzzleLetter["category"]
        sortedPuzzleLetters = possiblePuzzleLetters[idx].copy()
        sortedPuzzleLetters.sort()

        print(f"{letterCategory.name} {idx}: ")
        print(sortedPuzzleLetters)

def process_word(word, score, possiblePuzzleLetters):
    word = word.upper()

    if score > 0:  # positive
            # remove all present letters from suspicion
            letters_to_remove = set(word)
            possiblePuzzleLetters[5] = [letter for letter in possiblePuzzleLetters[5] if letter not in letters_to_remove]
            # ungrade_word()
    elif score < 0:  # negative
            # remove all NON-present letters from suspicion
            letters_to_keep = set(word)
            possiblePuzzleLetters[5] = [letter for letter in possiblePuzzleLetters[5] if letter in letters_to_keep]
            # ungrade_word()
    else: # grade 0
         # remove all present letters from trust
         letters_to_remove = set(word)
         possiblePuzzleLetters[0] = [letter for letter in possiblePuzzleLetters[0] if letter not in letters_to_remove]
         possiblePuzzleLetters[1] = [letter for letter in possiblePuzzleLetters[1] if letter not in letters_to_remove]
         possiblePuzzleLetters[2] = [letter for letter in possiblePuzzleLetters[2] if letter not in letters_to_remove]


    # return possiblePuzzleLetters
    # no need, let's allow the Python array pointer bug to be our feature

# possiblePuzzleLetters = initPossiblePuzzleLetters()
# graded_word = {"shithead": 16}

# process_word(graded_word, possiblePuzzleLetters)
# print(possiblePuzzleLetters[5])

# word_two = {"turd": -3}
# process_word(word_two, possiblePuzzleLetters)
# print(possiblePuzzleLetters[5])

# word_three = {"uncopyrightable": 0}
# process_word(word_three, possiblePuzzleLetters)
# print(possiblePuzzleLetters[0])
# print(possiblePuzzleLetters[1])
# print(possiblePuzzleLetters[2])
# prettyPrintPossiblePuzzleLetters(generatePossiblePuzzleLetters())


# THIS IS THE MAIN SOLVE FUNCTION
def solveWordGroup(wordGroup):
  possibleLetters = initPossiblePuzzleLetters()
  for word, score in wordGroup.items():
       process_word(word, score, possibleLetters)
  #print(wordGroup) 
  prettyPrintPossiblePuzzleLetters(possibleLetters)
  return "no idea lol"

print(solveWordGroup(answer_key.scored_word_group_1))
print(f"answer key: {answer_key.answer_key_1}")