import constants
from collections import Counter

def prettyPrintScoringSet(scoringSet):
    scoringStr = ""
    scoringStr += "T" * scoringSet[constants.LetterCategory.TRUST]
    scoringStr += "A" * scoringSet[constants.LetterCategory.AMPLIFY]
    scoringStr += "S" * scoringSet[constants.LetterCategory.SUSPICION]
    return scoringStr

def generatePossibleScoringSets(word, score):
    word = word.upper()
    possibleScoringSets  = []

    # maximum number of amplify letters is the number of times the score is divisible by 2
    maxNumberOfAmplifyLetters = 0

    recursiveScore = score
    while recursiveScore % 2 == 0:
        maxNumberOfAmplifyLetters += 1
        recursiveScore /= 2

    for numAmplifyLetters in range(0, maxNumberOfAmplifyLetters + 1):
        numTrustLetters = int(score / 2**numAmplifyLetters)
        scoringSet = {
            constants.LetterCategory.TRUST: numTrustLetters,
            constants.LetterCategory.AMPLIFY: numAmplifyLetters,
            constants.LetterCategory.SUSPICION: 1 if (score < 0) else 0
        }

        # declare scoring string (for logging purposes)
        scoringStr = prettyPrintScoringSet(scoringSet)

        # check scoring sets for impossible situations
        isPossible = True

        # ensure the number of scoring letters does not exceed the word length
        if len(word) <= (
            scoringSet[constants.LetterCategory.TRUST] + 
            scoringSet[constants.LetterCategory.AMPLIFY] +
            scoringSet[constants.LetterCategory.SUSPICION]
        ):
            print(f"{scoringStr} not possible because the scoring string exceeds the word length of {len(word)}. ({word})")
            isPossible = False

        if(isPossible):
            # maximum number of scorable letters per category
            # (in order to have more scorable letters than the maximum number of letters per category, some letters must be duplicated.)
            for letterCategory in constants.LetterCategory:
                # count the X most common letters in the word. then add them together.
                # e.g. "buffalo" has (f, 2). the rest of the letters are 1s, and will be selected from randomly.
                mostCommonLetters = Counter(word).most_common(constants.LETTERS_PER_CATEGORY[letterCategory])

                # add the X most common letter counts together. (this is the maximum number of scorable letters in this category )
                maxNumScorableLettersInCategory = 0
                for (letter, numOccurances) in mostCommonLetters:
                    maxNumScorableLettersInCategory += numOccurances
                if scoringSet[letterCategory] > maxNumScorableLettersInCategory:
                    isPossible = False
                    print(f"{scoringStr} Not possible because {word} does not have enough duplicate letters for the scoring string")

        # investigate least common letters.
        # (ensure we dont end up with TT/TA for magma = 2. should only be TT since there are not two wholly unique letters)
        leastCommonLetters = Counter(word)
        # TODO

        # TODO could we brute force to double check a valid selection of letters based on rarities too?

        if(isPossible):
            possibleScoringSets.append(scoringSet)
    return possibleScoringSets

possibleScoringSets = generatePossibleScoringSets('magma', 2)
for scoringSet in possibleScoringSets:
    print(prettyPrintScoringSet(scoringSet))


customRules = [
    {
        # TRUST = M OR G
        # TRUST = M OR AMPLIFY = G
        # TRUST = M + A OR AMPLIFY = M + A
        # TRUST = M OR G+A
        # TRUST = G+A OR A = Q
        
    }
]

# custom rules
# trust = M or G
# 

# further refinement is to confirm that each letter combo is possible with the available trust/amplify/suspicion buckets, for example if no fs exist in amplify,
#offer with 8 implies f = trust






