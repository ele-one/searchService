import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownCases = (props) => (
  <Dropdown id='ioc' name='mycases' placeholder='Select IOC code names to search' fluid multiple selection options={props.cases}  onChange={props.handleChange}/>
)


class ListIOCCodes extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      cases: ['APT28', 'APT30', 'Bearz'], //remove when ajax is working
      value: []
    }
  }

  componentDidMount() {

  }

 handleChange(e, {value} ) {
    this.setState({ value });
    this.props.handleIOCCaseIDSelection(value);
  }

  render() {
    if (this.state.cases.length > 0) {
      var casesParsed = [];
      this.state.cases.forEach( (c) => {
        casesParsed.push({key: c, text: c, value: c});
      })
    }


    return (
      <DropdownCases cases={casesParsed} handleChange={this.handleChange} />
    )
  }
}



export default ListIOCCodes;





