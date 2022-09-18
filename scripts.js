
let numButtons = document.querySelectorAll(".number")
let operatorButtons = document.querySelectorAll(".operator")
let equalsButton = document.querySelector(".equals")
let clearButton = document.querySelector(".clear")
let activeOperator = document.querySelector(".operator-2")
let queueOperator = document.querySelector(".operator-1")

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
    }
}

function operate(){
    divideByZero();
    if(operationReady){
        queueOperator.textContent += ` ${activeOperator.textContent} ${this.textContent}`;
        activeOperator.textContent = operator1num = operList[chosenOperator](operator1num,operator2num);
        operationReady = false;
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
    if(activeOperator.textContent === "0" || resetActive){
        activeOperator.textContent = this.textContent;
        resetActive = false;
    }else{
        activeOperator.textContent += this.textContent;
    }

    if(chosenOperator)
        operator2num = parseInt(activeOperator.textContent);
    else
        operator1num = parseInt(activeOperator.textContent);

    if(this.textContent === "0" || operator2num && chosenOperator){
        operationReady = true;
    }
}

function pickOperator(){
    if(chosenOperator === "÷" && operator2num === 0)
        divideByZero();
    else{
        if(operationReady){
            let chainSol = operList[chosenOperator](operator1num,operator2num);
            queueOperator.textContent = ` ${chainSol} ${this.textContent}`;
            activeOperator.textContent = chainSol;
            operator1num = chainSol;
            operator2num = 0;
            operationReady = false;
            divideByZero();
        }else{
            queueOperator.textContent = `${activeOperator.textContent} ${this.textContent}`;
        }
        chosenOperator = this.textContent;
        resetActive = true;    
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