import constants
import random

answer_key_1 = ['E', 'D', 'B', 'I', 'V', 'F']
answer_key_2 = ['S', 'F', 'M', 'L', 'D', 'Q']
answer_key_3 = ['S', 'U', 'B', 'E', 'F', 'W']
answer_key_4 = ['T', 'M', 'X', 'L', 'G', 'E']
answer_key_5 = ['L', 'G', 'J', 'A', 'F', 'Y']
answer_key_6 = ['T', 'U', 'D', 'S', 'H', 'R']

words_to_score_key_1 = [
    'BEAVER',
    'FIVE',
    'DIVE',
    'DEED',
    'BUILD',
    'NUDE',
    'RECON',
    'FORTNIGHT',
]

words_to_score_key_2 = [
    'SHITHEAD',
    'TURD',
    'CREATE'
]


def generate_random_letters():
    randomLetters = []

    for puzzleLetter in constants.PUZZLE_LETTERS:
        # determine which rarity lists to consider
        validRarities = puzzleLetter["valid_rarities"]

        # only consider rare letters when no rare letters have been selected
        if constants.LetterRarity.RARE in validRarities:
            for randomLetter in randomLetters:
                if constants.ALL_LETTERS[randomLetter] == constants.LetterRarity.RARE:
                    validRarities.remove(constants.LetterRarity.RARE)
                    break

        # create a list of all letters of the valid rarities.
        possibleLetters =  list(dict(filter(lambda x: x[1] in validRarities, constants.ALL_LETTERS.items())).keys())

        # remove letters which have already been selected
        for randomLetter in randomLetters:
            if randomLetter in possibleLetters:
                possibleLetters.remove(randomLetter)

        # select a random letter
        randomLetter = random.choice(possibleLetters)
        randomLetters.append(randomLetter)

    print(randomLetters)


def score_word(word, letter_group):
    # count the number of trust/amplify/suspicion letters
    letterCount = {
        constants.LetterCategory.TRUST: 0,
        constants.LetterCategory.AMPLIFY: 0,
        constants.LetterCategory.SUSPICION: 0,
    }
    for idx, letter in enumerate(letter_group):
        category = constants.PUZZLE_LETTERS[idx]["category"]
        letterCount[category] += word.count(letter)

    # Apply grading rules
    score = 0
    score += letterCount[constants.LetterCategory.TRUST]  # Every instance of a trust letter adds 1 to the score
    score *= 2 ** letterCount[constants.LetterCategory.AMPLIFY]  # Every instance of an amplify letter doubles the score
    if letterCount[constants.LetterCategory.SUSPICION] > 0:  # Any instance of the suspicion letter makes the score negative
        score *= -1
    return score

def generate_scored_word_group(wordsToScore, answerKey):
    scoredWordGroup = {}
    for word in wordsToScore:
        scoredWordGroup[word] = score_word(word, answerKey)
    return scoredWordGroup

scored_word_group_1 = generate_scored_word_group(words_to_score_key_1, answer_key_1)
scored_word_group_2 = generate_scored_word_group(words_to_score_key_2, answer_key_6)
