import React from 'react';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import ListDirs from './ListDirs.jsx';
import ListCases from './ListCases.jsx';


const SSGrid = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
        <ListCases />
      </Grid.Column>
      <Grid.Column width={8}>
        <ListDirs />
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

export default SSGrid

