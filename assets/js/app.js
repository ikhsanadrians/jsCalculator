const calcItems = document.querySelectorAll('.calc-item');
const calcEval = document.querySelector('.calc-eval-result');
const calcCurrent = document.querySelector('.calc-result-preview');

const operators = ['+', '-', '*', '/', '%'];
calcEval.textContent = '0';
let lastCharIsOperator = false;
let twoNumberOp = false;
let hasDecimal = false;
let isNegative = false;

function reset(){
    twoNumberOp = false;
    hasDecimal = false;
}



calcItems.forEach(item => {
    item.addEventListener('click', () => {
        const itemText = item.textContent;
        const itemIndex = item.tabIndex;

        if (calcEval.textContent === '0' && itemText !== '.') calcEval.textContent = '';

        if (itemIndex < 11) {
            if (itemText === '.') {
                if (!hasDecimal) {
                    calcEval.innerText += itemText;
                    hasDecimal = true;
                }
            } else {
                calcEval.innerText += itemText;
                lastCharIsOperator = false;
            }

            if(calcEval.textContent.includes('-',0)) lastCharIsOperator = false
            

        } else {
            if (itemIndex === 19) {
                if (calcEval.textContent !== '0') {
                    const result = eval(calcEval.textContent);
                    if (typeof result === 'number' && !Number.isInteger(result)) calcEval.innerText = result.toFixed(1);
                    else calcEval.innerText = result; 
                    twoNumberOp = false;
                    hasDecimal = false;
                }
            } else if (itemIndex === 11) {
                calcEval.innerText = '0';
                twoNumberOp = false;
            } else if (itemIndex === 14) {
                if (calcEval.textContent !== '0') {
                    const currentText = calcEval.innerText;
                    const newText = currentText.slice(0, -1);
                    calcEval.innerText = newText;
                    if (newText.length == 0 && calcEval.textContent == 0) calcEval.innerText = '0';
                reset()
                }
            } else if (itemIndex === 20) {
                if (isNegative) {
                    calcEval.innerText = calcEval.innerText.substring(1);
                    isNegative = false;
                } else {
                    calcEval.innerText = '-' + calcEval.innerText;
                    isNegative = true;
                }
               reset()
            } else {
                if (!twoNumberOp && !lastCharIsOperator) {
                    if (calcEval.textContent !== '0') calcEval.innerText += itemText;  
                    lastCharIsOperator = true;
                    twoNumberOp = true;
                    hasDecimal = false;
                }
            }
        }
    });
});
