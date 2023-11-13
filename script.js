const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

let concatNums = "";
let operator = "";
let operation = [];
let displayVal = "";
let finalVal = 0;

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!screen.textContent.match(/[0-9]/) && btn.textContent.match(/[\/*+]/)) return; 
        if(screen.textContent.match(/[\/*\-+]$/) && btn.textContent.match(/[\/*+]/)) return;
        if(screen.textContent.match(/[\-]$/) && btn.textContent === "-") return;
        if(screen.textContent.length === 9 && btn.textContent !== "=") return;
        if(screen.textContent.match(/[\/*+]$/) && btn.textContent === "-") {
            concatNums += btn.textContent;
            display(btn.textContent);
            return;
        }
        if(btn.textContent === "=") {
            operate(operation);
            return;
        }
        storeVal(btn.textContent);
        display(btn.textContent);
    })
});

function add(...numbers) {
    let result = numbers.reduce((sum, currentVal) => parseInt(sum) + parseInt(currentVal), 0);
    finalResult(result);
}

function substract(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal -= numbers[i];
        result = parseInt(currentVal);
    }
    finalResult(result);
}

function multiply(...numbers) {
    let result = numbers.reduce((total, currentVal) => parseInt(total) * parseInt(currentVal), 1);
    finalResult(result);
}

function divide(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal /= numbers[i];
        result = parseInt(currentVal);
    }
    finalResult(result);
}

function operate([num1, operator, num2]) {
    if(operator === "+") return add(num1, num2);
    if(operator === "-") return substract(num1, num2);
    if(operator === "*") return multiply(num1, num2);
    if(operator === "/") return divide(num1, num2);
}

function storeVal(value) {
    if(value.match(/[0-9]/) || value === ".") {
        concatNums += value;
    } else {
        operation.push(parseInt(concatNums));
        concatNums = "";
        operator = value;
        operation.push(operator);
    }
    console.log(operation);
    if(operation.length > 3) {
        operate(operation);
    }
}

function display(value) {
    displayVal += value;
    screen.textContent = displayVal;
}

function finalResult(value) {
    displayVal = "";
    finalVal = parseInt(value);
    display(finalVal);
    operation.splice(0, 3);
    operation.unshift(finalVal);
}