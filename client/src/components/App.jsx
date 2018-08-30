import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SSGrid from './SSGrid.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = {
    }

  }


  componentDidMount() {

  }


  handleClick(e) {
    debugger
  }

  render () {
    return (<div>
      <SSGrid handleClick={this.handleClick} />
    </div>)
  }
}

export default App