import {Container, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import SearchBar from '../../SearchBar';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    marginBottom: theme.spacing(4),
  },
  section: {
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(12),
  },
  textCenter: {
    textAlign: 'center',
  },
}));

export default function Search() {
  const classes = useStyles();

  return (
    <Container className={`${classes.section} ${classes.textCenter}`}>
      <Typography variant="h1" gutterBottom>Start searching</Typography>
      <Grid container justify="center">
        <Grid item xs={12} sm={10} md={8} className={classes.searchBar}>
          <SearchBar label="Search" placeholder="Start searching"/>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="body1">
            Your trusted source for Government of Canada data in collaboration
            with provincial and academic sources.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
