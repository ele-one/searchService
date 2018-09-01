import React from 'react'
import { Table,  Checkbox } from 'semantic-ui-react'
import $ from 'jquery';

const ListFileItem = (props) => {
  if (props.selectAllChecked) {
    return (

      <Table.Row>
        <Table.Cell >  <Checkbox checked={true} label={props.item} onChange={props.handleSelect} />  </Table.Cell>
      </Table.Row>
      )
  } else {
    return (
      <Table.Row>
        <Table.Cell >  <Checkbox label={props.item} onChange={props.handleSelect} />  </Table.Cell>
      </Table.Row>
    )
  }
}


class ListCaseFiles extends React.Component {

  constructor(props) {
    super(props);

    this.fetchCaseFiles = this.fetchCaseFiles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.SELECTED_FILES = [];

    this.state = {
      caseFiles: [],
      label: [],
      unRender: false,
      selectAllChecked: false
    }
  }


  componentDidMount() {
    this.fetchCaseFiles(this.props.selectedLogType, this.props.selectedCaseDir);

  }

  componentDidUpdate(prevProps) {

    if (this.props.selectedLogType !== prevProps.selectedLogType) {
      this.setState({
        unRender: true
      })
    }

    if (this.props.selectedCaseDir !== prevProps.selectedCaseDir) {
      this.fetchCaseFiles(this.props.selectedLogType, this.props.selectedCaseDir);
      this.setState({
        unRender: false
      })
    }
  }

  fetchCaseFiles(logtype, caseDir) {
    $.ajax({
      url:'/getCaseDirs/' + logtype + '/' + caseDir,
      method:'GET',
      success: (caseFiles) => {
        if (caseFiles.length > 1) {
          caseFiles.unshift('Select All')
        }
        this.setState({
          caseFiles: caseFiles
      })
      },
      error: (err) => {
      }
    })
  }

  handleSelectAll(val) {
    this.setState({
      selectAllChecked: !this.state.selectAllChecked
    });

    if (val.checked) {
      this.SELECTED_FILES = this.state.caseFiles.slice(1);
    } else {
      this.SELECTED_FILES = [];
    }

    this.props.handleCaseFilesSelection(this.SELECTED_FILES);

  }

  handleSelect(e, val) {

    if (val.label === 'Select All') {
      this.handleSelectAll(val);
    }

    if (val.checked && val.label !== 'Select All') {
      this.SELECTED_FILES.push(val.label);

    } else if (!val.checked && val.label !== 'Select All') {
      var idx = this.SELECTED_FILES.indexOf(val.label);
      this.SELECTED_FILES.splice(idx, 1);
    }

    this.props.handleCaseFilesSelection(this.SELECTED_FILES);
  }




  render() {

    const divStyle = {
      color: 'brown'
    };

    const listItems = this.state.caseFiles.map( (item, idx) => {
      return <ListFileItem selectAllChecked={this.state.selectAllChecked} handleSelect={this.handleSelect} key={idx} item={item}/>
    })


    if (this.state.unRender) {
      return null
    } else {
      return (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={divStyle}> Inside: {this.props.selectedCaseDir} </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listItems}
          </Table.Body>
        </Table>
      )
    }
  }
}


export default ListCaseFiles