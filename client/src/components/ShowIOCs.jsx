import React from 'react';
import $ from 'jquery';
import { Form, TextArea } from 'semantic-ui-react'


const TextAreaIOC = (props) => (
  <TextArea autoHeight id='iocText' placeholder='Select version for the above IOC set' value={props.iocs} />
)

class ShowIOCs extends React.Component {

  constructor(props) {
    super(props);
    this.fetchIOCs = this.fetchIOCs.bind(this);

    this.state = {
      iocs: [],
      value: [],
    }
  }



  fetchIOCs(caseName, versionNumber) {
    // ajax call for verions of selected case this.selectedIOCCase
    $.ajax({
      url:'/readioc',
      method:'POST',
      data: {query: JSON.stringify({caseName: caseName, versionNum: versionNumber}) },
      success: (iocs) => {
        this.setState({
          iocs: iocs
        })
      },
      error: (err) => {
      }
    })
  }


  componentDidMount() {
    this.fetchIOCs(this.props.selectedIOCCase,this.props.selectedIOCCaseVersion);
  }

  componentDidUpdate(prevProps) {

   if (this.props.selectedIOCCase !== prevProps.selectedIOCCase &&  this.props.selectedIOCCaseVersion !== prevProps.selectedIOCCaseVersion) {
        this.fetchIOCs(this.props.selectedIOCCase,this.props.selectedIOCCaseVersion);
      }

    if (this.props.selectedIOCCase === prevProps.selectedIOCCase &&  this.props.selectedIOCCaseVersion !== prevProps.selectedIOCCaseVersion)
      this.fetchIOCs(prevProps.selectedIOCCase,this.props.selectedIOCCaseVersion);


     if ( this.props.selectedIOCCaseVersion !== prevProps.selectedIOCCaseVersion && this.props.selectedIOCCaseVersion === prevProps.selectedIOCCaseVersion)
        this.fetchIOCs(this.props.selectedIOCCase, prevProps.selectedIOCCaseVersion);

  }


  render() {

    if (this.state.iocs.length > 0) {
      var iocParsed = '';
      this.state.iocs.forEach( (ioc) => {
       iocParsed = iocParsed + ioc + '\n';
      })
    }

    return (

      <TextAreaIOC iocs={iocParsed} />

    )
  }
}


export default ShowIOCs;
