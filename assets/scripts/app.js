/**
 * This file represents all of the JavaScript
 * that will be used for the front-end
 * functionality for the Unconventional Calculator
 * application.
 *
 * @author Maximillian Schwarzmueller, Ben Silveston, Stephen Yeboah
 *
 */

const userInput = document.getElementById("input-number");
const addBtn = document.getElementById("btn-add");
const subtractBtn = document.getElementById("btn-subtract");
const multiplyBtn = document.getElementById("btn-multiply");
const divideBtn = document.getElementById("btn-divide");

const currentResultOutput = document.getElementById("current-result");
const currentCalculationOutput = document.getElementById("current-calculation");

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
 * @returns {integer} The user input
 */
const getUserNumberInput = () => {
	return parseInt(userInput.value);
};

/**
 * Create and write the output
 * for the given calculation.
 *
 * @param {string} operator
 * @param {integer} resultBeforeCalculation
 * @param {integer} calculateNumber
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
 * @param {string} operationIdentifier
 * @param {integer} previousResult
 * @param {integer} operationNumber
 * @param {integer} newResult
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
 * @param {string} calculationType
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
