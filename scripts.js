
let numButtons = document.querySelectorAll(".number")
let operatorButtons = document.querySelectorAll(".operator")
let equalsButton = document.querySelector(".equals")
let clearButton = document.querySelector(".clear")
let deleteButton = document.querySelector(".delete")
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
let resetCalc = false;
let operationReady = false;
let operationReadys = false;

let keyToOperConversion = {
    "+":"+",
    "-":"-",
    "*":"×",
    "/":"÷",
}

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

function parseDisplayNum(){
    return activeOperator.textContent.includes(".") ? parseFloat(activeOperator.textContent) : parseInt(activeOperator.textContent);
}

function operate(){
    if(divideByZero()) return;
    else if(operationReady){
        queueOperator.textContent += ` ${activeOperator.textContent} =`;
        activeOperator.textContent = operator1num = operList[chosenOperator](operator1num,operator2num);
        operationReady = false;
        resetCalc = true;
        resetActive = true;
    }
}

function clearCalculator(){
    operator1num = 0;
    chosenOperator = "";
    operator2num = 0;
    activeOperator.textContent = 0;
    queueOperator.textContent = "";
    resetActive = false;
    operationReady = false;
    resetCalc = false;
}

function updateActiveOp(keypress){
    let chosenNum = typeof keypress === "string" ? keypress : this.textContent
    if(resetCalc)
        clearCalculator();
    if(activeOperator.textContent === "0" || resetActive){
        activeOperator.textContent = chosenNum;
        resetActive = false;
    }else{
        activeOperator.textContent += chosenNum;
    }

    if(chosenOperator)
        operator2num = parseDisplayNum();
    else
        operator1num = parseDisplayNum();

    if(operator2num && chosenOperator || activeOperator.textContent === "0"){
        operationReady = true;
    }
}

function pickOperator(keyOperator){

    let tentativeOperator = typeof keyOperator === "string" ? keyToOperConversion[keyOperator] : this.textContent;

    resetCalc = false;
    if(!resetActive && divideByZero()) return;
    else if(operationReady){
        let chainSol = operList[chosenOperator](operator1num,operator2num);
        queueOperator.textContent = ` ${chainSol} ${tentativeOperator}`;
        activeOperator.textContent = chainSol;
        operator1num = chainSol;
        operator2num = 0;
        operationReady = false;
    }else{
        queueOperator.textContent = `${activeOperator.textContent} ${tentativeOperator}`;
    }
    chosenOperator = tentativeOperator;
    resetActive = true;    
}

function decimalOperator(){
    if(resetCalc) clearCalculator();
     else if(resetActive){
        activeOperator.textContent = "0.";
        resetActive = false;
    }
    if(activeOperator.textContent.includes("."))
        return;
    else
        activeOperator.textContent += ".";
}

function deleteOperator(){
    if(activeOperator.textContent === "0"){
        return;
    }else if(activeOperator.textContent.length == 1){
        activeOperator.textContent = 0;
    }else{
        activeOperator.textContent = activeOperator.textContent.substring(0, activeOperator.textContent.length - 1);
    }
    operator1num = parseDisplayNum();
}

function keyboardInputs(e){
    if(e.key >= 0 && e.key <=9) updateActiveOp(e.key)
    else if(e.key === ".") decimalOperator();
    else if(e.key === "Backspace") deleteOperator();
    else if(e.key === "Enter" || e.key === "=") operate();
    else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") pickOperator(e.key);

}

window.addEventListener('keydown', keyboardInputs);

numButtons.forEach(element => {
    element.addEventListener('click',updateActiveOp)
});
operatorButtons.forEach(element => {
    element.addEventListener('click',pickOperator)
});

clearButton.addEventListener('click',clearCalculator)
equalsButton.addEventListener('click',operate)
decimalButton.addEventListener('click',decimalOperator)
deleteButton.addEventListener('click',deleteOperator)