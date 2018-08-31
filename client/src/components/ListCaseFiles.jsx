import React from 'react'
import { Table,  Checkbox } from 'semantic-ui-react'
import $ from 'jquery';

const ListFileItem = (props) => (

    <Table.Row>
      <Table.Cell >  <Checkbox label={props.item} onChange={props.handleSelect} />  </Table.Cell>
    </Table.Row>
  )


class ListCaseFiles extends React.Component {

  constructor(props) {
    super(props);

    this.fetchCaseFiles = this.fetchCaseFiles.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.SELECTED_FILES = [];

    this.state = {
      caseFiles: [],
      checkedFiles: [],
      label: []
    }
  }

  fetchCaseFiles(logtype, caseDir) {
    $.ajax({
      url:'/getCaseDirs/' + logtype + '/' + caseDir,
      method:'GET',
      success: (caseFiles) => {
        this.setState({
          caseFiles: caseFiles
        })
      },
      error: (err) => {
      }
    })
  }


  // handleClick(e) {
  //   debugger
  //   var clickedFiles = e.target.textContent
  //   this.setState({
  //     clickedFiles: clickedFiles
  //   })
  //   this.props.handleCaseFilesSelection(clickedFiles);
  // }



  handleSelect(e, val) {
    if (val.checked) {
      this.SELECTED_FILES.push(val.label)

    } else {
      var idx = this.SELECTED_FILES.indexOf(val.label)
      this.SELECTED_FILES.splice(idx, 1)
    }

    this.setState({
      checkedFiles: this.SELECTED_FILES
    })

    this.props.handleCaseFilesSelection(this.SELECTED_FILES);

  }



  render() {

    this.fetchCaseFiles(this.props.selectedLogType, this.props.selectedCaseDir);
    const divStyle = {
      color: 'brown'
    };

    const listItems = this.state.caseFiles.map( (item, idx) => {
      return <ListFileItem handleSelect={this.handleSelect} key={idx} item={item}/>
    })

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


export default ListCaseFiles