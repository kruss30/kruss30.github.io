//get counter as a number from the page
function getCounterValue() {
  const counterEl = document.getElementById("counter");
  const value = parseInt(counterEl.textContent, 10);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

//set counter value on the page
function setCounterValue(newValue) {
  document.getElementById("counter").textContent = String(newValue);
}

//increment counter
function tickUp() {
  const current = getCounterValue();
  setCounterValue(current + 1);
}

//decrement counter
function tickDown() {
  const current = getCounterValue();
  setCounterValue(current - 1);
}

//display 0..counter inclusive
function runForLoop() {
  const n = getCounterValue();
  const resultEl = document.getElementById("forLoopResult");

  if (n < 0) {
    resultEl.textContent = "";
    return;
  }

  const parts = [];
  for (let i = 0; i <= n; i++) {
    parts.push(i);
  }
  resultEl.textContent = parts.join(" ");
}

//display odd numbers 1..counter
function showOddNumbers() {
  const n = getCounterValue();
  const resultEl = document.getElementById("oddNumberResult");

  if (n < 1) {
    resultEl.textContent = "";
    return;
  }

  const parts = [];
  for (let i = 1; i <= n; i++) {
    if (i % 2 === 1) {
      parts.push(i);
    }
  }
  resultEl.textContent = parts.join(" ");
}

//log reverse multiples of 5 up to counter
function addMultiplesToArray() {
  const n = getCounterValue();
  const arr = [];

  if (n >= 5) {
    for (let i = n; i >= 5; i--) {
      if (i % 5 === 0) {
        arr.push(i);
      }
    }
  }

  console.log(arr);
}

//build car object from form and log it
function printCarObject() {
  const type = document.getElementById("carType").value;
  const mpg = document.getElementById("carMPG").value;
  const color = document.getElementById("carColor").value;

  const carObj = {
    cType: type,
    cMPG: mpg,
    cColor: color
  };

  console.log(carObj);
}

//load a footer car object into the form
function loadCar(which) {
  let selected = null;

  if (which === 1) {
    selected = carObject1;
  } else if (which === 2) {
    selected = carObject2;
  } else if (which === 3) {
    selected = carObject3;
  } else {
    return;
  }

  document.getElementById("carType").value = selected.cType;
  document.getElementById("carMPG").value = selected.cMPG;
  document.getElementById("carColor").value = selected.cColor;
}

//change only the paragraph text color
function changeColor(which) {
  const p = document.getElementById("styleParagraph");

  if (which === 1) {
    p.style.color = "red";
  } else if (which === 2) {
    p.style.color = "green";
  } else if (which === 3) {
    p.style.color = "blue";
  }
}
