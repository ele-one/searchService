import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SSGrid from './SSGrid.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }


  render () {
    return (<div>
      <SSGrid />
    </div>)
  }
}

export default App