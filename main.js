(function () {
  let startBtn = document.querySelector(".start-btn");
  let mainInput = document.querySelector(".main-input");
  let allLines = document.querySelectorAll(".line");
  let result = document.querySelector(".display-result");
  let counter = 0;//points
  let allText = [];//all pickup words in function chooseText
  let newWord;

  startBtn.addEventListener("click", startGame);
  window.addEventListener("keyup",startGame);

  function startGame() {
    mainInput.focus();
    window.removeEventListener('keyup',startGame);  
    startBtn.style.display = "none";

    mainInput.addEventListener("keyup", checkInput);

    //setup
    let speed = 1;// one step
    let textLength = 3;//word length
    let typingWords = words.filter((word) => word.length === textLength);//currently words
    let level = 6;//optional
    let speedUp = setInterval(() => {
      textLength++;
      typingWords = words.filter((word) => word.length === textLength);
    }, 20000);

    //insert spans
    insertSpans();

    //animation of word(spans)
    let moveWord = setInterval(() => {
      let allWords = document.querySelectorAll(".word");
      allWords.forEach((element) => {
        let movement = parseInt(window.getComputedStyle(element).left) + speed;
        element.style.left = `${movement}px`;
        //test
        let position = parseInt(window.getComputedStyle(element).left);
        if (position > 850) {
          clearAllIntervals();
        } else if (position > 650) {
          element.style.background = "tomato";
        }
      });
    }, 100);

    function checkInput(e) {
      let input = e.target.value;
      if (allText.includes(input)) {
        let allWords = document.querySelectorAll(".word");
        let indexOfWord = allText.indexOf(input);
        allText.splice(indexOfWord, 1);
        //when you type a word
        allWords.forEach((word) => {
          if (word.innerHTML === input) {
            counter++;
            word.style.background = "green";
            result.innerHTML = counter;
            e.target.value = "";

            setTimeout(() => {
              disappear(word);
            }, 200);
          }
        });
      }
    }

    function disappear(span) {
      span.remove();
    }

    function clearAllIntervals() {
      clearInterval(moveWord);
      clearInterval(speedUp);
      clearInterval(newWord);
    }

    function insertSpans() {
      for (var i = 0; i < allLines.length; i++) {
        let rand = Math.floor(Math.random() * 20);
        if (rand <= level) {
          let text = chooseText();
          allText.push(text);
          allLines[i].innerHTML += `<span class='word'>${text}</span>`;
        }
      }
      newWord = setTimeout(insertSpans, 6000);
    }

    function chooseText() {
      let rand = Math.floor(Math.random() * typingWords.length);
      let word = typingWords[rand];
      typingWords.splice(rand, 1);

      return word;
    }
  }
})();
