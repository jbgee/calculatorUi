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
        currentCalcDisplay.textContent += button.target.textContent;
        operandB = Number(currentCalcDisplay.textContent);
    });
}

for(const operation of operatorButtons){
    operation.addEventListener('click',operation => {
        operator = operation.target.textContent;

        if(operandA==null){
            operandA = Number(currentCalcDisplay.textContent);
            pastCalcDisplay.textContent = `${operandA} ${operator}`;
            operandB = null;

        }else if(operandA&&operandB){
            let parsedEq = pastCalcDisplay.textContent.split(" ");
            if (parsedEq.length ==2){
                updateResult(operandA,operandB,operator);
            }
            else{
                operandA = Number(currentCalcDisplay.textContent);
                pastCalcDisplay.textContent = `${operandA} ${operator}`;
                operandB = null;    
            }
        }else{
            pastCalcDisplay.textContent = `${operandA} ${operator}`;
        }
        
    })
}

const equalButton = document.querySelector('#equalButton');
equalButton.addEventListener('click',() => {
    if(operandA&&operandB){
        let parsedEq = pastCalcDisplay.textContent.split(" ");
        if (parsedEq.length ==2){
            let operator = parsedEq[1];
            updateResult(operandA,operandB,operator);
        }
    }
});

function updateResult(operand1,operand2,operator){
    let result = operate(operand1,operand2,operator);
    pastCalcDisplay.textContent = `${operand1} ${operator} ${operand2} =`; 
    currentCalcDisplay.textContent = `${result}`
    operandB = null;
    operandA = result;
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
    return parseFloat((operand1 / operand2).toFixed(9));
}

function multiply(operand1,operand2){
    let product = operand1 * operand2;
    let productLength = operand1.toString().length + operand2.toString().length;
    let roundedProduct = parseFloat((product).toFixed(productLength));
    if(roundedProduct.toString().length > 9){
        let sciProduct = roundedProduct.toExponential();
        let splitSciNotation = sciProduct.toString().split("e");
        let sigFigs = 9-splitSciNotation[1].length;
        console.log(`sigfig ${sigFigs}`);
        return roundedProduct.toFixed(sigFigs);

    }

    return roundedProduct;
}

function mod(operand1,operand2){
    return operand1 % operand2;
}