import React from 'react';
import {useTranslation} from 'react-i18next';
import Icon from '@mdi/react';
import {
  mdiMonitorCellphone,
  mdiCheckCircle,
  mdiWindows,
  mdiInformationOutline,
} from '@mdi/js';
import {
  Typography,
  TableCell,
  TableRow,
  Grid,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ReplayIcon from '@material-ui/icons/Replay';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import {sortByKey} from '../../Utils/sorting';
import {projects} from '../../Data/fakeData';

const useStyles = makeStyles((theme) => ({
  info: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.grey[300],
    padding: [theme.spacing(0, 1), '!important'],
  },
  storage: {
    flexGrow: 1,
  },
  storageBar: {
    height: theme.spacing(1),
    width: '100%',
    backgroundColor: theme.palette.grey[300],
    margin: theme.spacing(0.5, 0),
  },
  storageBarGrey: {
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.grey[500],
    },
  },
  storageBarFull: {
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.error.main,
    },
  },
  greyedOutIcon: {
    fill: theme.palette.grey[400],
  },
  tableRow: {
    '& svg': {
      verticalAlign: 'middle',
    },
  },
}));

export default function Projects(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const projectsSorted = sortByKey(projects, 'title');

  return (
    <React.Fragment>
      {projectsSorted.map((project) => {
        if (project.status === props.status || props.status === 'All') {
          const isActive = project.status === 'Active';
          const spaceUsed =
            (project.storage.used / project.storage.total) * 100;
          const isAlmostFull = spaceUsed >= 90;

          return (
            <TableRow
              key={project.id}
              hover={isActive ? true : false}
              className={classes.tableRow}
            >
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Icon
                      path={mdiMonitorCellphone}
                      size={1}
                      className={isActive ? '' : classes.greyedOutIcon}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {t('ID')} {project.id}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Icon
                      path={mdiCheckCircle}
                      size={1}
                      className={isActive ? '' : classes.greyedOutIcon}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {project.status}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {t('Expiring on')}{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                      }).format(new Date(project.expiry))}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={2} alignItems="center" wrap="nowrap">
                  <Grid item>
                    <Icon
                      path={mdiWindows}
                      size={1}
                      className={isActive ? '' : classes.greyedOutIcon}
                    />
                  </Grid>
                  <Grid item className={classes.storage}>
                    <Typography
                      variant="body2"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {project.state}
                    </Typography>
                    <LinearProgress
                      className={`${classes.storageBar} ${
                        // add correct color class if inactive or almost full
                        !isActive ?
                          classes.storageBarGrey :
                          isAlmostFull ?
                          classes.storageBarFull :
                          ''
                      }`}
                      variant="determinate"
                      value={spaceUsed}
                    />
                    <Typography
                      variant="caption"
                      color={isActive ? 'textPrimary' : 'textSecondary'}
                    >
                      {project.storage.used} {project.storage.units} of{' '}
                      {project.storage.total} {project.storage.units} used
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="start"
                      disabled={
                        project.state === 'Running' || !isActive ? true : false
                      }
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="restart"
                      disabled={
                        project.state === 'Running' && isActive ? false : true
                      }
                    >
                      <ReplayIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="stop"
                      disabled={
                        project.state === 'Running' && isActive ? false : true
                      }
                    >
                      <StopIcon />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.info}>
                    <IconButton
                      aria-label="information"
                      onClick={props.toggleDetailsDrawer}
                      disabled={isActive ? false : true}
                      className="info-btn"
                    >
                      <Icon
                        path={mdiInformationOutline}
                        size={1}
                        className={isActive ? 'icon-grey' : classes.greyedOutIcon}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          );
        } else {
          return '';
        }
      })}
    </React.Fragment>
  );
}
