const buttonsNumber = document.querySelectorAll('.btnNumber');
const buttonsOperator = document.querySelectorAll('.btnOperator');
const buttonEqual = document.querySelector('.btnEqual');
const buttonClear = document.querySelector('.btnClear');
const buttonBackspace = document.querySelector('.btnBackspace');
const buttonPoint = document.querySelector('.btnPoint');
const display = document.querySelector('.displayInfo');

let oldNumber = '';
let newNumber = '';
let operator = '';

buttonEqual.addEventListener('click', getResult);
buttonClear.addEventListener('click', clearAll);
buttonBackspace.addEventListener('click', deleteLastDigit);
buttonPoint.addEventListener('click', setPointNumber);
window.addEventListener('keydown', keyboardCheck);


buttonsNumber.forEach((button) => {
    button.addEventListener('click', (btn) => {
        numberCheck(btn.target.textContent);
    });
});
   
buttonsOperator.forEach((buttonOp) => {    
    buttonOp.addEventListener('click', (btnOp) => { 
        operatorCheck(btnOp.target.textContent);
    });
});

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {    
    return num1 / num2;
}

function getResult() {    
        if (oldNumber != '' && newNumber != '') {    
            operate(oldNumber, newNumber, operator);
        }
}


function operate(oldNum, newNum, op) {    
    oldNum = Number(oldNum);
    newNum = Number(newNum);   
    
    if (op === '+' ) {          
      oldNumber = add(oldNum, newNum);           
    }

    if (op === '-' ) {
        oldNumber = substract(oldNumber, newNumber);       
    }   

    if (op === 'x' ) {
        oldNumber = multiply(oldNum, newNum);           
    }

    if (op === '/' ) {
        if (newNum === 0) {            
            operator = '';
            newNumber = '';
            oldNumber = '';
            display.textContent = "Divided by 0";            
            return ;
        }

        oldNumber = divide(oldNum, newNum);             
    }
    
    oldNumber = Math.round(oldNumber * 100) / 100;   
    oldNumber = oldNumber.toString();
    display.textContent = oldNumber;
    operator = '';
    newNumber = '';
    checkNumberLength();
}

function clearAll() {
    oldNumber = '';
    newNumber = '';
    operator = '';
    display.textContent = '';
}

function operatorCheck(operatorReceived) {
    if (oldNumber === '') {
        oldNumber = newNumber;       
        newNumber = '';      
        operator = operatorReceived;        
        display.textContent = oldNumber;

    } else if (newNumber === '') {        
        newNumber = '';
        operator = operatorReceived;
        display.textContent = oldNumber;

    } else { 
        operate(oldNumber, newNumber, operator);
        operator = operatorReceived;
    }
}

function numberCheck(number) {
    if (oldNumber !== '' && newNumber !== '' && operator !== ''){
        display.textContent = newNumber;
    }
    if (newNumber.length <= 10) {
        newNumber += number;
        display.textContent = newNumber;
    }  
}

function checkNumberLength() {
    if (oldNumber.length <= 10) {
        display.textContent = oldNumber
    }

    if (oldNumber.length > 10) {
        display.textContent = oldNumber.slice(0, 10) + '...';
    }
}

function deleteLastDigit() {
    if (newNumber !== '') {
        newNumber = newNumber.slice(0, -1);
        display.textContent = newNumber;
    }
    return;  
}

function setPointNumber() {
    if (newNumber.includes('.')) {
        return;
    }

    newNumber += '.';
    display.textContent = newNumber;
}

function keyboardCheck(event) {
    let key = event.key;
   
    if (key <= 9) {
        numberCheck(key);
    }

    if (key === '+' || key === '-' || key === '/' || key === '*' || key === '=') {
        
        if (key === '=') {
            key = '+';
        }
        if (key === '*') {
            key = 'x';
        }
        operatorCheck(key);
        console.log(key)
    }

    if (key === 'Enter' && oldNumber != '' && newNumber != '') {
        operate(oldNumber, newNumber, operator);
    }

    if (key === 'Backspace') {
        deleteLastDigit();
    }

    if (key === '.') {
        setPointNumber();
    }

    if (key === 'Delete' || key === 'Escape') {
        clearAll();
    }     
}


