import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownCases = (props) => (
  <Dropdown placeholder='Case IOC' fluid multiple selection options={props.cases} />
)


class ListCases extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cases: ['abc', 'xyz', 'ooo', 'ppp'] //remove when ajax is working
    }
  }

  componentDidMount() {

    // uncomment after implementing the route in crudService

    // $.ajax({
    //   // get distinct cases from crudService ONLY
    //   url: 'http://localhost:5001/getCases',
    //   method: 'GET',
    //   success: (result) => {
    //     this.setState({
    //       cases: result
    //     })
    //   },
    //   error: (err) => {
    //     console.error(err);
    //   }
    // })
  }

  render() {
    if (this.state.cases.length > 0) {

      var casesParsed = [];
      // debugger
      this.state.cases.forEach( (c) => {
        casesParsed.push({key: c, text: c, value: c})
      })
    }


    return (
      <DropdownCases cases={casesParsed} />
    )
  }
}



export default ListCases;





