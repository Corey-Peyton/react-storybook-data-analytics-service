import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  TableCell,
  Chip,
  IconButton,
  Link,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {DialogAnalyst, DialogManageTeam} from './DialogBox';
import {ROW_HEIGHT} from './TableContainerComponent';

const useStyles = makeStyles((theme) => ({

  tablesCellsFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: `calc(${ROW_HEIGHT}px - ${theme.spacing(2)}px)`,
  },
}),
);

export default function AnalystCell(props) {
  const {role, analyst} = props;
  const extraAnalysts = `+${analyst.length - 1}`;
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    analystInfo: false,
    manageTeam: false,
  });

  function toggleDialog(value) {
    if (value === 'info') {
      setOpen({...open, analystInfo: !open.analystInfo});
    }
    if (value === 'list') {
      setOpen({...open, manageTeam: !open.manageTeam});
    }
  }

  if (role === 'researcher') {
    return (
      <TableCell className={classes.tablesCellsFlex}>
        <Typography variant="body2" noWrap={true}>{analyst[0]}</Typography>
        <IconButton onClick={() => toggleDialog('info')}>
          <AddCircleOutlineIcon />
        </IconButton>
        <DialogAnalyst open={open.analystInfo} toggleDialog={() => toggleDialog('info')}/>
      </TableCell>
    );
  } else if (role === 'analyst') {
    if (analyst.length > 1) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]} onClick={() => toggleDialog('list')}/>
          <Chip label={extraAnalysts} onClick={() => toggleDialog('list')} />
          <DialogManageTeam open={open.manageTeam} toggleDialog={() => toggleDialog('list')} />
        </TableCell>
      );
    } else if (analyst.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Typography variant="body2">
            <Link onClick={() => toggleDialog('list')}>Manage team</Link>
          </Typography>
          <DialogManageTeam open={open.manageTeam} toggleDialog={() => toggleDialog('list')} />
        </TableCell>
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]} onClick={() => toggleDialog('list')}/>
          <DialogManageTeam open={open.manageTeam} toggleDialog={() => toggleDialog('list')} />
        </TableCell>
      );
    }
  }
};
