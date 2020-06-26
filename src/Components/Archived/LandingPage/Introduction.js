import {Container, Dialog, Fab, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import ReactPlayer from 'react-player';

import CustomExpansionPanel from './CustomExpansionPanel';

const useStyles = makeStyles((theme) => ({
  greySection: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    backgroundColor: theme.palette.grey[100],
  },
  visContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  video: {
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
    '& img': {
      width: '100%',
      height: '100%',
      marginTop: '40px',
      boxShadow: theme.shadows[20],
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
    },
  },
  videoDialog: {
    '& .MuiPaper-root': {
      overflowY: 'hidden',
      [theme.breakpoints.up('xs')]: {
        width: '480px',
        height: '270px',
      },
      [theme.breakpoints.up('sm')]: {
        width: '640px',
        height: '360px',
      },
      [theme.breakpoints.up('md')]: {
        width: '960px',
        height: '540px',
      },
      [theme.breakpoints.up('lg')]: {
        width: '1280px',
        height: '720px',
      },
    },
    '& #player': {
      width: '100%',
      height: '100%',
    },
  },
  playButton: {
    color: theme.palette.common.white,
    height: theme.spacing(10),
    width: theme.spacing(10),
    marginBottom: theme.spacing(1),
  },
  buttonContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '40%',
      left: '-40px',
    },
  },
  imageContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '90%',
    },
  },
}));

export default function Introduction() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    expanded: false,
    open: false,
  });

  const handleClickOpen = () => {
    setState({...state, open: true});
  };

  const handleClose = () => {
    setState({...state, open: false});
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setState({...state, expanded: isExpanded ? panel : false});
  };

  return (
    <Container maxWidth="xl" className={classes.greySection}>
      <Grid container className={classes.visContainer}>
        <Grid item xs={8} lg={4}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h2" gutterBottom>
                Search and analysis{' '}
                <Typography variant="inherit" color="primary">
                  in one location
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomExpansionPanel
                id="search-pnl"
                summary="Search"
                details="We're listening to what you've told us about finding data. We've provided an inclusive tool to search or browse through our data and request access to various datasets and information."
                expanded={state.expanded === 'panel1'}
                onChange={handleChange('panel1')}
              />
              <CustomExpansionPanel
                id="analysis-pnl"
                summary="Analysis"
                details="Analysis is a complicated process to produce the data relationships and visualizations you need. In the past, you needed to visit a data center to complete this. We've now enhanced the process and offer the access virtually."
                expanded={state.expanded === 'panel2'}
                onChange={handleChange('panel2')}
              />
              <CustomExpansionPanel
                id="data-pnl"
                summary="Data"
                details="Get more of what you are looking for!  This user-centric platform allows you to access data from a variety of sources including survey and administrative data, web scraping, sensors and open data.  This interactive tool collects information on a variety of subjects and presents them to you using data sets, visualizations, infographics and thematic maps."
                expanded={state.expanded === 'panel3'}
                onChange={handleChange('panel3')}
              />
              <CustomExpansionPanel
                id="pub-pnl"
                summary="Publications"
                details="With a touch of a button, you are able to access the latest articles, reports, briefings and journals on your selected topic of interest."
                expanded={state.expanded === 'panel4'}
                onChange={handleChange('panel4')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={8} className={classes.video}>
          <div className={classes.imageContainer}>
            <div className={classes.buttonContainer}>
              <Fab
                color="primary"
                aria-label="Open video: Joe Anonymous: The path to confidentiality"
                className={classes.playButton}
                onClick={handleClickOpen}
              >
                <PlayArrowIcon fontSize="large" />
              </Fab>
            </div>
            <img
              src={process.env.PUBLIC_URL + '/images/anonymous.jpg'}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <Dialog
        className={classes.videoDialog}
        maxWidth="xl"
        open={state.open}
        onClose={handleClose}
        aria-labelledby="video-title"
        aria-describedby="video-description"
      >
        <ReactPlayer
          url="https://youtu.be/lBcQ9v5jYGc"
          width={'100%'}
          height={'100%'}
          controls={true}
        />
        <div className="screen-reader-text">
          <h3>Joe Anonymous - Transcript</h3>
          <p>
            (The Statistics Canada symbol and Canada wordmark appear on screen
            with the title: "Joe Anonymous")
          </p>
          <p>
            Did you know that StatCan data can impact your pension and wage
            rate? Or that business decisions or your eligibility for a loan
            depend on our quality and timely data?
          </p>
          <p>
            But there are some misconceptions about how we acquire some of our
            data, and it is clear from discussions that Canadians have many
            questions concerning how we anonymize their information.
          </p>
          <p>
            So let's try to explain the processes in place that prevent the
            sharing of your personal, private and financial information. First
            know we are obligated to fully protect and safeguard your privacy –
            it is the law.
          </p>
          <p>
            Your personal information has always — and will always be —
            protected.
          </p>
          <p>
            This is not just a commitment, it is built into our work and our
            culture. None of your private information can be released under any
            law. To anyone. No exceptions.
          </p>
          <p>Let's detail precisely how we protect your information.</p>
          <p>
            When your data arrives at Statistics Canada—whether it be from
            surveys or administrative data sources—some of your private
            information is used to create a demographic profile. Then we remove
            and lock away the private information, keeping only data like
            gender, age and region.
          </p>
          <p>Let's use Joe Jupiter as an example.</p>
          <p>
            Joe buys food, clothing, and hockey tickets online. This data is
            collected by StatCan.
          </p>
          <p>
            From there, Joe Jupiter's identity is removed from his data. And all
            that we keep, for analytical purposes, is the general information
            such as his age, gender and region. This information is merged with
            information from other people who share the same gender, age, and
            geographical region.
          </p>
          <p>
            With thousands of up-to-date records collected in a similar manner,
            we are able to provide important information to improve government
            programs and policies. The results of these statistics can also
            provide you with useful information.
          </p>
          <p>
            We want to assure you that all the information we collect is kept in
            the strictest confidence.
          </p>
          <p>
            No information is ever released that would identify you, your
            family, or your business.
          </p>
          <p>That is our promise to you.</p>
          <p>
            Transparency is important to us. On our website, you'll find a list
            of our surveys and administrative data sources, and how they're
            used.
          </p>
          <p>Delivering insight through data for a better Canada.</p>
          <p>(Canada wordmark appears.)</p>
        </div>
      </Dialog>
    </Container>
  );
}
