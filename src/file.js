const fs = require('fs/promises');

const { DBFFile } = require('dbffile');

const { errorColor, successColor } = require('./chalk.js');

async function getTXTFileData(filePath) {
	try {
		return await fs.readFile(filePath, { encoding: 'utf8' });
	} catch (error) {
		console.error(errorColor('An error occurred while receiving the data .txt file'));
	}
}

async function getDBFFileData(filePath) {
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

async function saveDBFFile(dbfFields, dbfRecords, path) {
	try {
		const dbfFile = await DBFFile.create(path, dbfFields);
		await dbfFile.appendRecords(dbfRecords);

		console.info(successColor('.dbf file saved!'));
		console.info(successColor(`Path to file: ${path}`));
	} catch (error) {
		console.error(errorColor('An error occurred while saving the .dbf file'));
	}
}

module.exports = {
	getTXTFileData,
	getDBFFileData,
	saveDBFFile,
};
