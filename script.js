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

    if(textContentScreen.length < 8) {
        textScreen.textContent = (textContentScreen === '0') ?
            number : textScreen.textContent + number;
    }
}

function executeCommand(command) {
    if(command === 'C') {
        reset();
    } else if(command === '=') {
        const textScreen = document.querySelector('.screen__text');

        if(firstNumber != null) {
            secondNumber = parseInt(textScreen.textContent);
            textScreen.textContent = operate(firstNumber, secondNumber, operation);
        }
    } else {
        addOperator(command);
    }
}

function reset() {
    const textScreen = document.querySelector('.screen__text');
    textScreen.textContent = '0';

    firstNumber = null;
    secondNumber = null;
    operation = null;
}

function addOperator(operatorSymbol) {
    const textScreen = document.querySelector('.screen__text');

    firstNumber = parseInt(textScreen.textContent);
    operation = operatorSymbol;

    textScreen.textContent = '0';
}

const buttons = document.querySelectorAll('.keyboard__button');

buttons.forEach(button => button.addEventListener('click', e => {
    const buttonText = e.target.textContent;

    if(isNaN(buttonText)) {
        executeCommand(buttonText)
    } else {
        addNumberScreen(buttonText);
    }
}));

let firstNumber = null;
let secondNumber = null;
let operation = null;

const operations = {
    '+': add,
    '-': subtract,
    'x': multiply,
    '/': divide
};
