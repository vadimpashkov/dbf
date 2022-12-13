export function parseFilePath(fileFullPath) {
	const fileRegexp = /[\w\-.]+\.[a-z]{2,10}/i;
	const [fileName] = fileFullPath.match(fileRegexp);
	const filePath = fileFullPath.replace(fileRegexp, '');

	return {
		fileName,
		path: filePath,
	};
}

export function getUsersIdList(fileDataAsText) {
	const errorsMatchList = Array.from(fileDataAsText.matchAll(/#\s+\d+\s(?<userId>\w+)/gim));

	return errorsMatchList.reduce((userIdList, userData) => {
		userData?.groups?.userId && userIdList.push(userData.groups.userId);
		return userIdList;
	}, []);
}

export function deleteUsersFromDBF(dbfRecords, userIdList) {
	return dbfRecords.filter((record) => !userIdList.includes(record?.GUID1));
}

export function generateFileName(parentFileName) {
	const [fileName, ext] = parentFileName.split('.');

	return `${fileName}-${Date.now()}.${ext}`;
}
