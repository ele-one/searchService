import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListIOCCodes from './ListIOCCodes.jsx';
import ListLogtypes from './ListLogtypes.jsx';
import ListCaseDirs from './ListCaseDirs.jsx';
import ListCaseFiles from './ListCaseFiles.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleIOCCaseIDSelection = this.handleIOCCaseIDSelection.bind(this);
    this.handleLogTypeSelection = this.handleLogTypeSelection.bind(this);
    this.handleCaseDirSelection = this.handleCaseDirSelection.bind(this);
    this.handleCaseFilesSelection = this.handleCaseFilesSelection.bind(this);

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

  handleCaseDirSelection(userInput) {
    this.setState({
      selectedCaseDir: userInput
    })
  }


  handleCaseFilesSelection(userInput) {
    this.setState({
      selectedCaseFiles: userInput
    })
  }


  handleSubmit() {

  }

  render() {
    var ListCaseDirsComponent;
    var ListCaseFilesComponent;

    if (this.state.selectedLogType !== null) {
      ListCaseDirsComponent = <ListCaseDirs selectedLogType={this.state.selectedLogType} handleCaseDirSelection={this.handleCaseDirSelection} />
    }

    if (this.state.selectedCaseDir !== null) {
      ListCaseFilesComponent = <ListCaseFiles selectedLogType={this.state.selectedLogType} selectedCaseDir={this.state.selectedCaseDir} handleCaseFilesSelection={this.handleCaseFilesSelection} />
    }



    console.log(this.state.selectedCaseFiles)

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <form onSubmit={this.handleSubmit}>
              <ListIOCCodes handleIOCCaseIDSelection={this.handleIOCCaseIDSelection}/>
              <ListLogtypes handleLogTypeSelection={this.handleLogTypeSelection}/>
              {ListCaseDirsComponent}
              {ListCaseFilesComponent}
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

export default App


