
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


let operList = {
    "+":add,
    "-":subtract,
    "×":multiply,
    "÷":divide
}

function allReady(){
    return operator1num && chosenOperator && operator2num;
}

function operate(){
    if(allReady()){
        queueOperator.textContent += ` ${activeOperator.textContent} ${this.textContent}`;
        activeOperator.textContent = operator1num = operList[chosenOperator](operator1num,operator2num);
    }
}

function clearCalculator(){
    operator1num = 0;
    chosenOperator = "";
    operator2num = 0;
    activeOperator.textContent = 0;
    queueOperator.textContent = "";
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
}

function pickOperator(){
    queueOperator.textContent = `${activeOperator.textContent} ${this.textContent}`;
    chosenOperator = this.textContent;
    resetActive = true;
}

numButtons.forEach(element => {
    element.addEventListener('click',updateActiveOp)
});
operatorButtons.forEach(element => {
    element.addEventListener('click',pickOperator)
});


clearButton.addEventListener('click',clearCalculator)
equalsButton.addEventListener('click',operate)