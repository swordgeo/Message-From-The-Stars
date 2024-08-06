import constants
# import recursive
import answer_key
import copy


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



def generate_unique_combinations(possibleLetters, currentCombination=[], categoriesUsed=set(), rareUsed=False): #variables exist as arguments for recursive function
    # from all present possibleLetters we will construct every possible legal combination of puzzleLetters 
 
    if len(currentCombination) == len(possibleLetters):  # Base case: a complete combination is formed
        # Keep the first trust letter in place, sort the second and third
        sortedTrustLetters = [currentCombination[0]] + sorted(currentCombination[1:3])
        # Combine the sorted second and third trust letters with the first and the rest of the combination
        sortedCombination = sortedTrustLetters + currentCombination[3:]
        # I no longer remember why I'm tupling this but things get mad otherwise
        yield tuple(sortedCombination)
        return

    for letter in possibleLetters[len(currentCombination)]:
        if letter not in categoriesUsed:
            # Check if the letter is rare and if a rare letter has already been used
            if letter in constants.RARE_LETTERS and rareUsed:
                continue  # Skip this letter if a rare letter has already been used
            elif letter in constants.RARE_LETTERS:
                # If a rare letter is being considered and no rare letter has been used yet, mark rareUsed as True
                newRareUsed = True
            else:
                newRareUsed = rareUsed  # Keep the existing rareUsed state if not adding a rare letter
            
            categoriesUsed.add(letter)
            # Recursively generate combinations with the updated state
            yield from generate_unique_combinations(possibleLetters, currentCombination + [letter], categoriesUsed, newRareUsed)
            categoriesUsed.remove(letter)  # Backtrack by removing the letter from the used set


def evaluate_combinations(wordGroup, combinations):
    # we test each combination against our word group, rescoring each wordGroup word against the predefined scores

    potentially_correct_combinations = []
    
    for combination in combinations:
        match = True
        for word, predefined_score in wordGroup.items():
            # Score the word with the current combination
            rescore = answer_key.score_word(word, combination)
            if rescore != predefined_score:
                match = False
                break  # No need to score more words if one doesn't match
        if match:
            potentially_correct_combinations.append(combination)
    
    return potentially_correct_combinations


def remove_unrepresented_letters(possibleLetters, combinations):
    # for each array(a) in possibleLetters:
      # for each letter in possibleLetters : (maybe copy the list first to avoid sliding indexes)
        # for combination in every combination we've got: (sweet Jesus the lack of efficiency!)
        # keep = false
          # if letter = combination[a]:
            # keep = true
            # continue/break/bail out
        # if keep == false:
          # kill the letter from possibleLetters real array

    # the better way would be to, for every combination, add to a new possibleLetters array so we're only checking every combination one time instead of six
    # then for each possibleLetters we remove if not found in new array

    # sets apparently automatically ensure uniqueness of elements - that is, no appended duplicate letters
    newArray = [set() for _ in range(len(possibleLetters))]
    for combination in combinations:
        # for i in len(combination):
        #     newArray[i].append(combination[i])
        for i, letter in enumerate(combination):
            newArray[i].add(letter) # append for sets
    newArray = [list(subarray) for subarray in newArray] # convert back to lists

    # now kill off from possibleLetters what isn't found in newArray
    possibleCopy = copy.deepcopy(possibleLetters)
    for i, letterGroup in enumerate(possibleLetters):
        for letter in letterGroup:
            if letter not in newArray[i]:
                possibleCopy[i].remove(letter)
    return possibleCopy




# THIS IS THE MAIN SOLVE FUNCTION
def solveWordGroup(wordGroup):
  print(wordGroup)
  possibleLetters = initPossiblePuzzleLetters()
  for word, score in wordGroup.items():
       process_word(word, score, possibleLetters)
  print("After first logical pass, starting possible letters:")
  prettyPrintPossiblePuzzleLetters(possibleLetters)

  current_possible_combinations = generate_unique_combinations(possibleLetters)
  plausible_combinations = evaluate_combinations(wordGroup, current_possible_combinations)
  # Remove duplicates by converting to a set and back to a list
  distinct_combinations = list(set(plausible_combinations))
  print("Currently possible answers")
  print(distinct_combinations)

  possibleLetters = remove_unrepresented_letters(possibleLetters, distinct_combinations)
  print("Current possible letters")
  prettyPrintPossiblePuzzleLetters(possibleLetters)
  
  # it's a flood
  return "no idea lol"





# Call the solve function
print(f"Solution: {solveWordGroup(answer_key.scored_word_group_3)}")
# print(f"answer key: {answer_key.answer_key_6}")