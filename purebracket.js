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

function getBaseLog(x, y) {
  // A cute little change of base function!
  return Math.log(y) / Math.log(x);
}

function getSelectionValue(object) {
  for (i = 0; i < object.length; i++) {
    if(object[i].checked){
      return object[i].value;
    }
  }
}

function createSelection(inputArray) {
  var alphabeticalArray = inputArray.slice().sort()
      selectionItem = document.createElement("select")
      blankItem = document.createElement("option");

  blankItem.style.display = "none";

  selectionItem.appendChild(blankItem);

  for (itemIndex in alphabeticalArray) {
    var item = document.createElement("option")
        itemText = document.createTextNode(alphabeticalArray[itemIndex]);

    item.appendChild(itemText);
    selectionItem.appendChild(item);
  }
  return selectionItem;
}

function generateBracket() {
  // Get number of players from input box
  var validNumber = [4, 8, 16, 32]
      optionSection = document.getElementById("options")
      numberInput = document.getElementById("numberOfPlayers")
      playerNumber = parseInt(numberInput.value)
      isNumberValid = validNumber.includes(playerNumber);

  function displayWarning(condition, messageString, messageId) {
    /*   This function is in charge of displaying simple warnings at the top
     * of the page. If it isn't, a warning message element is added.
     */
    if(condition != true) {
      if (Boolean(document.getElementById(messageId)) != true) {
        var warning = document.createElement("p")
            warningNode = document.createTextNode(messageString)
            warning.setAttribute("id", messageId);
        // Set a class name for simple styling purposes
        warning.className = "warningMessage";
        warning.append(warningNode);
        optionSection.insertBefore(warning, numberInput);
      }
      // Throw an error and stop execution, please
      throw new Error(messageString);
    } else {
      var warning = document.getElementById(messageId);
      if (Boolean(warning) == true) {
        optionSection.removeChild(warning);
      }
    }
  }

  // Use the function above
  displayWarning(isNumberValid, "Please enter a valid number of players",
                 "numberWarning");
  // Get names from text box
  var nameBox = document.getElementById("names")
      names = nameBox.value.split("\n")
      enoughPlayersListed = (names.length == numberInput.value);

  displayWarning(enoughPlayersListed,
                 "Please enter the same number of players as submitted in step 1",
                 "playerWarning");

  var bracketBox = document.getElementById("bracket");

  // Clear the bracket div
  while (bracketBox.firstChild) {
      bracketBox.removeChild(bracketBox.firstChild);
  }

  var bracketSelect = document.getElementById("matchType")
      bracketValue = getSelectionValue(bracketSelect);

  displayWarning(Boolean(bracketValue), "Please select a bracket style",
                 "bracketStyleWarning")

  var mainBracket = document.createElement("div");

  mainBracket.setAttribute("id", "mainBracket");
  bracketBox.appendChild(mainBracket);

  if (bracketValue == "double") {
    var secondaryBracket = document.createElement("div");

    secondaryBracket.setAttribute("id", "secondaryBracket");
    bracketBox.appendChild(secondaryBracket);
  }

  var orderSelect = document.getElementById("orderType")
      orderValue = getSelectionValue(orderSelect);

  displayWarning(Boolean(orderValue), "Please select a player order type",
                 "orderTypeWarning")

  var matchArray;
  if (orderValue == "ordered") {
    matchArray = names;
  } else if (orderValue == "unordered") {
    // Use the shuffle function on the list of names
    matchArray = shuffleArray(names);
  }

  var matches = [];

  for (i = 0; i < (matchArray.length / 2); i++) {
    matches[i] = matchArray.slice((i * 2), (i * 2 + 2));
  }

  var round1 = document.createElement("div");

  round1.className = "round round1";

  for (x in matches) {
    var matchItem = document.createElement("div")
        person1 = document.createElement("p")
        person2 = document.createElement("p")
        spacer = document.createElement("div");

    person1.appendChild(document.createTextNode(matches[x][0]));
    person2.appendChild(document.createTextNode(matches[x][1]));

    matchItem.className = "match";
    spacer.className = "spacer";

    matchItem.appendChild(person1);
    matchItem.appendChild(spacer);
    matchItem.appendChild(person2);

    round1.appendChild(matchItem);
  }
  // Add the first round to the bracket
  mainBracket.appendChild(round1)

  var rounds = getBaseLog(2, playerNumber);

  for (i = 1; i < rounds; i++) {
    var roundItem = document.createElement("div")
        splits = Math.pow(2, i);

    roundItem.className = "round round" + (i + 1);

    for (j = 0; j < playerNumber / splits; j += 2) {
      var matchItem = document.createElement("div")
          spacer = document.createElement("div")
          possiblePlayers1 = matchArray.slice(j*splits, (j+1)*splits)
          possiblePlayers2 = matchArray.slice((j+1)*splits, (j+2)*splits)
          select2 = document.createElement("select");

      matchItem.className = "match";
      spacer.className = "spacer";

      var select1 = createSelection(possiblePlayers1)
          select2 = createSelection(possiblePlayers2);

      matchItem.appendChild(select1);
      matchItem.appendChild(spacer);
      matchItem.appendChild(select2);

      roundItem.appendChild(matchItem);
    }
    mainBracket.appendChild(roundItem);
  }

  var winnerSelect = createSelection(matchArray);

  winnerSelect.setAttribute("id", "winner");

  var marginSize = (((playerNumber / 2) * 100) - 30) / 2;

  winnerSelect.style.margin = marginSize + "px 0";
  mainBracket.appendChild(winnerSelect);

  if (bracketValue == "double") {
    for (i = 1; i < rounds; i++) {
      var roundItem = document.createElement("div")
          splits = Math.pow(2, i);

      roundItem.className = "round round" + i;

      for (j = 0; j < playerNumber / splits; j += 2) {
        var matchItem = document.createElement("div")
            spacer = document.createElement("div")
            possiblePlayers1 = matchArray.slice(j*splits, (j+1)*splits)
            possiblePlayers2 = matchArray.slice((j+1)*splits, (j+2)*splits)
            select2 = document.createElement("select");

        matchItem.className = "match";
        spacer.className = "spacer";

        var select1 = createSelection(possiblePlayers1)
            select2 = createSelection(possiblePlayers2);

        matchItem.appendChild(select1);
        matchItem.appendChild(spacer);
        matchItem.appendChild(select2);

        roundItem.appendChild(matchItem);
      }
      secondaryBracket.appendChild(roundItem);
    }
  }
  var winnerSelect = createSelection(matchArray);

  winnerSelect.setAttribute("id", "winner");

  var marginSize = (((playerNumber / 4) * 100) - 30) / 2;

  winnerSelect.style.margin = marginSize + "px 0";
  secondaryBracket.appendChild(winnerSelect);
}
