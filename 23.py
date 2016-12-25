"""

Et barn løper opp en trapp med 250 trinn, og kan ta enten ett, to eller tre steg om gangen. 
Hvor mange ulike måter kan barnet løpe opp trappen?

"""

n = [1, 2, 4]
[n.append(n[i-1] + n[i-2] + n[i-3]) for i in range(3, 250)]
print n[-1]