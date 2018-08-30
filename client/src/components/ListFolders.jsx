import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

class ListFolders extends React.Component {
  constructor(props) {
    super(props);
    this.getFolders = this.getFolders.bind(this);
    this.state = {
      folders: [],
    }
  }


  getFolders(logtype) {

    const logType = logtype || 'access';

    $.ajax({
      url: '/getFolders',
      method: 'POST',
      data: {logtype: logType},
      success: (folders) => {
        debugger
        var dropdownOptions = folders.map( (folder) => {
          return {key: folder, text: folder, value: folder}
        })

        this.setState({
          folders: dropdownOptions
        })
      },
      error: (err) => {
        // log in a file
        console.log(err)
      }
    })
  }


  componentDidMount() {
    this.getFolders()

  }


  render() {

    return (
      <Dropdown placeholder='Select Country' fluid search selection options={this.state.folders} />
      )

  }

}



export default ListFolders


