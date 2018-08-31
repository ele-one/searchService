import React from 'react'
import { Table } from 'semantic-ui-react'
import $ from 'jquery';

const ListFileItem = (props) => (

    <Table.Row>
      <Table.Cell onClick={props.handleClick}> {props.item} </Table.Cell>
    </Table.Row>
  )


class ListCaseFiles extends React.Component {

  constructor(props) {
    super(props);

    this.fetchCaseFiles = this.fetchCaseFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);


    this.state = {
      caseFiles: [],
      clickedFiles: []
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


  handleClick(e) {
    var clickedFiles = e.target.textContent
    this.setState({
      clickedFiles: clickedFiles
    })
    this.props.handleCaseFilesSelection(clickedFiles);
  }

  render() {

    this.fetchCaseFiles(this.props.selectedLogType, this.props.selectedCaseDir);
    const divStyle = {
      color: 'brown'
    };

    const listItems = this.state.caseFiles.map( (item, idx) => {
      return <ListFileItem handleClick={this.handleClick} key={idx} item={item}/>
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