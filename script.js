const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

let num1 = "";
let num2 = "";
let operator = "";
let displayValue = "";
let finalValue = 0;

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(screen.textContent === "" && btn.textContent.match(/[\/*+]/)) return; 
        if(screen.textContent.match(/[\/*\-+]$/) && btn.textContent.match(/[\/*+]/)) return;
        if(screen.textContent.match(/[\-]$/) && btn.textContent === "-") return;
        if(screen.textContent.length === 15 && !btn.textContent.match(/[C=DEL]/)) return;
        if(screen.textContent === "ERROR" && btn.textContent !== "C") return;
        if(btn.textContent === "C") {
            return clear();
        }
        if(btn.textContent === "DEL") {
            return del();
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
    displayValue = "";
    finalValue = 0;
    screen.textContent = "";
}

function del() {
    screen.textContent = screen.textContent.slice(0, -1);
    displayValue = displayValue.slice(0, -1);
    
    if(operator === "") {
        let delVal = num1.split("").slice(0, -1).join().replaceAll(",", "");
        return num1 = delVal;
    } else if(operator !== "" && num2 === "") {
        let delVal = operator.split("").slice(0, -1).join().replaceAll(",", "");
        return operator = delVal;
    } else {
        let delVal = num2.split("").slice(0, -1).join().replaceAll(",", "");
        return num2 = delVal;
    }
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
    if(!value.match(/[\/*\-+=]/) && operator === "") {
        if(value === "." && num1.includes(".")) return;
        return num1 += value;
    }
    if(value.match(/[\/*\-+=]/)) {
        if(value === "=" && num2 === "") {
            return;
        } else if(value === "=" && num2 !== "") {
            operate([num1, operator, num2]);
            operator = "";
            return num2 = "";
        }
        if(operator === "") {
            return operator = value;
        } else if(value === "-" && num2 == ""){
            return num2 = value;
        } else {
            operate([num1, operator, num2]);
            operator = value;
            return num2 = "";
        }
    }
    if(!value.match(/[\/*+=]/) && operator !== "") {
        if(value === "." && num2.includes(".")) return;
        return num2 += value;
    }
}

function isWhole(number) {
    if(number % 1 !== 0) return finalResult(number.toFixed(2));
    if(number % 1 === 0) return finalResult(Math.round(number));
}

function display(dVal) {
    if(screen.textContent.length < 11) screen.style.fontSize = "40px";
    if(screen.textContent.length > 11) screen.style.fontSize = "32px";
    displayValue += dVal;
    screen.textContent = displayValue;
}

function finalResult(fVal) {
    if(fVal === "Infinity") return error();
    displayValue = "";
    finalValue = fVal;
    display(finalValue);
    num1 = finalValue.toString();
}

const error = () => {
    clear();
    screen.textContent = "ERROR";
}