import React from 'react';
import { fetchProcessServers } from '../api';

export class Region extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hosts: [],
      errorMsg: null,
    };
  }

  componentDidMount() {
    const { processName, region } = this.props;
    fetchProcessServers(processName, region)
      .then(hostnames => {
        this.setState({
          hosts: hostnames,
        });
      })
      .catch(error => {
        this.setState({
          errorMsg: error,
        });
      });
  }

  isLoading() {
    const { hosts, errorMsg } = this.state;
    const loading = hosts.length === 0 && errorMsg === null;
    return loading;
  }

  render() {
    const { region } = this.props;
    const { hosts, errorMsg } = this.state;

    return (
      <>
        <h5>{region}</h5>
        {this.isLoading() && <p>Loading text</p>}
        {errorMsg && <p>{`Error message is ${errorMsg}`}</p>}
        <ul>
          {hosts.map(host => {
            return <li key={host}>{host}</li>;
          })}
        </ul>
      </>
    );
  }
}
