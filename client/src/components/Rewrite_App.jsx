import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListCases from './ListCases.jsx'
import ListDirs from './ListDirs.jsx'




class Rewrite_App extends React.Component {
  constructor(props) {
    super(props)
    this.handleIOCCaseIDSelection = this.handleIOCCaseIDSelection.bind(this)
    this.handleLogTypeSelection = this.handleLogTypeSelection.bind(this)
    this.state = {
      selectedIOCCaseIDs: [],
      selectedLogType: null,
      selectedCaseDir: null,
      selectedCaseFiles: []
    }
  }


  handleIOCCaseIDSelection(userInput) {
    debugger;
    this.setState({
      selectedIOCCaseIDs: userInput
    })
  }

  handleLogTypeSelection(userInput) {
    debugger
    this.setState({
      selectedLogType: userInput
    })
  }


  handleSubmit() {

  }

  render() {

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <form onSubmit={this.handleSubmit}>
              <ListCases handleIOCCaseIDSelection={this.handleIOCCaseIDSelection}/>
              <ListDirs handleLogTypeSelection={this.handleLogTypeSelection}/>

            </form>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      )

  }

}

export default Rewrite_App