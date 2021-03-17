import React from 'react';
import {Grid, Chip, Typography, Divider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {mdiInboxArrowDown} from '@mdi/js';
import Icon from '@mdi/react';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  assignee: {
    display: 'flex',
    alignItems: 'center',
  },
  icongrey: {
    marginLeft: theme.spacing(1),
  },
  statusRight: {
    padding: theme.spacing(0.5, 2),
  },
  statusLeft: {
    padding: theme.spacing(0.5, 2),
    display: 'flex',
    alignItems: 'center',
  },
  headerBtn: {
    marginLeft: theme.spacing(1),
  },
}));

function Assignee(props) {
  const {toggleManageTeamDrawer} = props;
  const classes = useStyles();
  // No analysts assigned
  if (props.lead === '' && props.support.length === 0) {
    return <Typography variant="body2" color="textSecondary">Unassigned</Typography>;
    // Only lead analyst assigned
  } else if (props.lead !== '' && props.support.length === 0) {
    return (
      <>
        <Chip
          label={props.lead}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
        <Chip
          label={`${props.support.length} support`}
          className={classes.headerBtn}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
        />
      </>
    );
    // Only support analysts assigned
  } else if (props.lead === '' && props.support.length !== 0) {
    return (
      <>
        <Typography variant="body2" color="textSecondary">
          No lead
        </Typography>
        <Chip
          label={`${props.support.length} support`}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
          className="ml-1"
        />
      </>
    );
    // Both load and support analysts assigned
  } else {
    return (
      <>
        <Chip label={props.lead} onClick={props.handleDialogOpen} />
        <Chip
          label={`${props.support.length} support`}
          onClick={(e) => {
            e.stopPropagation();
            toggleManageTeamDrawer(e);
          }}
          className="ml-1"
        />
      </>
    );
  }
}

function AppBarUnAssign(props) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item className={classes.title}>
        <Typography variant="subtitle1" component="p">
          Vetting request · ID 0101-000000
        </Typography>
        <Typography variant="h6" component="h1">
          {props.title}
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.statusLeft}>
          <Icon path={mdiInboxArrowDown} size={1} />
          <Typography variant="body2" className={classes.icongrey}>Submitted</Typography>
        </div>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item className={classes.assignee}>
        <div className={classes.statusRight}>
          <Assignee {...props} />
        </div>
      </Grid>
    </Grid>
  );
}

export default AppBarUnAssign;
