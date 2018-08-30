import React from 'react';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListFolders from './ListFolders.jsx';
import ListFiles from './ListFiles.jsx';


const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]



const DropdownCases = () => (
  <Dropdown placeholder='Skills' fluid multiple selection options={options} />
)


const DropdownDirs = () => (
  <Dropdown placeholder='Select Country' fluid search selection options={options} />
)



const SSGrid = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
        <DropdownCases />
      </Grid.Column>
      <Grid.Column width={8}>

      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={8}>
        <ListFolders />
      </Grid.Column>
      <Grid.Column width={8}>

      </Grid.Column>
    </Grid.Row>
  </Grid>

)

export default SSGrid


