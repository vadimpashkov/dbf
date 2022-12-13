const { resolve } = require('path');
const { errorColor, successColor, warningColor } = require('./chalk.js');

const { readFile, writeFile } = require('fs/promises');
const { parseFilePath } = require('./utils.js');

const PATH_TO_JSON_CONFIG = resolve(__dirname, 'config.json');

async function getJSONConfigData() {
	try {
		const configData = await readFile(PATH_TO_JSON_CONFIG, { encoding: 'utf8' });
		return configData ? JSON.parse(configData) : undefined;
	} catch (error) {
		console.error(warningColor('Failed to get config data'));
	}
}

async function createJSONConfig() {
	try {
		await writeFile(PATH_TO_JSON_CONFIG, '');

		console.info(successColor('Config file successfully created!'));
	} catch (error) {
		console.error(errorColor('An error occurred when creating the config'));
	}
}

async function saveJSONData(ext, path) {
	try {
		let config = await getJSONConfigData();

		if (!config) {
			await createJSONConfig();
			config = {};
		}

		const { fileName, path: filePath } = parseFilePath(path);

		config[ext] = {};
		config[ext].fileName = fileName;
		config[ext].path = filePath;

		await writeFile(PATH_TO_JSON_CONFIG, JSON.stringify(config));

		console.info(successColor(`Path to the file with the extension .${ext} is saved!`));
	} catch (error) {
		console.error(errorColor('An error occurred while saving config data'));
	}
}

module.exports = {
	getJSONConfigData,
	saveJSONData,
};
