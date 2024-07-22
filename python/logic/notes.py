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



    # create every possible world where the score is valid. what is the brute force complexity?
    # TRUST 0: 9
    # TRUST 1: 11/17
    # TRUST 2: 17
    # AMPLIFY 3: 9
    # AMPLIFY 4: 17
    # SUSPICION 5: 26
    # about 7 million MAX, if it determines literally everything is in the word lol
    # maybe we can use wildcards for letter groups that have no relevant scorable letters.

    # then, compare the aggregated scorable universe with what we had previously, and eliminate any invalid letters

    # future runs will run the newest word first, followed by older words to see if the scoring still works


    # maybe we can save this step til the end?

    # # count the number of trust/amplify/suspicion letters
    # letterCount = {
    #     constants.LetterCategory.TRUST: 0,
    #     constants.LetterCategory.AMPLIFY: 0,
    #     constants.LetterCategory.SUSPICION: 0,
    # }
    # for idx, letter in enumerate(letter_group):
    #     category = constants.PUZZLE_LETTERS[idx]["category"]
    #     letterCount[category] += word.count(letter)

    # # Apply grading rules
    # score = 0
    # score += letterCount[constants.LetterCategory.TRUST]  # Every instance of a trust letter adds 1 to the grade
    # score *= 2 ** letterCount[constants.LetterCategory.AMPLIFY]  # Every instance of an amplify letter doubles the grade
    # if letterCount[constants.LetterCategory.SUSPICION] > 0:  # Any instance of the suspicion letter makes the grade negative
    #     score *= -1
    # return score


# def removeLettersFromConsideration(word, score):
#   # if a word scores 0, remove all letters from TRUST. ignore further processing
#   if(score == 0):
#       # TODO
#       test = 1
#   else:
#       test = 2
#   # if a word scores positive, remove all letters from SUS

#   # if a word is odd, remove all letters from AMPLIFY

#   # if a letter is SOLVED, remove it from the other lists


#def ungrade_word(word, score, possibleLetters):
#     # determine the possible combinations of trust/amplify/suspicion letters
#     scoringSets = recursive.generatePossibleScoringSets('BEAVER', 6)
#     for scoringSet in scoringSets:
#       print(recursive.prettyPrintScoringSet(scoringSet))

#     # for every category that is absent, clear these letters



#     letterGroup = []
#     for idx, puzzleLetter in enumerate(constants.PUZZLE_LETTERS):
#         for letter in possibleLetters[idx]:
#             answer_key.gradeWord(letterGroup)
#         print(letter)
