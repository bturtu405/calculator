let sum = 0;
let operator = null;
let isNewNumber = true;
let lastInput;
let timesMultipliedBy10;
const MAX_CHARACTERS_FOR_INT = 15;
const MAX_CHARACTERS_FOR_DOUBLE = 17;
const MAX_CHARACTERS_INPUT = 19;
const MAX_CHARCTER_DISPLAY = 20;
const NUMBER_INPUT = document.getElementById('calculatorNumberInput');
const CALCULATOR_DISPLAY = document.getElementById('calculating-display');
const CALCULATOR_BUTTONS = {
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
const CALCULATOR_OPERATOR_SIGNS = [CALCULATOR_BUTTONS['plus'], CALCULATOR_BUTTONS['minus'],
 CALCULATOR_BUTTONS['divide'], CALCULATOR_BUTTONS['multiply']];
const CALCULATOR_FUNCTION_SIGN = [CALCULATOR_BUTTONS['equal'],CALCULATOR_BUTTONS['clear'],
CALCULATOR_BUTTONS['backspace'],'Enter'];
NUMBER_INPUT.innerHTML = 0;
let getClickedButtonId = buttonId => {
  keySorter(CALCULATOR_BUTTONS[buttonId]);
}

document.addEventListener('keydown', ({key}) => {
  keySorter(key);
});

let keySorter = (key) => {
  if (key.match(/[0-9]/) !== null || key === '.') {
    writeInTextbox(key);
  }
  if (CALCULATOR_OPERATOR_SIGNS.includes(key)) {
    clickOnOperator(key);
  }
  if (CALCULATOR_FUNCTION_SIGN.includes(key)) {
    calcFunctions(key);
  }
}

let writeInTextbox = (key) => {
  let numberOfCharctersInTheInput = NUMBER_INPUT.innerHTML.length;
  if (!isNewNumber) {
    if (key === '.') {
      writeDot();
    } else {
      writeNumbers(key);
    }
  } else if (key === '.') {
    if (numberOfCharctersInTheInput <= MAX_CHARACTERS_FOR_INT) {
      writeDot();
    }
  } else {
    if (numberOfCharctersInTheInput < MAX_CHARACTERS_FOR_INT) {
      writeNumbers(key);
    } else if (numberOfCharctersInTheInput < MAX_CHARACTERS_FOR_DOUBLE && NUMBER_INPUT.innerHTML.includes('.')) {
      writeNumbers(key);
    }
  }
}

let writeDot = () => {
  if (!NUMBER_INPUT.innerHTML.includes('.')) {
    if (!isNewNumber) {
      if (CALCULATOR_DISPLAY.innerHTML === '') {
        clear();
      }
      NUMBER_INPUT.innerHTML = '0.';
    } else {
      NUMBER_INPUT.innerHTML += '.';
    }
    isNewNumber = true;
  }
}

let writeNumbers = (key) => {
  if (NUMBER_INPUT.innerHTML != '0') {
    if (!isNewNumber) {
      if (CALCULATOR_DISPLAY.innerHTML === '') {
        clear();
      }
      NUMBER_INPUT.innerHTML = key;
    } else {
      NUMBER_INPUT.innerHTML += key;
    }
  } else {
    NUMBER_INPUT.innerHTML = key;
  }
  isNewNumber = true;
}

let calcFunctions = (key) => {
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

let clickOnOperator = (oprartorSign) => {
  let numberInputValue = Number(NUMBER_INPUT.innerHTML);
  let calculatorDisplayValue = CALCULATOR_DISPLAY.innerHTML;
  if (calculatorDisplayValue === '') {
    if (numberInputValue.toString().length < MAX_CHARCTER_DISPLAY) {
      sum = numberInputValue;
      CALCULATOR_DISPLAY.innerHTML = sum + oprartorSign;
      operator = oprartorSign;
      isNewNumber = false;
    } else {
      mathError();
    }
  } else if (isNewNumber) {
    if ((calculatorDisplayValue + numberInputValue + oprartorSign).length <= MAX_CHARCTER_DISPLAY) {
      CALCULATOR_DISPLAY.innerHTML = calculatorDisplayValue + numberInputValue + oprartorSign;
      lastInput = numberInputValue;
      operatorAction();
      if (lastInput !== 0 || operator !== '/') {
        NUMBER_INPUT.innerHTML = sum;
        operator = oprartorSign;
        isNewNumber = false;
      } else {
        mathError();
      }
    }
  } else {
    CALCULATOR_DISPLAY.innerHTML = CALCULATOR_DISPLAY.innerHTML.slice(0, CALCULATOR_DISPLAY.innerHTML.length - 1) + oprartorSign;
    operator = oprartorSign;
  }
}

let multiplyBy10 = () => {
  sum *= 10;
  lastInput *= 10;
  if (operator === '*') {
    timesMultipliedBy10 += 2;
  }else{
    timesMultipliedBy10++;
  }
}


  let isCalculationRight = () => {
    let result;
    let resultThatEqualToSum;
    let resultThatEqualToLastInput;

    const MATH_OPERATOR = {
      '+': () => {
        result = sum + lastInput;
        resultThatEqualToSum = result - lastInput;
        resultThatEqualToLastInput = result - sum;
      },
      '-': () => {
        result = sum - lastInput;
        resultThatEqualToSum = result + lastInput;
        resultThatEqualToLastInput = sum - result;
      },
      '*': () => {
        result = sum * lastInput;
        if (lastInput !== 0) {
          resultThatEqualToSum = result / lastInput;
        } else {
          resultThatEqualToSum = sum;
        }
        if (sum !== 0) {
          resultThatEqualToLastInput = result / sum;
        } else {
          resultThatEqualToLastInput = lastInput;
        }
      },
      '/': () => {
        if (lastInput !== 0) {
          result = sum / lastInput;
          resultThatEqualToSum = result * lastInput;
          resultThatEqualToLastInput = sum / result;
        }
      }
    };

    MATH_OPERATOR[operator]();
    if (resultThatEqualToSum === sum && resultThatEqualToLastInput === lastInput) {
      sum = result;
      return true;
    } else {
      return false;
    }

  }

let operatorAction = () => {
  let tempLastInput = lastInput;
  timesMultipliedBy10 = 0;

  for (var i = 0; i < MAX_CHARACTERS_INPUT; i++) {
    if (isCalculationRight()) {
      lastInput = tempLastInput;
      sum /= Math.pow(10, timesMultipliedBy10);
      break;
    } else {
      if (lastInput !== 0 || operator !== '/') {
        multiplyBy10();
      } else {
        lastInput = tempLastInput;
        sum /= Math.pow(10, timesMultipliedBy10);
        break;
      }
    }
  }
}

let backspace = () => {
  if (isNewNumber) {
    NUMBER_INPUT.innerHTML = NUMBER_INPUT.innerHTML.slice(0, NUMBER_INPUT.innerHTML.length - 1);
    if (NUMBER_INPUT.innerHTML === '') {
      NUMBER_INPUT.innerHTML = 0;
    }
  }
}

let clear = () => {
  NUMBER_INPUT.innerHTML = 0;
  CALCULATOR_DISPLAY.innerHTML = '';
  isNewNumber = true;
  operator = null;
  sum = 0;
  lastInput = 0;
}

let equalFunction = () => {
  if (operator !== null) {
    if (CALCULATOR_DISPLAY.innerHTML !== '') {
      lastInput = Number(NUMBER_INPUT.innerHTML);
      operatorAction();
      if (!sum.toString().includes('e')) {
        if ((lastInput !== 0 || operator !== '/') && timesMultipliedBy10 < MAX_CHARACTERS_INPUT) {
          NUMBER_INPUT.innerHTML = sum;
          CALCULATOR_DISPLAY.innerHTML = '';
        } else {
          mathError();
        }
      } else {
        mathError();
      }
    } else {
      operatorAction();
      if (!sum.toString().includes('e')) {
        if (timesMultipliedBy10 < MAX_CHARACTERS_INPUT) {
          NUMBER_INPUT.innerHTML = sum;
        } else {
          mathError();
        }
      } else {
        mathError();
      }
    }
    isNewNumber = false;
  }
}

let mathError = () => {
  NUMBER_INPUT.innerHTML = 'Math error';
  setTimeout(function() {
    clear();
  }, 1000);
}
