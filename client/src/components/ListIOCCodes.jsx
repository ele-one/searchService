import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownCases = (props) => (
  /* <Dropdown id='ioc' name='mycases' placeholder='Select IOC code names to search' fluid multiple selection options={props.cases}  onChange={props.handleChange}/> */
  <Dropdown id='ioc' placeholder='Select IOC set to search for' fluid search selection options={props.cases} onChange={props.handleChange} />
)

const DropdownVersions = (props) => (
  <Dropdown id='version' placeholder='Select version for the above IOC set' fluid search selection options={props.versions} onChange={props.handleChange}/>
)

class ListIOCCodes extends React.Component {

  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this)

    this.handleIOCSetChange = this.handleIOCSetChange.bind(this)
    this.handleIOCVersionChange = this.handleIOCVersionChange.bind(this)
    this.sendDataToApp = this.sendDataToApp.bind(this)

    this.state = {
      cases: ['APT28', 'APT30', 'Bearz', 'APT120', 'APT100'], //remove when ajax is working
      // value: [],
      selectedIOCSet: null,
      selectedIOCVersion: null,
      versions: [100, 101, 102, 103] // later initialize it with 100
    }
  }

sendDataToApp() {
if (this.state.selectedIOCSet && this.state.selectedIOCVersion)
  this.props.handleIOCCaseIDSelection(this.state.selectedIOCSet, this.state.selectedIOCVersion);

}

componentDidMount() {

  }


 handleIOCSetChange(e, {value} ) {
    this.setState({ selectedIOCSet: value });
    // this.props.handleIOCCaseIDSelection(value);
  }

 handleIOCVersionChange(e, {value} ) {
    this.setState({ selectedIOCVersion: value }, () => {
      this.sendDataToApp()
    });

  }


  render() {
    if (this.state.cases.length > 0) {
      var casesParsed = [];
      this.state.cases.forEach( (c) => {
        casesParsed.push({key: c, text: c, value: c});
      })
    }

    if (this.state.versions.length > 0) {
      var versionsParsed = [];
      this.state.versions.forEach( (v) => {
        versionsParsed.push({key: v, text: v, value: v});
      })
    }


    return (
      <div>
        <DropdownCases cases={casesParsed} handleChange={this.handleIOCSetChange} />
        <DropdownVersions versions={versionsParsed} handleChange={this.handleIOCVersionChange} />
      </div>
    )
  }
}



export default ListIOCCodes;





