const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

let num1 = "";
let num2 = "";
let operator = "";
let operation = [];
let displayValue = "";
let finalValue = 0;

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(screen.textContent === "" && btn.textContent.match(/[\/*+]/)) return; 
        if(screen.textContent.match(/[\/*\-+]$/) && btn.textContent.match(/[\/*+]/)) return;
        if(screen.textContent.match(/[\-]$/) && btn.textContent === "-") return;
        if(screen.textContent.length === 15 && !btn.textContent.match(/[C=]/)) return;
        if(btn.textContent === "C") {
            return clear();
        }
        if(btn.textContent === "=") {
            return storeVal(btn.textContent);
        }
        storeVal(btn.textContent);
        display(btn.textContent);
    })
});

function clear() {
    num1 = "";
    num2 = "";
    operator = "";
    operation = [];
    displayValue = "";
    finalValue = 0;
    screen.textContent = "";
}

function add(num1, num2) {
    let numbers = [num1, num2];
    let result = numbers.reduce((sum, currentVal) => parseFloat(sum) + parseFloat(currentVal), 0);
    isWhole(result);
}

function substract(num1, num2) {
    let numbers = [num1, num2];
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal -= numbers[i];
        result = parseFloat(currentVal);
    }
    isWhole(result);
}

function multiply(num1, num2) {
    let numbers = [num1, num2];
    let result = numbers.reduce((total, currentVal) => parseFloat(total) * parseFloat(currentVal), 1);
    isWhole(result);
}

function divide(num1, num2) {
    let numbers = [num1, num2];
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
    if(value === "=" && num2 !== "") {
        operation.push(num2);
        operate([num1, operator, num2]);
        operator = "";
        return num2 = "";
    }
    if(!value.match(/[\/*\-+=]/) && operator === "") {
        return num1 += value;
    }
    if(value.match(/[\/*\-+]/)) {
        if(operator === "") {
            operator = value;
            operation.push(num1);
            return operation.push(operator);
        } else {
            operation.push(num2);
            operate([num1, operator, num2]);
            operator = value;
            operation.push(operator);
            return num2 = "";
        }
    }
    if(!value.match(/[\/*\-+=]/) && operator !== "") {
        return num2 += value;
    }
}

function isWhole(number) {
    if(number % 1 !== 0) {
        return finalResult(number.toFixed(2));
    } else {
        return finalResult(Math.round(number));
    }
}

function display(dVal) {
    if(screen.textContent.length < 12) screen.style.fontSize = "42px";
    if(screen.textContent.length > 12) screen.style.fontSize = "36px";
    displayValue += dVal;
    screen.textContent = displayValue;
}

function finalResult(fVal) {
    if(typeof fVal !== "number") return error();
    displayValue = "";
    finalValue = fVal;
    display(finalValue);
    num1 = finalValue;
    operation.splice(0, 3);
    operation.unshift(num1);
}

const error = () => {
    screen.textContent = "ERROR!";
}