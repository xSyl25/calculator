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