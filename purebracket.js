function shuffleArray(array) {
  /*   This is a script that I found on Stack Overflow, they call it the
   * 'Fisher-Yates shuffle', which seems pretty cool. And it works too! So
   *  can be sure if this a truly sorted array
   */
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function generateBracket() {
  // Get number of players from input box
  var validNumber = [4, 8, 16, 32]
      numberInput = document.getElementById("numberOfPlayers")
      isNumberValid = validNumber.includes(parseInt(numberInput.value));

  function displayWarning(condition, messageString, messageId) {
    /*   This function is in charge of displaying simple warnings at the top
     * of the page. If it isn't, a warning message element is added.
     */
    if(condition != true) {
      if (Boolean(document.getElementById(messageId)) != true) {
        var warning = document.createElement("p");
        var warningNode = document.createTextNode(messageString);
        warning.setAttribute("id", messageId);
        // Set a class name for simple styling purposes
        warning.className = "warningMessage";
        warning.append(warningNode);
        document.body.insertBefore(warning, numberInput);
      }
      // Throw an error and stop execution, please
      throw new Error(messageString);
    } else {
      var warning = document.getElementById(messageId);
      if (Boolean(warning) == true) {
        document.body.removeChild(warning);
      }
    }
  }

  console.log(isNumberValid);
  // Use the function above
  displayWarning(isNumberValid, "Please enter a valid number of players",
                 "numberWarning");
  // Get names from text box
  var y = document.getElementById("names")
      names = y.value.split("\n")
      enoughPlayersListed = (names.length == numberInput.value);

  console.log(names);
  displayWarning(enoughPlayersListed, "Please enter the number of players required",
                 "playerWarning");
  // Use the shuffle function on the list of names
  console.log(shuffleArray(names));
}
