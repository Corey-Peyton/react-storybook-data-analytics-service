import React from 'react';
import {Typography, Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Typography variant="h1">404 Not Found</Typography>
    </Container>
  );
}
