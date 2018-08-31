import React from 'react'
import { Table } from 'semantic-ui-react'
import $ from 'jquery';

const ListDirItem = (props) => (

    <Table.Row>
      <Table.Cell onClick={props.handleClick}> {props.item} </Table.Cell>
    </Table.Row>
  )


class ListCaseDirs extends React.Component {

  constructor(props) {
    super(props);

    this.fetchCaseDirs = this.fetchCaseDirs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchCaseDirs(this.props.selectedLogType);

    this.state = {
      caseDirs: []
    }
  }

  fetchCaseDirs(logtype) {
    $.ajax({
      url:'/getCaseDirs/' + logtype,
      method:'GET',
      success: (caseDirs) => {
        this.setState({
          caseDirs: caseDirs
        })
      },
      error: (err) => {
      }
    })
  }


  handleClick(e) {
    var clickedDir = e.target.textContent
    clickedDir = clickedDir.split(' ')[1]
    this.props.handleCaseDirSelection(clickedDir);
  }

  render() {

    const divStyle = {
      color: 'brown'
    };

    const listItems = this.state.caseDirs.map( (item, idx) => {
      return <ListDirItem handleClick={this.handleClick} key={idx} item={item}/>
    })

    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={divStyle}> Case directories </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {listItems}
        </Table.Body>
      </Table>
    )
  }
}


export default ListCaseDirs
