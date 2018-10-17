import React from 'react';
import $ from 'jquery';

class SearchResult extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null
    }
  }

  componentDidMount() {
    $.ajax({
      url:'/getResultFile',
      method:'GET',
      success: (result) => {
        debugger
        this.setState({
          result: result
        })
      },
      error: (err) => {
        debugger
        console.log(err);
      }
    })

  }


  render() {
    // debugger
    return (
      <textarea  rows="20" cols="70" id='iocText' placeholder='Search Result' value={this.state.result} />
      )
    }
}


export default SearchResult;


