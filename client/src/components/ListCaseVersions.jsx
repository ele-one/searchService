import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownVersions = (props) => (
  <Dropdown id='version' placeholder='Select version for the above IOC set' fluid search selection options={props.versions} onChange={props.handleChange}/>
)

class ListCaseVersions extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.selectedCase = this.props.selectedIOCCase;
    this.fetchCaseVersions = this.fetchCaseVersions.bind(this);

    this.state = {
      versions: [],
      value: [],
    }
  }




  fetchCaseVersions(caseName) {
    // ajax call for verions of selected case this.selectedIOCCase
    $.ajax({
      url:'/getCaseVersions',
      method:'POST',
      data: { caseName: caseName },
      success: (versions) => {
        this.setState({
          versions: versions
        })
      },
      error: (err) => {
      }
    })
  }


  componentDidMount() {
    this.fetchCaseVersions(this.props.selectedIOCCase);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedIOCCase !== prevProps.selectedIOCCase) {
      this.fetchCaseVersions(this.props.selectedIOCCase);
    }
  }



 handleChange(e, {value} ) {

    this.setState({ value });
    this.props.handleCaseVersionSelection(value);
  }

  render() {
    if (this.state.versions.length > 0) {
      var versionParsed = [];
      this.state.versions.forEach( (v) => {
       versionParsed.push({key: v, text: v, value: v});
      })
    }


    return (

      <DropdownVersions versions={versionParsed} handleChange={this.handleChange} />

    )
  }
}


export default ListCaseVersions;
