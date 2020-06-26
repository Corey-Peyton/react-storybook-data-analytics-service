import React from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    '&::before': {
      display: 'none',
    },
    'marginBottom': theme.spacing(3),
    'backgroundColor': 'transparent',
    'boxShadow': 'none',
  },
  summary: {
    'borderWidth': '1px',
    'borderStyle': 'solid',
    'borderColor': theme.palette.grey[400],
    'borderRadius': '1.5em',
    '&$expanded': {
      backgroundColor: theme.palette.common.white,
      minHeight: 0,
      border: 'transparent',
      boxShadow: theme.shadows[5],
    },
  },
  expanded: {
    color: theme.palette.primary.main,
  },
  details: {
    padding: theme.spacing(2, 4, 2, 4),
  },
}));

export default function CustomExpansionPanel(props) {
  const classes = useStyles();

  return (
    <ExpansionPanel
      className={classes.root}
      expanded={props.expanded}
      onChange={props.onChange}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.summary,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography component="h3">{props.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Typography>{props.details}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
