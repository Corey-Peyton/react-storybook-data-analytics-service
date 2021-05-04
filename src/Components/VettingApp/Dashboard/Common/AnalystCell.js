import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, TableCell, Chip} from '@material-ui/core';

import {ROW_HEIGHT} from './TableContainerComponent';

const useStyles = makeStyles((theme) => ({
  tablesCellsFlex: {
    display: 'flex',
    alignItems: 'center',
    minHeight: `calc(${ROW_HEIGHT}px - ${theme.spacing(2)}px)`,
  },
  leadChip: {
    paddingRight: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRight: '1px solid',
    borderRightColor: theme.palette.divider,
  },
}));

export default function AnalystCell(props) {
  const {t} = useTranslation();
  const {
    role,
    lead,
    support,
    toggleManageTeamDrawer,
    statusHead,
    clickHandler,
  } = props;
  const extraAnalysts = support.length;
  const classes = useStyles();

  const handleClick = (e) => {
    e.stopPropagation();
    if (role === 'analyst') {
      if (statusHead === 'approved' || statusHead === 'denied') {
        clickHandler(e);
      } else {
        toggleManageTeamDrawer(e);
      }
    } else {
      clickHandler(e);
    }
  };

  if (role === 'researcher') {
    if (lead !== '') {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={lead} onClick={handleClick} />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('Unassigned')}
          </Typography>
        </TableCell>
      );
    }
  } else if (role === 'analyst') {
    if (lead !== '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={lead} onClick={handleClick} className="mr-1" />
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={handleClick}
          />
        </TableCell>
      );
    } else if (lead !== '' && support.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={lead} onClick={handleClick} />
        </TableCell>
      );
    } else if (lead === '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('No lead')}
          </Typography>
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={handleClick}
            className="ml-1"
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('Unassigned')}
          </Typography>
        </TableCell>
      );
    }
  }
}
