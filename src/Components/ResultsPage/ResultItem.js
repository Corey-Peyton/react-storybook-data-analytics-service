import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '@mdi/react';
import {mdiTable, mdiNewspaper, mdiChartBar} from '@mdi/js';
import {Typography, Link, Chip, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link as RouterLink} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    'marginBottom': theme.spacing(5),
    '& .MuiDivider-root': {
      margin: theme.spacing(1, 0),
    },
    'width': '100%',
  },
  title: {
    'maxWidth': '95%',
    '& h2': {
      maxWidth: '880px',
    },
  },
  subjectTags: {
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function ResultItem(props) {
  const classes = useStyles();
  const {t} = useTranslation();

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
      <Link
        component={RouterLink}
        to="/"
        color="primary"
        className={classes.title}
      >
        <Typography variant="h5" component="h2" noWrap>
          {props.title}
        </Typography>
      </Link>
      <Typography variant="body2">
        <Typography variant="body2" component="span" color="textSecondary">
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(props.dateReleased))}
        </Typography>
        &nbsp;-&nbsp;
        {props.abstract.length <= MAX_LEN
          ? props.abstract
          : `${trimmedAbstract}...`}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {props.id} {t('provided by')} {props.provider}
      </Typography>
      <Divider />
      <div className={classes.subjectTags}>
        <Chip
          variant="outlined"
          icon={typeIcon}
          label={props.type}
          className="mb-1"
        />
        {trimmedSubjects.map((subject) => {
          return <Chip className="mb-1" variant="outlined" key={subject} label={subject} />;
        })}
      </div>
    </div>
  );
}
