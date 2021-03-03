import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, TableCell, Chip} from '@material-ui/core';

import {
  DialogAnalyst,
  DialogManageTeam,
} from '../../CommonComponents/DialogBox';
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
  const {role, analysts, support, toggleDialog} = props;
  const extraAnalysts = support.length;
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    // analystInfo: false,
    manageTeam: false,
  });

  // function toggleDialog(value, e) {
  //   e.stopPropagation();
  //   if (value === 'info') {
  //     setOpen({...open, analystInfo: !open.analystInfo});
  //   }
  //   if (value === 'list') {
  //     setOpen({...open, manageTeam: !open.manageTeam});
  //   }
  // }

  if (role === 'researcher') {
    if (analysts !== '') {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analysts} onClick={toggleDialog} />
          {/* <DialogAnalyst
            open={open.analystInfo}
            toggleDialog={(e) => toggleDialog('info', e)}
            header="Assignee details"
          /> */}
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
    if (analysts !== '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip
            label={analysts}
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('list', e);
            }}
            className="mr-1"
          />
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('list');
            }}
          />
          <DialogManageTeam
            open={open.manageTeam}
            toggleDialog={(e) => toggleDialog('list', e)}
          />
        </TableCell>
      );
    } else if (analysts !== '' && support.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip
            label={analysts}
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('list', e);
            }}
          />
          <DialogManageTeam
            open={open.manageTeam}
            toggleDialog={(e) => toggleDialog('list', e)}
          />
        </TableCell>
      );
    } else if (analysts === '' && support.length > 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('No lead')}
          </Typography>
          <Chip
            label={`${extraAnalysts} ${t('support')}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleDialog('list', e);
            }}
            className="ml-1"
          />
          <DialogManageTeam
            open={open.manageTeam}
            toggleDialog={(e) => toggleDialog('list', e)}
          />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2" color="textSecondary">
            {t('Unassigned')}
          </Typography>
          <DialogManageTeam
            open={open.manageTeam}
            toggleDialog={(e) => toggleDialog('list', e)}
          />
        </TableCell>
      );
    }
  }
}
