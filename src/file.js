import fs from 'fs/promises';

import { DBFFile } from 'dbffile';

import { errorColor, successColor } from './chalk.js';

export async function getTXTFileData(filePath) {
	try {
		return await fs.readFile(filePath, { encoding: 'utf8' });
	} catch (error) {
		console.error(errorColor('An error occurred while receiving the data .txt file'));
	}
}

export async function getDBFFileData(filePath) {
	try {
		const dbfFileData = await DBFFile.open(filePath);
		const dbfFileRecords = await dbfFileData.readRecords();

		return {
			data: dbfFileData,
			records: dbfFileRecords,
		};
	} catch (error) {
		console.error(errorColor('An error occurred while receiving the data .dbf file'));
	}
}

export async function saveDBFFile(dbfFields, dbfRecords, path) {
	try {
		const dbfFile = await DBFFile.create(path, dbfFields);
		await dbfFile.appendRecords(dbfRecords);

		console.info(successColor('.dbf file saved!'));
		console.info(successColor(`Path to file: ${path}`));
	} catch (error) {
		console.error(errorColor('An error occurred while saving the .dbf file'));
	}
}
