let sum = 0;
let operator = null;
let isNewNumber = true;
let lastInput;
const MAX_CHARACTERS_INPUT = 15;
const MAX_CHARCTER_DISPLAY = 19;
const NUMBER_INPUT = document.getElementById('calculatorNumberInput');
const CALCULATOR_DISPLAY = document.getElementById('calculating-display');
const ID_TO_CONVERT = {
  'plus': '+',
  'minus': '-',
  'multiply': '*',
  'divide': '/',
  'equal': '=',
  'clear': 'c',
  'backspace': 'Backspace',
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'dot': '.'
};
const CALCULATOR_OPERATOR_SIGNS = ['+', '-', '/', '*'];
const CALCULATOR_FUNCTION_SIGN = ['=', 'c', 'Backspace', 'Enter'];
NUMBER_INPUT.innerHTML = 0;
//הפוך את החלוקה לפונקציה
function getClickedButtonId(buttonId) {
  keySorter(ID_TO_CONVERT[buttonId]);
}

document.addEventListener('keydown',({key}) => {
  keySorter(key);
});

function keySorter(key) {
  if ((key >= 0 && key <= 9) || key === '.') {
    writeInTextbox(key);
  }
  if (CALCULATOR_OPERATOR_SIGNS.includes(key)) {
    clickOnOperator(key);
  }
  if (CALCULATOR_FUNCTION_SIGN.includes(key)) {
    calcFunctions(key);
  }
}

function writeInTextbox(key) {
  if (NUMBER_INPUT.innerHTML.length < MAX_CHARACTERS_INPUT || !isNewNumber) {
    if (key === '.') {
      writeDot();
    } else {
      writeNumbers(key);
    }
  }
}

function writeDot() {
  if (!NUMBER_INPUT.innerHTML.includes('.')) {
    if (!isNewNumber) {
      NUMBER_INPUT.innerHTML = '0.';
    } else {
      NUMBER_INPUT.innerHTML = NUMBER_INPUT.innerHTML + '.';
    }
    isNewNumber = true;
  }
}

function writeNumbers(key) {
  if (NUMBER_INPUT.innerHTML != '0') {
    if (!isNewNumber) {
      NUMBER_INPUT.innerHTML = key;
    } else {
      NUMBER_INPUT.innerHTML = NUMBER_INPUT.innerHTML + key;
    }
  } else {
    NUMBER_INPUT.innerHTML = key;
  }
  isNewNumber = true;
}

function calcFunctions(key) {
  if (key === 'Enter') {
    key = '=';
  }
  const CALCULATOR_FUNCTIONS = {
    'Backspace': backspace,
    'c': clear,
    '=': equalFunction,
  };
  CALCULATOR_FUNCTIONS[key]();
}
//שנה את  סיין
//להוריד את if הוא מספר
function clickOnOperator(sign) {
  let value = Number(NUMBER_INPUT.innerHTML);
  let display = CALCULATOR_DISPLAY.innerHTML;
  //Check if value is a number.
  if (CALCULATOR_DISPLAY.innerHTML === '') {
    sum = value;
    CALCULATOR_DISPLAY.innerHTML = sum + sign;
    operator = sign;
    isNewNumber = false;
  } else if (isNewNumber) {
    if ((display + value + sign).length <= MAX_CHARCTER_DISPLAY) {
      CALCULATOR_DISPLAY.innerHTML = display + value + sign;
      lastInput = value;
      operatorAction();
      if (lastInput !== 0 || operator !== '/') {
        NUMBER_INPUT.innerHTML = sum;
        operator = sign;
        isNewNumber = false;
      } else {
        mathError();
      }
    }
  } else {
    CALCULATOR_DISPLAY.innerHTML = CALCULATOR_DISPLAY.innerHTML.substring(0, CALCULATOR_DISPLAY.innerHTML.length - 1) + sign;
    operator = sign;
  }
}


//לא לעשות סוויצ
function operatorAction() {
  let temp = lastInput;
  let maxNumbersAfterTheDot = 0;
  function checksHowManyDigitsAfterTheDot() {
    let indexOfDotInSum = sum.toString().indexOf('.');
    let indexOfDotInLastInput = lastInput.toString().indexOf('.');
    function getsTheNumberWithMaxNumbersAfterTheDot() {
      let numbersAfterTheDotLastInput = lastInput.toString().slice(indexOfDotInLastInput).length - 1;
      let numbersAfterTheDotSum = sum.toString().slice(indexOfDotInSum).length - 1;
      if (isNaN(indexOfDotInSum)) {
        maxNumbersAfterTheDot = numbersAfterTheDotLastInput;
      } else if(isNaN(indexOfDotInLastInput)) {
        maxNumbersAfterTheDot = numbersAfterTheDotSum;
      }else{
        maxNumbersAfterTheDot = Math.max(numbersAfterTheDotLastInput,numbersAfterTheDotSum);
      }
    }
    getsTheNumberWithMaxNumbersAfterTheDot();
  }
  if (sum % 1 !== 0 || lastInput % 1 !== 0) {
    checksHowManyDigitsAfterTheDot();
    sum *= Math.pow(10, maxNumbersAfterTheDot);
    lastInput *= Math.pow(10, maxNumbersAfterTheDot);
  }
  const MATH_OPERATOR = {
    '+': () => {
      sum += lastInput;
      adjustBackToActualSum(maxNumbersAfterTheDot);
    },
    '-': () => {
      sum -= lastInput;
      adjustBackToActualSum(maxNumbersAfterTheDot);
    },
    '*': () => {
      sum *= lastInput;
      adjustBackToActualSum(maxNumbersAfterTheDot * 2);
    },
    '/': () => {
      if (lastInput !== 0) {
        sum /= lastInput;
      }
    }
  };
  MATH_OPERATOR[operator]();
  lastInput = temp;
}

function backspace() {
  NUMBER_INPUT.innerHTML = NUMBER_INPUT.innerHTML.slice(0, NUMBER_INPUT.innerHTML.length - 1);
  if (NUMBER_INPUT.innerHTML === '') {
    NUMBER_INPUT.innerHTML = 0;
  }
}

function clear() {
  NUMBER_INPUT.innerHTML = 0;
  CALCULATOR_DISPLAY.innerHTML = '';
  isNewNumber = true;
  operator = null;
  sum = 0;
  lastInput = 0;
}

function equalFunction() {
  if (CALCULATOR_DISPLAY.innerHTML !== '') {
    lastInput = Number(NUMBER_INPUT.innerHTML);
    operatorAction();
    if (lastInput !== 0 || operator !== '/') {
      if ((sum.toString()).length <= MAX_CHARACTERS_INPUT) {
        NUMBER_INPUT.innerHTML = sum;
        CALCULATOR_DISPLAY.innerHTML = '';
      } else {
        mathError();
      }
    } else {
      mathError();
    }
  } else {
    if (operator !== null) {
      operatorAction();
      if ((sum + '').length <= MAX_CHARACTERS_INPUT) {
        NUMBER_INPUT.innerHTML = sum;
      } else {
        mathError();
      }
    }
  }
  isNewNumber = false;
}

function mathError() {
  NUMBER_INPUT.innerHTML = 'Math error';
  setTimeout(function() {
    clear();
  }, 1000);
}

function adjustBackToActualSum(i) {
  sum /= Math.pow(10, i);
}
