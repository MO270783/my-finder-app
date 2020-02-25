import React from 'react';
import PropTypes from 'prop-types';
import { fetchFileList, fetchGrepResults } from '../api';

export class GrepResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {},
      errorMsg: null,
    };
  }

  componentDidMount() {
    const { processName, hostName, patternToSearchFor } = this.props;
    fetchFileList(processName, hostName)
      .then(fileList => {
        const obj = {};
        fileList.forEach(function(file) {
          obj[file] = null;
        });

        this.setState({
          result: obj,
        });

        return fetchGrepResults(fileList, patternToSearchFor, hostName);
      })
      .then(grepOutput => {
        const obj = {};
        grepOutput.forEach(grepOut => {
          obj[grepOut.fileName] = grepOut.result;
        });

        this.setState({
          result: obj,
        });
      })
      .catch(error => {
        this.setState({
          result: {},
          errorMsg: error.message,
        });
      });
  }

  isFileNamesBeingRetrieved() {
    const { result, errorMsg } = this.state;
    return (result === undefined || Object.keys(result).length === 0) && errorMsg === null;
  }

  render() {
    const { result, errorMsg } = this.state;
    const { hostName } = this.props;

    return (
      <>
        <h4>{hostName}</h4>
        {this.isFileNamesBeingRetrieved() && <p>File names are being retrieved</p>}

        {errorMsg && <p>Error !!!: {errorMsg}</p>}

        <ul>
          {Object.keys(result).map(fileName => {
            return <FileResult key={fileName} fileName={fileName} grepResult={result[fileName]} />;
          })}
        </ul>
      </>
    );
  }
}

GrepResult.propTypes = {
  processName: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  patternToSearchFor: PropTypes.string.isRequired,
};

function FileResult({ fileName, grepResult }) {
  return (
    <li>
      <h6>{fileName}</h6>
      {grepResult === null && <p>Loading grep results</p>}
      {grepResult !== null && <p>{grepResult}</p>}
    </li>
  );
}

FileResult.propTypes = {
  fileName: PropTypes.string.isRequired,
};
