import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './ListServices.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/monitor',
      success: (data) => {
        this.setState({
          services: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List services={this.state.services}/>
    </div>)
  }
}

export default App