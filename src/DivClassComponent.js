import React from 'react';

export class DivComponent extends React.Component {
  constructor(props) {
    super(props);

    console.log('Constructor called');
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentWillUnmount() {
    console.log('Component unmounted');
  }

  render() {
    return <div>Div component</div>;
  }
}
