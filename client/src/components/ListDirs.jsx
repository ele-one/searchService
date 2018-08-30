import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';
import BrowseFiles from './BrowseFiles.jsx';




class ListDirs extends React.Component {
  constructor(props) {
    super(props);
    this.getDirs = this.getDirs.bind(this);
    this.handleLogTypeSelect = this.handleLogTypeSelect.bind(this)
    this.state = {
      dirs: [],
      selectedLogtype:null,
      dropdownOptions: []
    }
  }


  getDirs(logtype) {

    const logType = logtype || '';

    $.ajax({
      url: '/getDirs',
      method: 'POST',
      data: {logtype: logType},
      success: (folders) => {

        if (logType === '') {

          var dropdownOptions = folders.map( (folder) => {
            return {key: folder, text: folder, value: folder}
          })

          this.setState({
            dropdownOptions: dropdownOptions
          })
        }



        if (logType !== '') {
          this.setState({
            dirs: folders
          })
        }

      },
      error: (err) => {
        // log in a file
        console.log(err)
      }
    })
  }


  componentDidMount() {
    this.getDirs()

  }


  handleLogTypeSelect(event) {

    this.setState({
      selectedLogtype: event.target.textContent
    })

    this.getDirs(event.target.textContent)
  }



  render() {

    var showFileBrowser;

    if (this.state.selectedLogtype !== null) {
      showFileBrowser = <BrowseFiles folders={this.state.dirs} type='Directories'/>
    }

    return (
      <div>
        <Dropdown placeholder='Select Country' fluid search selection options={this.state.dropdownOptions} onChange={this.handleLogTypeSelect}/>
        {showFileBrowser}
      </div>
      )


  }

}



export default ListDirs


