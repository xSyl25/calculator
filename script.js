const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

let concatNum = "";
let operator = "";
let operation = [];
let displayVal = "";
let finalVal = 0;

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!screen.textContent.match(/[0-9]/) && btn.textContent.match(/[\/*+]/)) return; 
        if(screen.textContent.match(/[\/*\-+]$/) && btn.textContent.match(/[\/*+]/)) return;
        if(screen.textContent.match(/[\-]$/) && btn.textContent === "-") return;
        if(screen.textContent.length === 12 && btn.textContent !== "=") return;
        if(screen.textContent.match(/[\/*+]$/) && btn.textContent === "-") {
            concatNum += btn.textContent;
            return display(btn.textContent);
        }
        if(btn.textContent === "C") {
            return clear();
        }
        if(btn.textContent === "=") {
            return operate(operation);
        }
        storeVal(btn.textContent);
        display(btn.textContent);
    })
});

function clear() {
    concatNum = "";
    operator = "";
    operation = [];
    displayVal = "";
    finalVal = 0;
    screen.textContent = "";
}

function add(...numbers) {
    let result = numbers.reduce((sum, currentVal) => parseFloat(sum) + parseFloat(currentVal), 0);
    isWhole(result);
}

function substract(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal -= numbers[i];
        result = parseFloat(currentVal);
    }
    isWhole(result);
}

function multiply(...numbers) {
    let result = numbers.reduce((total, currentVal) => parseFloat(total) * parseFloat(currentVal), 1);
    isWhole(result);
}

function divide(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal /= numbers[i];
        result = parseFloat(currentVal);
    }
    isWhole(result);
}

function operate([num1, operator, num2]) {
    if(operator === "+") return add(num1, num2);
    if(operator === "-") return substract(num1, num2);
    if(operator === "*") return multiply(num1, num2);
    if(operator === "/") return divide(num1, num2);
}

function storeVal(value) {
    if(value.match(/[0-9]/) || value === ".") {
        concatNum += value;
    } else {
        operation.push(concatNum);
        concatNum = "";
        operator = value;
        operation.push(operator);
    }
    if(operation.length > 3) {
        operate(operation);
    }
}

function isWhole(value) {
    if(value % 1 !== 0) {
        return finalResult(value.toFixed(2));
    } else {
        return finalResult(Math.round(value));
    }
}

function display(value) {
    displayVal += value;
    screen.textContent = displayVal;
}

function finalResult(value) {
    displayVal = "";
    finalVal = value;
    display(finalVal);
    operation.splice(0, 3);
    operation.unshift(finalVal);
}