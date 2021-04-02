/**
 * This file represents all of the JavaScript
 * that will be used for the front-end
 * functionality for the Unconventional Calculator
 * application.
 *
 * @author Maximillian Schwarzmueller, Ben Silveston, Stephen Yeboah
 * @version 1.0
 */
const userInput = document.getElementById("input-number");
const addBtn = document.getElementById("btn-add");
const subtractBtn = document.getElementById("btn-subtract");
const multiplyBtn = document.getElementById("btn-multiply");
const divideBtn = document.getElementById("btn-divide");
const clearBtn = document.getElementById("btn-clear");

const showKeypadCheckbox = document.getElementById("show-keypad-checkbox");
const keypad = document.getElementById("keypad");

const currentResultOutput = document.getElementById("current-result");
const currentCalculationOutput = document.getElementById("current-calculation");

const showKeypad = () => {
	if (showKeypadCheckbox.checked == true) {
		keypad.style.display = "block";
	} else {
		keypad.style.display = "none";
	}
};

/**
 * Output the result for a given calculation.
 *
 * @param {integer} result - The result of the calculation
 * @param {string} text - The text output of the current calculation
 */
function outputResult(result, text) {
	currentResultOutput.textContent = result;
	currentCalculationOutput.textContent = text;
}

const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

/**
 * Get the user input and
 * return it as an integer.
 *
 * Note that all user input
 * by default is of a string
 * data-type.  This includes both
 * integers and floating-point
 * numbers.
 *
 * @returns {integer} - The user input
 */
const getUserNumberInput = () => {
	return parseInt(userInput.value);
};

/**
 * Create and write the output
 * for the given calculation.
 *
 * @param {string} operator - The operator used in the calculation
 * @param {integer} resultBeforeCalculation - The result before the next calculation
 * @param {integer} calculateNumber - The number to be used next in the calculation
 */
const createAndWriteOutput = (
	operator,
	resultBeforeCalculation,
	calculateNumber
) => {
	const calculationDescription = `${resultBeforeCalculation} ${operator} ${calculateNumber}`;
	outputResult(currentResult, calculationDescription);
};

/**
 * Log all calculations to the console.
 *
 * @param {string} operationIdentifier - The operation used in the specific calculation
 * @param {integer} previousResult - The result from the previous calculation
 * @param {integer} operationNumber - The second number used in the calculation (i.e. after the operator)
 * @param {integer} newResult - The updated result from the latest calculation
 */
const writeToLog = (
	operationIdentifier,
	previousResult,
	operationNumber,
	newResult
) => {
	const logEntry = {
		operation: operationIdentifier,
		previousResult: previousResult,
		number: operationNumber,
		result: newResult,
	};
	logEntries.push(logEntry);
	console.log(logEntries);
};

/**
 * Compute the result of a calculation
 * based on the given operator.
 *
 * Then display the output on the screen.
 *
 * Also log the calculation and the output
 * to the console.
 *
 * @param {string} calculationType - The type of calculation used
 * @returns {null} - if the operator does not exist or no number was entered as input
 */
const calculateResult = (calculationType) => {
	if (
		(calculationType !== "ADD" &&
			calculationType !== "SUBTRACT" &&
			calculationType !== "MULTIPLY" &&
			calculationType !== "DIVIDE") ||
		!enteredNumber
	) {
		return;
	} else {
		const enteredNumber = getUserNumberInput();
		const initialResult = currentResult;
		let mathsOperator;
		if (calculationType === "ADD") {
			currentResult += enteredNumber;
			mathsOperator = "+";
		} else if (calculationType === "SUBTRACT") {
			currentResult -= enteredNumber;
			mathsOperator = "-";
		} else if (calculationType === "MULTIPLY") {
			currentResult *= enteredNumber;
			mathsOperator = "*";
		} else if (calculationType === "DIVIDE") {
			currentResult /= enteredNumber;
			mathsOperator = "/";
		}
		createAndWriteOutput(mathsOperator, initialResult, enteredNumber);
		writeToLog(
			calculationType,
			initialResult,
			enteredNumber,
			currentResult
		);
	}
};

/**
 * All basic calculator functions.
 *
 * These are all needed as part
 * of the binding for each
 * button's associated event
 * listener.
 */
const add = () => {
	calculateResult("ADD");
};

const subtract = () => {
	calculateResult("SUBTRACT");
};

const multiply = () => {
	calculateResult("MULTIPLY");
};

const divide = () => {
	calculateResult("DIVIDE");
};

/**
 * Compute the given calculation
 * based on the given set of numbers.
 *
 * Like the individual operator functions above,
 * this function will be used as part of the
 * binding process during the program execution.
 *
 * @param {string} operation - The operator used in the calculation
 */
const calculate = (operation) => {
	const enteredNumber = getUserNumberInput();
	const initialResult = currentResult;
	let operator;
	if (operation === "ADD") {
		currentResult += enteredNumber;
		operator = "+";
		clearInput();
	} else if (operation === "SUBTRACT") {
		currentResult -= enteredNumber;
		operator = "-";
		clearInput();
	} else if (operation === "MULTIPLY") {
		currentResult *= enteredNumber;
		operator = "*";
		clearInput();
	} else if (operation === "DIVIDE") {
		currentResult /= enteredNumber;
		operator = "/";
		clearInput();
	}
	createAndWriteOutput(operator, initialResult, enteredNumber);
	writeToLog(operation, initialResult, enteredNumber, currentResult);
};

/**
 * Clear the input box before
 * entering the next number
 * in the calculation.
 *
 * Note that this
 * DOES NOT clear the result
 * and therefore re-start the
 * entire calculation.
 */
const clearInput = () => {
	if (userInput.value !== "") {
		userInput.value = "0";
	}
};

/**
 * Clear the input box
 * and any past calculations.
 */
const clearResult = () => {
	if (currentResult !== 0) {
		userInput.value = "0";
		currentResult = 0;
		outputResult(currentResult, 0);
	}
};

showKeypadCheckbox.addEventListener("click", showKeypad);
addBtn.addEventListener("click", calculate.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculate.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculate.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculate.bind(this, "DIVIDE"));
clearBtn.addEventListener("click", clearResult);
