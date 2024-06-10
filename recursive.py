def generate_combinations(n):
    if n % 2 != 0:
        # If n is odd, generate a string of n trust letters
        return ['T' * n]
    
    combinations = []
    if n == 2:
        combinations.append('T' * 2)  # TT
    elif n == 4:
        combinations.append('T' * 2 + 'A')  # TTA
        combinations.append('T' + 'A' * 2)  # TAA
    elif n == 6:
        combinations.append('T' * 3 + 'A')  # TTTA
    elif n == 8:
        combinations.append('T' * 8)  # TTTTTTTT
        combinations.append('T' * 3 + 'A')  # TTTTA
        combinations.append('T' * 2 + 'A' * 2)  # TTAA
        combinations.append('T' + 'A' * 3)  # TAAA
    else:
        # For larger even numbers, generate combinations recursively
        for i in range(2, n, 2):
            sub_combinations1 = generate_combinations(i)
            sub_combinations2 = generate_combinations(n - i)
            for comb1 in sub_combinations1:
                for comb2 in sub_combinations2:
                    combinations.append(comb1 + comb2)
    
    return combinations

for i in range(0, 12, 2):
    print(f"Combinations for {i}: {generate_combinations(i,)}")