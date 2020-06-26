import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const subjects = [
  {
    subTopic: 'Economic accounts',
    img: process.env.PUBLIC_URL + '/images/report.jpg',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/economic_accounts',
  },
  {
    subTopic: 'Agriculture and food',
    img: process.env.PUBLIC_URL + '/images/fruit.png',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/agriculture_and_food',
  },
  {
    subTopic: 'Crime and Justice',
    img: process.env.PUBLIC_URL + '/images/gavel.png',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/crime_and_justice',
  },
  {
    subTopic: 'Population and demography',
    img: process.env.PUBLIC_URL + '/images/canada-bonhomme.jpg',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/population_and_demography',
  },
  {
    subTopic: 'Seniors and aging',
    img: process.env.PUBLIC_URL + '/images/seniors.jpg',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/seniors_and_aging',
  },
  {
    subTopic: 'Health',
    img: process.env.PUBLIC_URL + '/images/doctor.png',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/health',
  },
  {
    subTopic: 'Energy',
    img: process.env.PUBLIC_URL + '/images/energy.png',
    href: 'https://www.statcan.gc.ca/eng/topics-start/energy',
  },
  {
    subTopic: 'Indigenous peoples',
    img: process.env.PUBLIC_URL + '/images/indigenous-peoples.jpg',
    href: 'https://www.statcan.gc.ca/eng/subjects-start/indigenous_peoples',
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  section: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
  },
  subjectCard: {
    borderRadius: 0,
    boxShadow: 'none',
    breakInside: 'avoid',
  },
  subjectsGrid: {
    columnCount: 2,
    columnGap: theme.spacing(5),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      columnCount: 3,
    },
    [theme.breakpoints.up('lg')]: {
      columnCount: 4,
    },
  },
}));

export default function BrowseSubjects() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('button1');

  const handleClick = (button) => (event) => {
    setSelected(button);
  };

  return (
    <Container maxWidth="xl" className={classes.section}>
      <Grid container justify="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h2" gutterBottom>
            Finding the data you need has never been{' '}
            <Typography variant="inherit" color="primary">
              easier
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container justify="space-evenly">
            <Grid item xs={4}>
              <Typography variant="body1">
                We've created a central spot for you to discover, analyze and
                collaborate on Canadian Data. Use these new tools to search or
                browse for the information you need.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Find your trusted source of datasets, visualizations, indicators
                and geographical information from the Government of Canada and
                it's many partners.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="space-between">
            <Grid item>
              <fieldset className="toggle-buttons">
                <legend className="screen-reader-text">Subject filters</legend>
                <Button
                  className={selected === 'button1' ? 'selected' : ''}
                  onClick={handleClick('button1')}
                  aria-pressed={selected === 'button1' ? true : false}
                >
                  Popular Subjects
                </Button>
                <Button
                  className={selected === 'button2' ? 'selected' : ''}
                  onClick={handleClick('button2')}
                  aria-pressed={selected === 'button2' ? true : false}
                >
                  Automotive
                </Button>
                <Button
                  className={selected === 'button3' ? 'selected' : ''}
                  onClick={handleClick('button3')}
                  aria-pressed={selected === 'button3' ? true : false}
                >
                  Canadian Energy
                </Button>
                <Button
                  className={selected === 'button4' ? 'selected' : ''}
                  onClick={handleClick('button4')}
                  aria-pressed={selected === 'button4' ? true : false}
                >
                  Dimensions of Poverty Hub
                </Button>
                <Button
                  className={selected === 'button5' ? 'selected' : ''}
                  onClick={handleClick('button5')}
                  aria-pressed={selected === 'button5' ? true : false}
                >
                  Gender, Diversity & Inclusion
                </Button>
              </fieldset>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                href="https://www150.statcan.gc.ca/n1/en/subjects?MM=1"
              >
                Browse all subjects
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.subjectsGrid}>
          {subjects.map((subject) => {
            return (
              <Card className={classes.subjectCard} key={subject.subTopic}>
                <CardActionArea href={subject.href}>
                  <CardMedia image={subject.img} component="img" alt="" />
                  <Typography component="span" className="screen-reader-text">{subject.subTopic}</Typography>
                </CardActionArea>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {subject.subTopic}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}
