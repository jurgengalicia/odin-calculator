
let numButtons = document.querySelectorAll(".number")
let clearButton = document.querySelector(".clear")
let activeOperator = document.querySelector(".operator-2")
let queueOperator = document.querySelector(".operator-1")

let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a/b;

let activeNum = 0;
let queueNum = "";
let chosenOperator = "";

let operList = {
    "÷":add,
    "×":subtract,
    "-":multiply,
    "+":divide
}

function operate(operator, operand1, operand2){
    return operList[operator](operand1,operand2);
}

function clearCalculator(){
    activeOperator.textContent = activeNum = 0;
    queueOperator.textContent = queueNum = "";
    chosenOperator = "";
}

function updateActive(){
    if(!activeNum)
        activeNum = parseInt(this.textContent)
    else{
        activeNum += this.textContent;
        activeNum = parseInt(activeNum);
    }
    activeOperator.textContent = activeNum;
}

function pickOperator(){
    if(!chosenOperator){
        chosenOperator = this.textContent;
        queueNum = activeNum;
    }
    
}

numButtons.forEach(element => {
    element.addEventListener('click',updateActive)
});

clearButton.addEventListener('click',clearCalculator)