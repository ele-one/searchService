import React from 'react'
import { Table } from 'semantic-ui-react'
import $ from 'jquery';

const ListDirItem = (props) => (

    <Table.Row>
      <Table.Cell> {props.item} </Table.Cell>
    </Table.Row>
  )


class ListCaseDirs extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.fetchCaseDirs = this.fetchCaseDirs.bind(this);

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

 handleChange(e) {

 }

  render() {

    const divStyle = {
      color: 'brown'
    };

    const listItems = this.state.caseDirs.map( (item, idx) => {
      return <ListDirItem key={idx} item={item}/>
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
