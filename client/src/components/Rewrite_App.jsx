import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListIOCCodes from './ListIOCCodes.jsx';
import ListLogtypes from './ListLogtypes.jsx';
import ListCaseDirs from './ListCaseDirs.jsx';



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
    this.setState({
      selectedIOCCaseIDs: userInput
    })
  }

  handleLogTypeSelection(userInput) {
    this.setState({
      selectedLogType: userInput
    })
  }


  handleSubmit() {

  }

  render() {

    var ListCaseDirsComponent;

    if (this.state.selectedLogType !== null) {

      ListCaseDirsComponent = <ListCaseDirs selectedLogType={this.state.selectedLogType} />
    }

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <form onSubmit={this.handleSubmit}>
              <ListIOCCodes handleIOCCaseIDSelection={this.handleIOCCaseIDSelection}/>
              <ListLogtypes handleLogTypeSelection={this.handleLogTypeSelection}/>
              {ListCaseDirsComponent}
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


