import React from 'react';
import $ from 'jquery';
import { Dropdown } from 'semantic-ui-react';

const DropdownVersions = (props) => (
  <Dropdown id='version' placeholder='Select version for the above IOC set' fluid search selection options={props.versions} onChange={props.handleChange}/>
)

class ListCaseVersions extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      versions: [100, 101, 102, 103], //remove when ajax is working
      value: []
    }
  }

  componentDidMount() {

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
