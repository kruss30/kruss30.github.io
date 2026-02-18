//ai was used to help generate initial structure and logic ideas
//all code was reviewed, modified, and finalized by me

//returns the current counter value as a number
function readCounter() {
  const counterText = document.getElementById("counter").textContent;
  return Number(counterText);
}

//updates the counter display
function updateCounter(value) {
  document.getElementById("counter").textContent = value;
}

//increase counter
function tickUp() {
  let currentValue = readCounter();
  currentValue++;
  updateCounter(currentValue);
}

//decrease counter
function tickDown() {
  let currentValue = readCounter();
  currentValue--;
  updateCounter(currentValue);
}


//for loop 0 to counter
function runForLoop() {
  const limit = readCounter();
  const resultArea = document.getElementById("forLoopResult");

  let output = "";

  for (let i = 0; i <= limit; i++) {
    output += i + " ";
  }

  resultArea.textContent = output.trim();
}


//odd numbers only
function showOddNumbers() {
  const limit = readCounter();
  const resultArea = document.getElementById("oddNumberResult");

  let output = "";

  for (let i = 1; i <= limit; i += 2) {
    output += i + " ";
  }

  resultArea.textContent = output.trim();
}


//multiples of 5 in reverse order
function addMultiplesToArray() {
  const limit = readCounter();
  let multiples = [];

  if (limit >= 5) {
    let start = limit - (limit % 5);

    for (let i = start; i >= 5; i -= 5) {
      multiples.push(i);
    }
  }

  console.log(multiples);
}


//create object from form fields
function printCarObject() {
  const car = {
    cType: document.getElementById("carType").value,
    cMPG: document.getElementById("carMPG").value,
    cColor: document.getElementById("carColor").value
  };

  console.log(car);
}


//load object into form
function loadCar(selection) {
  let chosenCar;

  if (selection === 1) {
    chosenCar = carObject1;
  } else if (selection === 2) {
    chosenCar = carObject2;
  } else {
    chosenCar = carObject3;
  }

  document.getElementById("carType").value = chosenCar.cType;
  document.getElementById("carMPG").value = chosenCar.cMPG;
  document.getElementById("carColor").value = chosenCar.cColor;
}


//change paragraph color
function changeColor(choice) {
  const paragraph = document.getElementById("styleParagraph");

  const colors = ["red", "green", "blue"];

  paragraph.style.color = colors[choice - 1];
}
