import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Container, Fab, Grid, Typography} from '@material-ui/core';
import {fade, makeStyles} from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';

import {articles} from '../../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  articleCard: {
    display: 'inline-flex',
    whiteSpace: 'normal',
    flexDirection: 'column',
    padding: theme.spacing(2),
    borderRadius: 0,
    boxShadow: 'none',
    width: '480px',
  },
  articleCardActions: {
    'padding': 0,
    'flexWrap': 'wrap',
    '& .MuiChip-root': {
      margin: theme.spacing(0, 1, 1, 0),
    },
  },
  articleCardContent: {
    padding: theme.spacing(2, 0),
    minHeight: '11em',
  },
  articlesContainer: {
    'padding': 0,
    'whiteSpace': 'nowrap',
    'overflowX': 'scroll',
    'position': 'relative',
    'scrollBehavior': 'smooth',
    'scrollbarWidth': 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  arrowButton: {
    'boxShadow': theme.shadows[4],
    'position': 'absolute',
    'right': '-60px',
    'zIndex': 500,
    '&$arrowButtonDisabled': {
      backgroundColor: fade(theme.palette.primary.main, 0.5),
      color: fade(theme.palette.common.white, 0.5),
    },
  },
  arrowButtonDisabled: {},
  arrowForwardButton: {
    top: '30%',
  },
  arrowBackButton: {
    top: '20%',
  },
  cardMedia: {
    height: '300px',
  },
  button: {
    marginTop: theme.spacing(4),
  },
  section: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    paddingRight: 0,
    overflowX: 'hidden',
  },
  subjectList: {
    padding: 0,
    marginLeft: [0, '!important'],
  },
  gridContent: {
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      minWidth: '19em',
    },
  },
}));

const Articles = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    selected: 'button1',
    scrollAtStart: true,
    scrollAtEnd: false,
  });

  const MAX_LEN = 250;
  const ARTCL_W = 515;
  const carouselRef = React.createRef();

  const handleClick = (button) => (event) => {
    setState({...state, selected: button});
  };

  const onClickLeft = () => {
    carouselRef.current.scrollLeft -= ARTCL_W;
  };

  const onClickRight = () => {
    carouselRef.current.scrollLeft += ARTCL_W;
  };

  return (
    <Container maxWidth="xl" className={classes.section}>
      <Grid container justify="flex-end" spacing={4}>
        <Grid item xs={5} lg={3} className={classes.gridContent}>
          <Typography ref={ref} tabIndex="-1" variant="h2" gutterBottom>
            Interesting articles updated{' '}
            <Typography variant="inherit" color="primary">
              daily
            </Typography>
          </Typography>
          <fieldset className="vertical-toggle-buttons">
            <legend className="screen-reader-text">Article filters</legend>
            <Button
              className={state.selected === 'button1' ? 'selected' : ''}
              onClick={handleClick('button1')}
              aria-pressed={state.selected === 'button1' ? true : false}
            >
              The daily
            </Button>
            <Button
              className={state.selected === 'button2' ? 'selected' : ''}
              onClick={handleClick('button2')}
              aria-pressed={state.selected === 'button2' ? true : false}
            >
              Business
            </Button>
            <Button
              className={state.selected === 'button3' ? 'selected' : ''}
              onClick={handleClick('button3')}
              aria-pressed={state.selected === 'button3' ? true : false}
            >
              Travel
            </Button>
            <Button
              className={state.selected === 'button4' ? 'selected' : ''}
              onClick={handleClick('button4')}
              aria-pressed={state.selected === 'button4' ? true : false}
            >
              Lifestyle
            </Button>
            <Button
              className={state.selected === 'button5' ? 'selected' : ''}
              onClick={handleClick('button5')}
              aria-pressed={state.selected === 'button5' ? true : false}
            >
              Food
            </Button>
          </fieldset>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            href="https://www150.statcan.gc.ca/n1/dai-quo/index-eng.htm"
          >
            Browse all articles
          </Button>
          <Fab
            aria-label="previous"
            classes={{
              root: `${classes.arrowBackButton} ${classes.arrowButton}`,
              // disabled: classes.arrowButtonDisabled,
            }}
            color="primary"
            // disabled={state.scrollAtStart}
            onClick={onClickLeft}
          >
            <ArrowBackIcon fontSize="large" />
          </Fab>
          <Fab
            aria-label="next"
            classes={{
              root: `${classes.arrowForwardButton} ${classes.arrowButton}`,
              // disabled: classes.arrowButtonDisabled,
            }}
            color="primary"
            // disabled={state.scrollAtEnd}
            onClick={onClickRight}
          >
            <ArrowForwardIcon fontSize="large" />
          </Fab>
        </Grid>
        <Grid item xs={7} lg={9}>
          <div className={classes.articlesContainer} ref={carouselRef}>
            {articles.map((article) => {
              let trimmedDescrption = article.description.substring(0, MAX_LEN);
              trimmedDescrption = trimmedDescrption.substring(
                  0,
                  Math.min(MAX_LEN, trimmedDescrption.lastIndexOf(' ')),
              );
              const trimmedSubjects = article.subjects.slice(0, 3); // grab first 3 subjects
              return (
                <Card className={classes.articleCard} key={article.title}>
                  <CardActionArea href={article.link}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={article.img}
                      component="img"
                      alt=""
                    />
                    <Typography component="span" className="screen-reader-text">{article.title}</Typography>
                  </CardActionArea>
                  <CardContent className={classes.articleCardContent}>
                    <Typography variant="overline">{article.date}</Typography>
                    <Typography variant="h5" component="h3" gutterBottom={true}>
                      {article.title}
                    </Typography>
                    <Typography variant="body1">
                      {article.description.length <= MAX_LEN ?
                        article.description :
                        `${trimmedDescrption}...`}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.articleCardActions}>
                    <h4 className="screen-reader-text">Subjects</h4>
                    <ul className={classes.subjectList}>
                      {trimmedSubjects.map((subject) => (
                        <Chip variant="outlined" component="li" label={subject} key={subject} />
                      ))}
                    </ul>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
});

export default Articles;
