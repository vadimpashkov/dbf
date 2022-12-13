const { resolve } = require('path');

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const { errorColor } = require('./chalk.js');
const { getJSONConfigData, saveJSONData } = require('./jsonConfig.js');
const { getDBFFileData, getTXTFileData, saveDBFFile } = require('./file.js');
const { getUsersIdList, deleteUsersFromDBF, generateFileName } = require('./utils.js');

yargs(hideBin(process.argv))
	.command(
		'filePath [ext] [path]',
		'Save path to file',
		(yargs) => {
			return yargs
				.positional('ext', {
					type: 'string',
					describe: 'File Extension',
				})
				.positional('path', {
					type: 'string',
					describe: 'Path to the file',
				});
		},
		async ({ ext, path }) => {
			if (!ext) {
				console.error(errorColor('Please enter the file extension'));
				return;
			}

			if (ext !== 'txt' && ext !== 'dbf') {
				console.error(errorColor('The file extension can be or .txt or .dbf'));
				return;
			}

			if (!path) {
				console.error(errorColor('Please enter the path to the file'));
				return;
			}

			await saveJSONData(ext, path);
		},
	)
	.command('deleteUsersFromDbf', 'Remove user IDs from .dbf', async () => {
		const config = await getJSONConfigData();

		if (!config) {
			console.error(errorColor('First fill in the data using the `filePath` command'));
			return;
		}

		const txtFileData = await getTXTFileData(config.txt.path + config.txt.fileName);
		const { data: dbfFileData, records: dbfFileRecords } = await getDBFFileData(
			config.dbf.path + config.dbf.fileName,
		);

		const usersIdList = getUsersIdList(txtFileData);

		const dbfRecordsWithoutDefinedUsers = deleteUsersFromDBF(dbfFileRecords, usersIdList);

		await saveDBFFile(
			dbfFileData.fields,
			dbfRecordsWithoutDefinedUsers,
			resolve(__dirname, generateFileName(config.dbf.fileName)),
		);
	})
	.parse();
