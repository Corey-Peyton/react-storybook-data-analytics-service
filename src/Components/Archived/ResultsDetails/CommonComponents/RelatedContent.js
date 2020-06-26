import {Box, Divider, ExpansionPanel, ExpansionPanelSummary, Fab, Grid, Link, List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';
import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import ReactPlayer from 'react-player';

import {articles} from '../../../../Data/fakeData';
import CustomCard from '../../LandingPage/CustomCard';

const useStyles = makeStyles((theme) => ({
  arrow: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  cardRoot: {
    margin: theme.spacing(0, 2),
    width: '25em',
    height: '14em',
  },
  cardContent: {
    whiteSpace: 'normal',
    height: '5em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  relatedInfo: {
    '& .MuiPaper-root': {
      padding: theme.spacing(2),
    },
  },
}));

export const Faq = () => {
  return (
    <section className="grey-section">
      <Grid container alignItems="center" spacing={6}>
        <Grid item>
          <Typography variant="h5" component="h2" gutterBottom>
            Frequently Asked Questions
          </Typography>
        </Grid>
        <Grid item>
          <Link>
            <Typography gutterBottom>View the FAQ library</Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item>
          <ReactPlayer
            url="https://youtu.be/OzjM4Kn2U2w"
            width={'100%'}
            height={'100%'}
          />
        </Grid>
        <Grid item>
          <ReactPlayer
            url="https://youtu.be/B2HaWIK97YQ"
            width={'100%'}
            height={'100%'}
          />
        </Grid>
        <Grid item>
          <ReactPlayer
            url="https://youtu.be/cRge27wmsSU"
            width={'100%'}
            height={'100%'}
          />
        </Grid>
      </Grid>
    </section>
  );
};

export const RelatedInfo = () => {
  return (
    <section>
      <Typography
        variant="h5"
        component="h2"
        className="heading-underline"
        gutterBottom
      >
        Related information
      </Typography>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="data-content"
          id="data-header"
        >
          <Typography>Data</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="vis-content"
          id="vis-header"
        >
          <Typography>Visualizations</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pub-content"
          id="pub-header"
        >
          <Typography>Publications</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="indic-content"
          id="indic-header"
        >
          <Typography>Indicators</Typography>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    </section>
  );
};

export const RelatedInfoList = (props) => {
  const classes = useStyles();
  return (
    <section className={classes.relatedInfo}>
      <Paper>
        <div className="paper-heading">
          <Typography variant="h6" component="h2">
            Related information
          </Typography>
        </div>
        <Box mb={3}>
          <div className="icon-heading heading-underline">
            <DescriptionIcon />
            <Typography>Data</Typography>
          </div>
          <List>
            {props.relatedInfo.data.map((dataItem, index) => (
              <ListItem key={index} component="li" button>
                <ListItemText primary={dataItem} />
              </ListItem>
            ))}
          </List>
        </Box>
        <div className="icon-heading">
          <ImageIcon />
          <Typography>Visualizations</Typography>
        </div>
        <Divider />
        <List>
          {props.relatedInfo.vis.map((visItem, index) => (
            <ListItem key={index} component="li" button>
              <ListItemText primary={visItem} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </section>
  );
};

export const RelatedNews = () => {
  const classes = useStyles();

  const realtedArticles = () => {
    return articles.map((article) => (
      <CustomCard
        key={article.title}
        className={classes.cardRoot}
        img={article.img}
        content={
          <div className={classes.cardContent}>
            <Typography variant="overline">{article.date}</Typography>
            <Typography variant="body1" component="h3">
              {article.title}
            </Typography>
          </div>
        }
      />
    ));
  };

  const arrowLeft = () => {
    return (
      <Fab aria-label="next" color="primary" className={classes.arrow}>
        <ArrowBackIcon fontSize="large" />
      </Fab>
    );
  };

  const arrowRight = () => {
    return (
      <Fab aria-label="next" color="primary" className={classes.arrow}>
        <ArrowForwardIcon fontSize="large" />
      </Fab>
    );
  };
  return (
    <section>
      <Typography variant="h5" component="h2" gutterBottom>
        Related news and articles
      </Typography>
      <ScrollMenu
        data={realtedArticles()}
        arrowLeft={arrowLeft()}
        arrowRight={arrowRight()}
        alignCenter={false}
        wheel={false}
      />
    </section>
  );
};
