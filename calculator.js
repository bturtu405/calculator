
let sum = 0;
let operator = null;
let isNewNumber = true;
let lastInput;
/להוסיף פעולת onclick()
const btns = document.querySelectorAll('.btn');
//תשיג דרך id
const input = document.getElementsByid("#calculatorNumberInput")[0];
const calcDisplay = document.getElementById("calculating-display");
const calcFunctionsSigns = ['=', 'c', "Backspace"];
input.value = 0;
//הפוך את החלוקה לפונקציה
btns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    let key = event.target.id;
    if ((key >= 0 && key <= 9) || key == ".") {
      writeInTextbox(key);
    }
    if (calcOperatorSigns.includes(key)) {
      clickOnOperator(key);
    }
    if (calcFunctionsSigns.includes(key)) {
      calcFunctions(key);
    }
  });
});

document.addEventListener("keydown", function(event) {
  let key = event.key;
  if ((key >= 0 && key <= 9) || key == ".") {
    writeInTextbox(key);
  }
  if (calcOperatorSigns.includes(key)) {
    clickOnOperator(key);
  }
  if (calcFunctionsSigns.includes(key)) {
    calcFunctions(key);
  }
});

function writeInTextbox(key) {
  if (key == ".") {
    writeDot();
  } else {
    writeNumbers(key);
  }
}

function writeDot() {
  if (!input.value.includes(".")) {
    if (isNewNumber == false) {
      input.value = "0.";
      isNewNumber = true;
    } else {
      input.value = input.value + ".";
      isNewNumber = true;
    }
  }
}

function writeNumbers(key) {
  if (input.value != 0) {
    if (isNewNumber == false) {
      input.value = key;
      isNewNumber = true;
    } else {
      input.value = input.value + key;
      isNewNumber = true;
    }
  } else {
    input.value = key;
    isNewNumber = true;
  }
}

function calcFunctions(key) {
  switch (key) {
    case "Backspace":
      backspace();
      break;
    case "c":
      clear();
      break;
    case "=":
      equalFunction();
      break;
  }
}
//שנה את  סיין
//להוריד את if הוא מספר
function clickOnOperator(sign) {
  let value = input.value;
  //Check if value is a number.
  if (!isNaN(value)) {
    if (calcDisplay.innerHTML == "") {
      sum = Number(value);
      calcDisplay.innerHTML = calcDisplay.innerHTML + sum + sign;
      operator = sign;
      isNewNumber = false;
    } else if (isNewNumber == true) {
      calcDisplay.innerHTML = calcDisplay.innerHTML + value + sign;
      operatorAction();
      operator = sign;
      isNewNumber = false;
    } else {
      calcDisplay.innerHTML = calcDisplay.innerHTML.substring(0, calcDisplay.innerHTML.length - 1) + sign;
      operator = sign;
    }
  } else {
    alert(value + " is not a valid number.");
  }
}
//לא לעשות סוויצ
function operatorAction() {
  switch (operator) {
    case "+":
      sum = sum + lastInput;
      break;
    case "-":
      sum = sum - lastInput;
      break;
    case "*":
      sum = sum * lastInput;
      break;
    case "/":
      if (lastInput == 0) {
        clear();
        alert("you can't divide with 0");
        break;
      }
      sum = sum / lastInput;
      break;
  }
}

function backspace() {
  input.value = input.value.substring(0, input.value.length - 1);
  if (input.value == "") {
    input.value = 0;
  }
}

function clear() {
  input.value = 0;
  calcDisplay.innerHTML = "";
  isNewNumber = true;
  operator = null;
  sum = 0;
}

function equalFunction() {
  if (calcDisplay.innerHTML != "") {
    lastInput = Number(input.value);
    operatorAction();
    input.value = sum;
    calcDisplay.innerHTML = "";
    isNewNumber = false;
  } else if (isNewNumber == true) {
    sum = input.value;
    operatorAction();
    isNewNumber = false;
    input.value = sum;
  } else {
    operatorAction();
    input.value = sum;
    isNewNumber = false;
  }
}
