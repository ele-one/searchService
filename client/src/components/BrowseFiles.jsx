import React from 'react'
import { Table } from 'semantic-ui-react'


const BrowseFileItems = (props) => (

    <Table.Row>
      <Table.Cell id='casedir' >{props.item}</Table.Cell>
    </Table.Row>
  )


const BrowseFiles = (props) => {

  const listItems = props.folders.map( (item, idx) => {
    return <BrowseFileItems key={idx} item={item}/>
  })


  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{props.type}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {listItems}
      </Table.Body>
    </Table>
    )
}

export default BrowseFiles


