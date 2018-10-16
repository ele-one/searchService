import React from 'react';
import $ from 'jquery';
import { TextArea} from 'semantic-ui-react'

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
    <TextArea autoHeight id='iocText' placeholder='Search Result' value={this.state.result} />
      )
    }
}


export default SearchResult;


