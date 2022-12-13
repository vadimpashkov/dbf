const chalk = require('chalk');

const successColor = chalk.greenBright.inverse;
const errorColor = chalk.redBright.inverse;
const warningColor = chalk.yellowBright.inverse;

module.exports = {
	successColor,
	errorColor,
	warningColor,
};
