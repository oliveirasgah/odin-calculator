function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(number1, number2, operator) {
    return operations[operator](number1, number2);
}

function addNumberScreen(number) {
    const textScreen = document.querySelector('.screen__text');
    const textContentScreen = textScreen.textContent;

    if (textContentScreen.length < 8 || resetScreen) {
        textScreen.textContent = (textContentScreen === '0' || resetScreen) ?
            number : textScreen.textContent + number;
        resetScreen = false;
    }
}

function executeCommand(command) {
    let textScreenReturn;

    if (command === 'C') {
        reset();
    } else if (!blockAll) {
        if (command === '=') {
            const textScreen = document.querySelector('.screen__text');

            if (firstNumber != null) {
                secondNumber = parseInt(textScreen.textContent);
                textScreenReturn = operate(
                    firstNumber,
                    secondNumber,
                    operation
                ).toString();

                if (textScreenReturn === 'Infinity'
                    || textScreenReturn.length > 8) {
                    textScreen.textContent = 'Error';
                    blockAll = true;
                } else {
                    textScreen.textContent = textScreenReturn;
                }
            }
        } else {
            addOperator(command);
        }
    }
}

function reset() {
    const textScreen = document.querySelector('.screen__text');
    textScreen.textContent = '0';

    firstNumber = null;
    secondNumber = null;
    operation = null;
    resetScreen = true;
    blockAll = false;
}

function addOperator(operatorSymbol) {
    const textScreen = document.querySelector('.screen__text');
    let textContent = textScreen.textContent;

    resetScreen = true;

    if (firstNumber != null) {
        secondNumber = parseInt(textContent);
        textContent = operate(firstNumber, secondNumber, operation).toString();
    }

    firstNumber = parseInt(textContent);
    operation = operatorSymbol;

    if (textContent === 'Infinity'
        || textContent.length > 8) {
        textScreen.textContent = 'Error';
        blockAll = true;
    } else {
        textScreen.textContent = textContent;
    }
}

const buttons = document.querySelectorAll('.keyboard__button');

buttons.forEach(button => button.addEventListener('click', e => {
    const buttonText = e.target.textContent;

    if (isNaN(buttonText)) {
        executeCommand(buttonText)
    } else if(!blockAll) {
        addNumberScreen(buttonText);
    }
}));

let firstNumber = null;
let secondNumber = null;
let operation = null;
let resetScreen = true;
let blockAll = false;

const operations = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '/': divide
};
