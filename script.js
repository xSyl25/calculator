let num1;
let num2;
let operator;

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