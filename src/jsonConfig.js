import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { errorColor, successColor, warningColor } from './chalk.js';

import { readFile, writeFile } from 'fs/promises';
import {parseFilePath} from "./utils.js";

const __filename = fileURLToPath(import.meta.url);

const PATH_TO_DIRECTORY = dirname(__filename);
const PATH_TO_JSON_CONFIG = resolve(PATH_TO_DIRECTORY, 'config.json');

let configData;

export async function getJSONConfigData() {
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

export async function saveJSONData(ext, path) {
	try {
		let config = await getJSONConfigData();

        if (!config) {
            await createJSONConfig()
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
