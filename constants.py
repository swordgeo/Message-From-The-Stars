from enum import Enum

class LetterCategory(Enum):
    TRUST = 1,
    AMPLIFY = 2,
    SUSPICION = 3

class LetterRarity(Enum):
    COMMON = 1,
    UNCOMMON = 2,
    RARE = 3

COMMON_LETTERS = ['A','E','I','L','N','O','R','S','T']
UNCOMMON_LETTERS = ['B','C','D','F','G','H','M','P','U','W','Y']
RARE_LETTERS = ['J','K','Q','V','X','Z']

ALL_LETTERS = {}
for letter in COMMON_LETTERS:
    ALL_LETTERS[letter] = LetterRarity.COMMON
for letter in UNCOMMON_LETTERS:
    ALL_LETTERS[letter] = LetterRarity.UNCOMMON
for letter in RARE_LETTERS:
    ALL_LETTERS[letter] = LetterRarity.RARE

PUZZLE_LETTERS = [
    {
        "category": LetterCategory.TRUST,
        "valid_rarities": [LetterRarity.COMMON]
    },
    {
        "category": LetterCategory.TRUST,
        "valid_rarities": [LetterRarity.UNCOMMON, LetterRarity.RARE]
    },
    {
        "category": LetterCategory.TRUST,
        "valid_rarities": [LetterRarity.UNCOMMON, LetterRarity.RARE]
    },
    {
        "category": LetterCategory.AMPLIFY,
        "valid_rarities": [LetterRarity.COMMON]
    },
    {
        "category": LetterCategory.AMPLIFY,
        "valid_rarities": [LetterRarity.UNCOMMON, LetterRarity.RARE]
    },
    {
        "category": LetterCategory.SUSPICION,
        "valid_rarities": [LetterRarity.COMMON, LetterRarity.UNCOMMON, LetterRarity.RARE]
    },
]

# TODO do this programatically
LETTERS_PER_CATEGORY = {
    LetterCategory.TRUST : 3,
    LetterCategory.AMPLIFY: 2,
    LetterCategory.SUSPICION: 1
}
