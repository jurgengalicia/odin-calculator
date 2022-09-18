
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

let activeNum = 0;
let queueText = "";
let queueNum = "";
let chosenOperator = "";
let operator1Ready = false;
let operator2Ready = false;

let operList = {
    "+":add,
    "-":subtract,
    "×":multiply,
    "÷":divide
}

function operate(){
    if(chosenOperator && operator1Ready && operator2Ready){
        queueText += `${activeOperator.textContent} =`;
        activeOperator.textContent = activeNum = operList[chosenOperator](queueNum,activeNum);    
    }
    operator2Ready = false;
}

function clearCalculator(){
    activeOperator.textContent = activeNum = 0;
    queueOperator.textContent = queueNum = "";
    chosenOperator = "";
}

function updateActive(){
    if(operator1Ready && chosenOperator && !operator2Ready){
        operator2Ready = true;
        activeNum = 0;
        activeNum = parseInt(this.textContent)
    } else{
        activeNum += this.textContent;
        activeNum = parseInt(activeNum);
    }
    activeOperator.textContent = activeNum;
}

function pickOperator(){
    if(!chosenOperator){
        chosenOperator = this.textContent;
        queueOperator.textContent = `${activeNum} ${this.textContent}`;
        queueNum = activeNum;
        operator1Ready = true;
    }else{
        chosenOperator = this.textContent;
        queueOperator.textContent = queueOperator.textContent.slice(0, -1) + ` ${this.textContent}`;
    }
    
    
}

numButtons.forEach(element => {
    element.addEventListener('click',updateActive)
});
operatorButtons.forEach(element => {
    element.addEventListener('click',pickOperator)
});


clearButton.addEventListener('click',clearCalculator)
equalsButton.addEventListener('click',operate)