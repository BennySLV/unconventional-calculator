const userInput = document.getElementById("input-number");
const addBtn = document.getElementById("btn-add");
const subtractBtn = document.getElementById("btn-subtract");
const multiplyBtn = document.getElementById("btn-multiply");
const divideBtn = document.getElementById("btn-divide");

const currentResultOutput = document.getElementById("current-result");
const currentCalculationOutput = document.getElementById("current-calculation");

function outputResult(result, text) {
	currentResultOutput.textContent = result;
	currentCalculationOutput.textContent = text;
}

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

const getUserNumberInput = () => {
	return parseInt(userInput.value);
};

const createAndWriteOutput = (
	operator,
	resultBeforeCalculation,
	calculateNumber
) => {
	const calculationDescription = `${resultBeforeCalculation} ${operator} ${calculateNumber}`;
	outputResult(currentResult, calculationDescription);
};
