var sum = 0;
var operator = null;
var new_number = true;
var last_input;
const btns = document.querySelectorAll('.btn');
const input = document.getElementsByTagName("input")[0];
const calc_display = document.getElementById("calculating-display");
const calc_operator_signs = ['+', '-', '/', '*'];
const calc_functions_signs = ['=', 'c', "Backspace"];
input.value = 0;

btns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
    var key = event.target.id;
    if ((key >= 0 && key <= 9) || key == ".") {
      writeInTextbox(key);
    }
    if (calc_operator_signs.includes(key)) {
      clickOnOperator(key);
    }
    if (calc_functions_signs.includes(key)) {
      calcFunctions(key);
    }
  });
});

document.addEventListener("keydown", function(event) {
  var key = event.key;
  if ((key >= 0 && key <= 9) || key == ".") {
    writeInTextbox(key);
  }
  if (calc_operator_signs.includes(key)) {
    clickOnOperator(key);
  }
  if (calc_functions_signs.includes(key)) {
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
    if (new_number == false) {
      input.value = "0.";
      new_number = true;
    } else {
      input.value = input.value + ".";
      new_number = true;
    }
  }
}

function writeNumbers(key) {
  if (input.value != 0) {
    if (new_number == false) {
      input.value = key;
      new_number = true;
    } else {
      input.value = input.value + key;
      new_number = true;
    }
  } else {
    input.value = key;
    new_number = true;
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

function clickOnOperator(sign) {
  var value = input.value;
  //Check if value is a number.
  if (!isNaN(value)) {
    if (calc_display.innerHTML == "") {
      sum = Number(value);
      calc_display.innerHTML = calc_display.innerHTML + sum + sign;
      operator = sign;
      new_number = false;
    } else if (new_number == true) {
      calc_display.innerHTML = calc_display.innerHTML = calc_display.innerHTML + value + sign;
      operatorAction();
      operator = sign;
      new_number = false;
    } else {
      calc_display.innerHTML = calc_display.innerHTML.substring(0, calc_display.innerHTML.length - 1) + sign;
      operator = sign;
    }
  } else {
    alert(value + " is not a valid number.");
  }
}

function operatorAction() {
  switch (operator) {
    case "+":
      sum = sum + last_input;
      break;
    case "-":
      sum = sum - last_input;
      break;
    case "*":
      sum = sum * last_input;
      break;
    case "/":
      if (last_input == 0) {
        clear();
        alert("you can't divide with 0");
        break;
      }
      sum = sum / last_input;
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
  calc_display.innerHTML = "";
  new_number = true;
  operator = null;
  sum = 0;
}

function equalFunction() {
  if (calc_display.innerHTML != "") {
    last_input = Number(input.value);
    operatorAction();
    input.value = sum;
    calc_display.innerHTML = "";
    new_number = false;
  } else if (new_number == true) {
    sum = input.value;
    operatorAction();
    new_number = false;
    input.value = sum;
  } else {
    operatorAction();
    input.value = sum;
    new_number = false;
  }
}
