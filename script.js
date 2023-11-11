const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");


btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if(!screen.textContent.match(/[0-9]$/) && btn.textContent.match(/[÷x+=]/)) return; 
        if(screen.textContent.match(/[÷x\-+]$/) && btn.textContent.match(/[÷x+]$/)) return;
        if(screen.textContent.match(/[\-]$/) && btn.textContent.match(/[\-]/)) return;
        if(screen.textContent.length === 18) return;
        display(btn.textContent);
    })
});

let num1;
let num2;
let operator;
let displayVal = [];

function add(...numbers) {
    return numbers.reduce((sum, currentVal) => sum + currentVal, 0);
}

function substract(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal -= numbers[i];
        result = currentVal;
    }
    return result;
}

function multiply(...numbers) {
    return numbers.reduce((total, currentVal) => total * currentVal, 1);
}

function divide(...numbers) {
    let currentVal = numbers[0];
    let result;
    for(i = 1; i < numbers.length; i++) {
        currentVal /= numbers[i];
        result = currentVal;
    }
    return result;
}

function operate(num1, operator, num2) {
    if(operator === "+") add(num1, num2);
    if(operator === "-") substract(num1, num2);
    if(operator === "*") multiply(num1, num2);
    if(operator === "/") divide(num1, num2);
}

function display(value) {
    if(screen.textContent.length === 9) screen.style.fontSize = "44px";
    if(screen.textContent.length === 12) screen.style.fontSize = "35px";
    if(screen.textContent.length === 15) screen.style.fontSize = "29px";
    displayVal = screen.textContent += value;
}