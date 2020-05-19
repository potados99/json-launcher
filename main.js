const fs = require('fs');
const pipe = require('./pipe');
const question = require('./io');

function getTargetFilePath() {
	const arguments = process.argv.slice(2);

	if (arguments.length < 1) {
		throw new Error('Not enough arguments!');
	}

	return arguments[0];
}

function getJSONString(filePath) {
	const content = fs.readFileSync(filePath, 'utf8');

	return content;
}

function evaulateJSONAsObject(JSONString) {
	const codeToEvaluate = '_parsedObject = ' + JSONString;

	eval(codeToEvaluate);

	return _parsedObject;
}

async function runInterpreterModeWithObject(object) {
	while (true) {
		try {
			await evaluateUserInput(object)
		} catch (e) {
			console.log(e);
		}
	}
}

async function evaluateUserInput(object) {
	const input = await question('> ');

	const commandToEvaluate = 'object.' + input;

	const result = eval(commandToEvaluate);
	console.log(result);
}

function onFail(message) {
	console.log(`Oh no! Error occurrd: ${message}\n`);

	usage();
}

function usage() {
	console.log('Usage: node main.js [JSON file path]');
}

pipe(
	getTargetFilePath,
	getJSONString,
	evaulateJSONAsObject,
	runInterpreterModeWithObject,
	onFail
);
