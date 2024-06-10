import constants
# axioms
# if the score is odd, there cannot be amplify letters
## the amount of times the score can be factored by 2 is the maximum amount of trust letters


# if the score > 0 (positive):
  # Remove all present letters from consideration of SUSPICION
  # proceed with main function
# elif score < 0 (negative):
  # Remove all letters not present from consideration of SUSPICION
  # proceed with main function
# else (score == 0):
  # Remove all letter present from consideration of TRUST



# How does the main function proceed? At random?
# Of all the letters that are currently in the running for each category, brute force by applying every possible combination of available letters and find the configurations that are valid?
# Ton of combinations to go through, especially at the beginning, but that is one possible option.



# try to find all possible combinations of trust/amplify letters
# 2 TT / TA
# 4 TTTT/ TTA/TAA
# 6 TTTA
# 8 TTTTTTTT / TTTTA/ TTAA TAAA
# 10 10T / 5T1A

# when processing, dissect the word into an array of letters/counts
# a x 2


def generatePossiblePuzzleLetters():
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




prettyPrintPossiblePuzzleLetters(generatePossiblePuzzleLetters())

