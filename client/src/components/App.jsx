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
      selectedCaseFiles: [],
      showWheel: false,
      showErrorMsg: false
    }
  }



  handleIOCCaseIDSelection(userInput) {

    this.setState({
      selectedIOCCaseID: userInput,
      showErrorMsg: false
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

    if (!this.state.selectedIOCCaseID) {
      this.setState({
        showErrorMsg: true
      })
    } else {

      this.setState({
        showWheel: true
      })
      $.ajax({
        url: '/searchioc',
        method: 'POST',
        data: this.state,
        success: (result) => {
          debugger;
          if (result) {
            this.setState({
              showWheel: false,
              submitMessage: result
            })
          }
          console.log('from search service', result)
        },
        error: (err) => {
          debugger;
          console.log('error')
          if (err) {
            this.setState({
              showWheel: false,
              submitMessage: err
            })
          }
        }
      })



    }


  }

  render() {
    var ListCaseDirsComponent;
    var ListCaseFilesComponent;
    var ListCaseVersionsComponent;
    var ShowIOCsComponent;
    var wheel;
    var errorMsg;

    var buttonStyle = {
      background: '#996633',
      fontSize: '12px',
      color: 'white',
      padding: '11px 35px',
      float: 'right'
    };


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

    if (this.state.showWheel && !this.state.showErrorMsg) {
      wheel = <div> <img src="https://localhost:7777/wheel.gif" height="40" width="40"/> </div>
    }

    if (this.state.showErrorMsg) {
      const pStyle = {
        color: 'red',
      };
      errorMsg = <p style={pStyle}>  IOC set is required  </p>
    }

    return (


      <form onSubmit={this.handleSubmit}>
        <Grid columns='equal'>
          <Grid.Row>
            <Grid.Column>
              {errorMsg}
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
          <div>
            <input type="submit" style={buttonStyle} value="Submit" />
            <br/> <br/>
          </div>
            {wheel}

        </Grid>
      </form>

    )
  }

}

export default App


