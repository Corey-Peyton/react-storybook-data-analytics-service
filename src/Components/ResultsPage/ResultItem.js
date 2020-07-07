import React from 'react';
import Icon from '@mdi/react';
import {mdiTable, mdiNewspaper, mdiChartBar} from '@mdi/js';
import {Typography, Link, Chip} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    'marginBottom': theme.spacing(3),
    // 'width': '100%',
  },
  title: {
    // 'maxWidth': '95%',
    // '& h2': {
    //   maxWidth: '880px',
    // },
  },
  subjectTags: {
    'marginTop': theme.spacing(1),
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function ResultItem(props) {
  const classes = useStyles();

  const MAX_LEN = 250;
  let trimmedAbstract = props.abstract.substring(0, MAX_LEN);
  trimmedAbstract = trimmedAbstract.substring(
      0,
      Math.min(MAX_LEN, trimmedAbstract.lastIndexOf(' '))
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
    <div className={classes.root}>
      <Typography variant="h6" component="h2" noWrap>
        <Link
          component={RouterLink}
          to="/"
          color="primary"
          className={classes.title}
        >
          {props.title}
        </Link>
      </Typography>
      <Typography variant="body2" component="span" color="textSecondary">
        {new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }).format(new Date(props.dateReleased))}
        {' '}&bull; {props.provider}{' '}&bull;{' '}{props.id}
      </Typography>
      <Typography variant="body2">
        {props.abstract.length <= MAX_LEN
          ? props.abstract
          : `${trimmedAbstract}...`}
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
    </div>
  );
}
