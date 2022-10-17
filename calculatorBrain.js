const numberButtons = document.querySelectorAll('.numberButton');
const operatorButtons = document.querySelectorAll('.operationButton');
const pastCalcDisplay = document.querySelector('#pastCalc');
const currentCalcDisplay = document.querySelector('#currentCalc');
let operandA = null;
let operandB = null;
for(const button of numberButtons){
    button.addEventListener('click',button => {
        if(operandB == null){
            currentCalcDisplay.textContent = "";
        }
        if(currentCalcDisplay.textContent.length<11){
            currentCalcDisplay.textContent += button.target.textContent;
            operandB = Number(currentCalcDisplay.textContent);
        }
    });
}

for(const operation of operatorButtons){
    operation.addEventListener('click',operation => {
        newOperator = operation.target.textContent;

        if(operandA==null){
            operandA = Number(currentCalcDisplay.textContent);
            pastCalcDisplay.textContent = `${operandA} ${newOperator}`;
            currentCalcDisplay.textContent = "";
            operandB = null;

        }else if(operandA&&operandB){
            let parsedEq = pastCalcDisplay.textContent.split(" ");
            if (parsedEq.length ==2){
                updateResultOperator(operandA,operandB,parsedEq[1],newOperator);
            }
            else{
                operandA = Number(currentCalcDisplay.textContent);
                pastCalcDisplay.textContent = `${operandA} ${newOperator}`;
                operandB = null;    
            }
        }else{
            pastCalcDisplay.textContent = `${operandA} ${newOperator}`;
        }
        
    })
}

const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click',() => {
    if(operandA&&operandB){
        let parsedEq = pastCalcDisplay.textContent.split(" ");
        if (parsedEq.length ==2){
            let operator = parsedEq[1];
            updateResultEqual(operandA,operandB,operator);
        }
    }
});

function updateResultOperator(operand1,operand2,previousOperator,newOperator){
    let result = operate(operand1,operand2,previousOperator);
    pastCalcDisplay.textContent = `${result} ${newOperator}`; 
    operandB = null;
    operandA = result;
    if(result.toString().length > 11){
        let sciResult = result.toExponential();
        let splitSciNotation = sciResult.toString().split("e");
        let sigFigs = 9-splitSciNotation[1].length;
        result = result.toPrecision(sigFigs);
    
    }
    currentCalcDisplay.textContent = `${result}`;
}

function updateResultEqual(operand1,operand2,operator){
    let result = operate(operand1,operand2,operator);
    pastCalcDisplay.textContent = `${operand1} ${operator} ${operand2} =`; 
    operandB = null;
    operandA = result;
    if(result.toString().length > 11){
        let sciResult = result.toExponential();
        let splitSciNotation = sciResult.toString().split("e");
        let sigFigs = 9-splitSciNotation[1].length;
        result = result.toPrecision(sigFigs);
    
    }
    currentCalcDisplay.textContent = `${result}`;
}

const clearButton = document.querySelector('#clearButton');
clearButton.addEventListener('click',() => {
    currentCalcDisplay.textContent = '';
    pastCalcDisplay.textContent = '';
    operandA = null
    operandB = null;
})

const deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', () =>{
    currentCalcDisplay.textContent = currentCalcDisplay.textContent.slice(0,-1);
    operandB = Number(currentCalcDisplay.textContent);
})

function operate(operand1,operand2,operator){
    if(operator==='+'){
        return add(operand1,operand2);
    }else if(operator==='-'){
        return subtract(operand1,operand2);
    }else if(operator==='/'){
        return divide(operand1,operand2);
    }else if(operator==='x'){
        return multiply(operand1,operand2);
    }else if(operator==='%'){
        return mod(operand1,operand2);
    }

}

function add(operand1,operand2){
    return operand1 + operand2;
}

function subtract(operand1,operand2){
    return operand1 - operand2;
}

function divide(operand1,operand2){
    return parseFloat((operand1 / operand2).toPrecision(9));
}

function multiply(operand1,operand2){
    return operand1 * operand2;
}

function mod(operand1,operand2){
    return operand1 % operand2;
}