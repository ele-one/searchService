import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';


class ListLogtypes extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogTypeSelect = this.handleLogTypeSelect.bind(this)
    this.state = {
      dropdownOptions: []
    }

}
  componentDidMount() {
    $.ajax({
      url:'/getLogtypes',
      method:'GET',
      success: (logtypeDirs) => {
        var dropdownOptions = logtypeDirs.map( (dir) => {
          return {key: dir, text: dir, value: dir}
        })

        this.setState({
          dropdownOptions: dropdownOptions
        })
      },
      error: (err) => {
      }
    })
  }

  handleLogTypeSelect(e) {
    var selectedLogtype = e.target.textContent
    this.props.handleLogTypeSelection(selectedLogtype)

  }

  render() {

    return (
      <div>
        <Dropdown id='logtype' placeholder='Log type' fluid search selection options={this.state.dropdownOptions} onChange={this.handleLogTypeSelect}/>
      </div>
      )
    }
  }





export default ListLogtypes
