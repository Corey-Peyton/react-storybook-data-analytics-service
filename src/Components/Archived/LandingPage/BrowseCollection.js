import {Container, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import CustomCard from './CustomCard';
import {GraphIcon, LaptopIcon, MapIcon} from './Icons';

const useStyles = makeStyles((theme) => ({
  cardIcon: {
    fontSize: '3.5rem',
    color: theme.palette.primary.main,
    paddingRight: theme.spacing(2),
  },
  cardRoot: {
    'height': '18.75em',
    'textAlign': 'left',
    '& .MuiCardContent-root': {
      height: 'calc(100% - 10em)',
      display: 'flex',
      alignItems: 'center',
    },
  },
  section: {
    padding: theme.spacing(0, 12, 12, 12),
    textAlign: 'center',
  },
}));

export default function BrowseCollection() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.section}>
      <Typography variant="h2" gutterBottom>
        Browse our{' '}
        <Typography variant="inherit" color="primary">
          collection
        </Typography>
      </Typography>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            className={classes.cardRoot}
            img={process.env.PUBLIC_URL + '/images/laptop.jpg'}
            href="https://www150.statcan.gc.ca/n1/en/type/data?subject_levels=25"
            content={
              <React.Fragment>
                <LaptopIcon className={classes.cardIcon} />
                <div>
                  <Typography variant="overline">Browse</Typography>
                  <Typography variant="h5" component="h3">
                    Datasets
                  </Typography>
                  <Typography variant="body2">
                    Expansive collection of datasets from trusted sources.
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            className={classes.cardRoot}
            img={process.env.PUBLIC_URL + '/images/canada-flag.jpeg'}
            href="https://www150.statcan.gc.ca/n1/en/geo?MM=1&geotext=Canada%20%5BCountry%5D&geocode=A000011124"
            content={
              <React.Fragment>
                <MapIcon className={classes.cardIcon} />
                <div>
                  <Typography variant="overline">Browse</Typography>
                  <Typography variant="h5" component="h3">
                    Geography
                  </Typography>
                  <Typography variant="body2">
                    Find data through geographic searches and
                    visualizations.
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            className={classes.cardRoot}
            img={process.env.PUBLIC_URL + '/images/infographics.jpg'}
            href="https://www150.statcan.gc.ca/n1/pub/11-627-m/index-eng.htm"
            content={
              <React.Fragment>
                <GraphIcon className={classes.cardIcon} />
                <div>
                  <Typography variant="overline">Browse</Typography>
                  <Typography variant="h5" component="h3">
                    Infographics
                  </Typography>
                  <Typography variant="body2">
                    Save time in creating your own and browse through the huge
                    collection.
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
