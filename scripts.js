
let numButtons = document.querySelectorAll(".number")
let operatorButtons = document.querySelectorAll(".operator")
let equalsButton = document.querySelector(".equals")
let clearButton = document.querySelector(".clear")
let activeOperator = document.querySelector(".operator-2")
let queueOperator = document.querySelector(".operator-1")
let decimalButton = document.querySelector(".period")

let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;
let bottomText = activeOperator.textContent;


let operator1num = 0;
let chosenOperator = "";
let operator2num = 0;
let resetActive = false;
let operationReady = false
let resetCalc = false;


let operList = {
    "+":add,
    "-":subtract,
    "×":multiply,
    "÷":divide
}

function divideByZero(){
    if(chosenOperator === "÷" && operator2num === 0){
        clearCalculator();
        alert("Cannot divide by Zero");
        return true;
    }
    return false;
}

function operate(){
    if(divideByZero())
        return;
    else if(operationReady){
        queueOperator.textContent += ` ${activeOperator.textContent} ${this.textContent}`;
        activeOperator.textContent = operator1num = operList[chosenOperator](operator1num,operator2num);
        operationReady = false;
        resetCalc = true;
    }
}

function clearCalculator(){
    operator1num = 0;
    chosenOperator = "";
    operator2num = 0;
    activeOperator.textContent = 0;
    queueOperator.textContent = "";
    resetActive = false;
    operationReady = false
}

function updateActiveOp(){
    if(resetCalc){
        clearCalculator();
        resetCalc = false;
    }
        
    if(activeOperator.textContent === "0" || resetActive){
        activeOperator.textContent = this.textContent;
        resetActive = false;
    }else{
        activeOperator.textContent += this.textContent;
    }

    if(chosenOperator)
        operator2num = activeOperator.textContent.includes(".") ? parseFloat(activeOperator.textContent) : parseInt(activeOperator.textContent);
    else
        operator1num = activeOperator.textContent.includes(".") ? parseFloat(activeOperator.textContent) : parseInt(activeOperator.textContent);

    if(operator2num && chosenOperator){
        operationReady = true;
    }
}

function pickOperator(){
    if(divideByZero())
        return;
    else if(operationReady){
        console.log(operList[chosenOperator])
        let chainSol = operList[chosenOperator](operator1num,operator2num);
        queueOperator.textContent = ` ${chainSol} ${this.textContent}`;
        activeOperator.textContent = chainSol;
        operator1num = chainSol;
        operator2num = 0;
        operationReady = false;

    }else{
        queueOperator.textContent = `${activeOperator.textContent} ${this.textContent}`;
    }
    chosenOperator = this.textContent;
    resetActive = true;    
}

function decimalOperator(){
    if(activeOperator.textContent.includes("."))
        return;
    else{
        activeOperator.textContent += this.textContent;
        
    }
}

numButtons.forEach(element => {
    element.addEventListener('click',updateActiveOp)
});
operatorButtons.forEach(element => {
    element.addEventListener('click',pickOperator)
});


clearButton.addEventListener('click',clearCalculator)
equalsButton.addEventListener('click',operate)
decimalButton.addEventListener('click',decimalOperator)