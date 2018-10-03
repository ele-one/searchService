import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListIOCCodes from './ListIOCCodes.jsx';
import ListLogtypes from './ListLogtypes.jsx';
import ListCaseDirs from './ListCaseDirs.jsx';
import ListCaseFiles from './ListCaseFiles.jsx';
import ListCaseVersions from './ListCaseVersions.jsx';
import ShowIOCs from './ShowIOCs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleIOCCaseIDSelection = this.handleIOCCaseIDSelection.bind(this);
    this.handleCaseVersionSelection = this.handleCaseVersionSelection.bind(this)
    this.handleLogTypeSelection = this.handleLogTypeSelection.bind(this);
    this.handleCaseDirSelection = this.handleCaseDirSelection.bind(this);
    this.handleCaseFilesSelection = this.handleCaseFilesSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state = {
      selectedIOCCaseID: null,
      selectedIOCCaseVersion: null,
      selectedCaseVersion: null,
      selectedLogType: null,
      selectedCaseDir: null,
      selectedCaseFiles: []
    }
  }



  handleIOCCaseIDSelection(userInput) {

    this.setState({
      selectedIOCCaseID: userInput
    })
  }



  handleCaseVersionSelection(userInput) {
    this.setState({
      selectedIOCCaseVersion: userInput
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


  handleSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: '/searchioc',
      method: 'POST',
      data: this.state,
      success: (result) => {
        console.log('from search service', result)
      },
      error: (err) => {
        console.log('error')
      }
    })
  }

  render() {
    var ListCaseDirsComponent;
    var ListCaseFilesComponent;
    var ListCaseVersionsComponent;
    var ShowIOCsComponent;


    if (this.state.selectedIOCCaseID) {
      ListCaseVersionsComponent = <ListCaseVersions selectedIOCCase={this.state.selectedIOCCaseID} handleCaseVersionSelection={this.handleCaseVersionSelection} />
    }

    if (this.state.selectedIOCCaseID && this.state.selectedIOCCaseVersion) {
      ShowIOCsComponent = <ShowIOCs selectedIOCCase={this.state.selectedIOCCaseID} selectedIOCCaseVersion={this.state.selectedIOCCaseVersion} />
    }

    if (this.state.selectedLogType !== null) {
      ListCaseDirsComponent = <ListCaseDirs selectedLogType={this.state.selectedLogType} handleCaseDirSelection={this.handleCaseDirSelection} />
    }

    if (this.state.selectedCaseDir !== null) {
      ListCaseFilesComponent = <ListCaseFiles selectedLogType={this.state.selectedLogType} selectedCaseDir={this.state.selectedCaseDir} handleCaseFilesSelection={this.handleCaseFilesSelection} />
    }


    return (
      <form onSubmit={this.handleSubmit}>
        <Grid columns='equal'>


          <Grid.Row>
            <Grid.Column>
              <ListIOCCodes handleIOCCaseIDSelection={this.handleIOCCaseIDSelection}/>
            </Grid.Column>

            <Grid.Column>
              {ListCaseVersionsComponent}
            </Grid.Column>

             <Grid.Column>
              {ShowIOCsComponent}
            </Grid.Column>


            <Grid.Column>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>

            <Grid.Column>
                <ListLogtypes handleLogTypeSelection={this.handleLogTypeSelection}/>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>


          <Grid.Row>
            <Grid.Column>
                {ListCaseDirsComponent}
            </Grid.Column>

            <Grid.Column>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {ListCaseFilesComponent}
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>

          <input type="submit" value="Submit" />
        </Grid>
      </form>
      )

  }

}

export default App


