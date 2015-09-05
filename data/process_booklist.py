# This is python2, pls don't kill me
file = open("booklist.txt", "r+")
wordcount = {}
for word in file.read().split():
	if word not in wordcount:
		wordcount[word] = 1
	else:
		wordcount[word] += 1

print "key;value"
for k, v in wordcount.items():
	print "{};{}".format(k, v)
