const buttonsNumber = document.querySelectorAll('.btnNumber');
const buttonsOperator = document.querySelectorAll('.btnOperator');
const buttonEqual = document.querySelector('.btnEqual');
const buttonClear = document.querySelector('.btnClear');
const buttonDelete = document.querySelector('.btnDelete');
const display = document.querySelector('.displayInfo');

let oldNumber = '';
let newNumber = '';
let tempNumber ='';
let operator = '';

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

buttonEqual.addEventListener('click', getResult);
buttonClear.addEventListener('click', clearAll);
buttonDelete.addEventListener('click', deleteLastDigit);

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
    console.log(oldNum)
    console.log(newNum)
    //console.log(op)
    
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
        oldNumber = divide(oldNum, newNum); 
        console.log(oldNumber)          
    }
    
    oldNumber = Math.round(oldNumber * 10) / 10;
    console.log( 'Rounded number is ' + oldNumber);
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
        //console.log(oldNumber);
        newNumber = '';
        //console.log(newNumber)
        operator = operatorReceived;
        console.log(operator)
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


