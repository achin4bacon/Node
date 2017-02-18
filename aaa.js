// Include fs module
var fs = require("fs");

function useStdin() {
	var input = process.stdin.read();

	if (input === null) {
		return;
	}

	// console.log(input.toString());

	// convert to string, trim whitespace, split to array of words
	var inputSplit = input.toString().trim().split(" ");

	if (inputSplit[0] === "cat") {
		catFile(inputSplit[1]);
	} else if (inputSplit[0] === "touch") {
		touchFile(inputSplit[1]);
	}
	else if (inputSplit[0] === "rm") {
		removeFile(inputSplit[1])
	}
	else if (inputSplit[0] === "replace") {
		replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
	}
	else if (inputSplit[1] === "grep") {
		grepFile(inputSplit[1], inputSplit[2])
	}
}

process.stdin.on("readable", useStdin);

function catFile(fileName) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(data.toString());
	});
}

function touchFile(fileName) {
	fs.appendFile(fileName, "", function (err) {
		if (err) {
			console.log(err);
			return;
		}

		console.log("Touched file!");
	});
}

function removeFile(fileName) {
	fs.unlink(fileName, function (err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("You've removed the file")
	});
}

function replaceWord(fileName, oldWord, newWord) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var newText = data.toString().split(oldWord).join(newWord);
		fs.writeFile(fileName, newText, function (err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Okay! Replaced.")
		});
	});
}

function grepFile(fileName, wordToFind) {
	fs.readFile(fileName, function (err, data) {
		if (err) {
			console.log(err);
			return;
		}
		var newText = data.toString().split('/n');
		for (var i = 0; i < newText.length; i++) {
			if (newText[i].indexOf(wordToFind)!== -1) {
				console.log(newText[i]);
			}
		}
		fs.writeFile(fileName, newText, function (err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log("These lines have that word");
		});
	});
}


	// /n -- split
/*
	
--writefile 
	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/

