const DUMMY_DATA = {
  NYK: ['NYK_HOST1', 'NYK_HOST2'],
  LON: ['LON_HOST1', 'LON_HOST2'],
  TKY: ['TKY_HOST1', 'TKY_HOST2'],
};

function createObj(fileName, result) {
  return {
    fileName,
    result,
  };
}
const DUMMY_FILE_DATA = ['file1', 'file2', 'file3'];
const DUMMY_GREP_DATA = [
  createObj('file1', 'Grep results for file1'),
  createObj('file2', 'Grep results for file2'),
  createObj('file3', 'Grep results for file3'),
];

export function fetchProcessServers(processName, region) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_DATA[region]);
      // reject(Error('Not found'));
    }, 2000);
  });
}

export function fetchFileList(processName, hostName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_FILE_DATA);
      // reject(Error('Files Not found'));
    }, 2000);
  });
}

export function fetchGrepResults(fileNames, patternToSearchFor, hostName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_GREP_DATA);
      // reject(Error('Failed to grep'));
    }, 2000);
  });
}
