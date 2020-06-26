import React from 'react';
import {Typography, Container, Grid, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  button: {
    marginTop: theme.spacing(4),
  },
  vis: {
    width: '100%',
  },
  gridContent: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '21em',
    },
  },
}));

const Visualizations = React.forwardRef((props, ref) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.section}>
      <Grid container spacing={4} direction="row-reverse">
        <Grid item xs={12} lg={4} className={classes.gridContent}>
          <Typography variant="h2" gutterBottom>
            Visualization tools to produce the results{' '}
            <Typography variant="inherit" color="primary">
              you need
            </Typography>
          </Typography>
          <Typography variant="body1">
            Discover and model the data in multiple variations to export and
            share with colleages.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            href="https://www.statcan.gc.ca/eng/interact/datavis"
          >
            Browse all data visualizations
          </Button>
        </Grid>
        <Grid item xs={12} lg={8}>
          <div className="screen-reader-text">
            <p>The data used to create this Visualization is from the following data table:</p>
            <p><a href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=2010002101">Table 20-10-0021-01 New motor vehicle registration</a></p>
            <button onClick={() => {
              ref.current.focus();
            }}>Skip the visual interactive dashboard</button>
          </div>
          <div className="resp-iframe-container">
            <iframe
              title="New Motor Vehicle Registrations Data Visualization Tool"
              className="resp-iframe"
              src="https://dv-vd.cloud.statcan.ca/home/index/71-607-x2019028_en"
            ></iframe>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
});

export default Visualizations;
