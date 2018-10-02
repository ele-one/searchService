import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownCases = (props) => (
  /* <Dropdown id='ioc' name='mycases' placeholder='Select IOC code names to search' fluid multiple selection options={props.cases}  onChange={props.handleChange}/> */

  <Dropdown id='ioc' placeholder='Select IOC set to search for' fluid search selection options={props.cases} onChange={props.handleChange} />
)


class ListIOCCodes extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      iocSets: ['APT28', 'APT30', 'Bearz', 'APT120', 'APT100'], //remove when ajax is working
      value: []
    }
  }

  componentDidMount() {
    // $.ajax({
    //   url:'/getCaseDirs/' + logtype,
    //   method:'GET',
    //   success: (caseDirs) => {
    //     this.setState({
    //       iocSets: caseDirs + '_set'
    //     })
    //   },
    //   error: (err) => {
    //   }
    // })

  }

 handleChange(e, {value} ) {
    this.setState({ value });
    this.props.handleIOCCaseIDSelection(value);
  }

  render() {
    if (this.state.iocSets.length > 0) {
      var casesParsed = [];
      this.state.iocSets.forEach( (c) => {
        casesParsed.push({key: c, text: c, value: c});
      })
    }


    return (
      <DropdownCases cases={casesParsed} handleChange={this.handleChange} />
    )
  }
}


export default ListIOCCodes;


