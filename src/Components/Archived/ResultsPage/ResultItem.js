import React from 'react';
import Icon from '@mdi/react';
import {mdiTable, mdiNewspaper, mdiChartBar} from '@mdi/js';
import {Typography, Link, Chip, Box, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    'marginBottom': theme.spacing(3),
  },
  title: {
  },
  subjectTags: {
    'display': 'flex',
    'flexWrap': 'wrap',
    'marginTop': theme.spacing(1),
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      'overflowX': 'auto',
      'overflowY': 'hidden',
      'flexWrap': 'nowrap',
      '-ms-overflow-style': 'none',
      'scrollbarWidth': 'none',
      'marginRight': theme.spacing(-3),
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

export default function ResultItem(props) {
  const classes = useStyles();

  const MAX_LEN = 250;
  let trimmedAbstract = props.abstract.substring(0, MAX_LEN);
  trimmedAbstract = trimmedAbstract.substring(
      0,
      Math.min(MAX_LEN, trimmedAbstract.lastIndexOf(' ')),
  );

  let typeIcon;
  switch (props.type) {
    case 'Public dataset':
      typeIcon = <Icon className="icon-grey" path={mdiTable} size={1} />;
      break;
    case 'Confidential dataset':
      typeIcon = <Icon className="icon-grey" path={mdiTable} size={1} />;
      break;
    case 'Visualization':
      typeIcon = <Icon className="icon-grey" path={mdiChartBar} size={1} />;
      break;
    case 'Publication':
      typeIcon = <Icon className="icon-grey" path={mdiNewspaper} size={1} />;
      break;
    default:
      typeIcon = '';
  }


  const trimmedSubjects = props.subjects.slice(0, 3); // grab first 3 subjects

  return (
    <Grid item xs={12} sm={12} className={classes.root}>
      <Box component="h2" fontWeight="fontWeightRegular" fontSize="h6.fontSize" fontFamily="fontFamily">
        <Link
          component={RouterLink}
          to="/"
          color="primary"
          className={classes.title}
        >
          {props.title}
        </Link>
      </Box>
      <Typography variant="body2" component="span" color="textSecondary">
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(props.dateReleased))}
        {' '}&bull; {props.provider}{' '}&bull;{' '}{props.id}
      </Typography>
      <Typography variant="body2">
        {props.abstract.length <= MAX_LEN ?
          props.abstract :
          `${trimmedAbstract}...`}
      </Typography>
      <div className={classes.subjectTags}>
        <Chip
          variant="outlined"
          icon={typeIcon}
          label={props.type}
        />
        {trimmedSubjects.map((subject) => {
          return <Chip variant="outlined" key={subject} label={subject} />;
        })}
      </div>
    </Grid>
  );
}
