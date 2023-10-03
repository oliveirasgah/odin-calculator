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
        const textScreen = document.querySelector('.screen__text');
        textScreen.textContent = '0';
    }
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
