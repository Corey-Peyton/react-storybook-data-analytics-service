import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  TableCell,
  Chip,
  IconButton,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {DialogAnalyst, DialogAnalystList} from './DialogBox';
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
    analystList: false,
  });

  function toggleDialog(value) {
    if (value === 'info') {
      setOpen({...open, analystInfo: !open.analystInfo});
    }
    if (value === 'list') {
      setOpen({...open, analystList: !open.analystList});
    }
  }

  if (role === 'researcher') {
    return (
      <TableCell className={classes.tablesCellsFlex}>
        <Typography variant="body2" noWrap={true}>{analyst[0]}</Typography>
        <IconButton onClick={() => toggleDialog('info')}>
          <AddCircleOutlineIcon />
        </IconButton>
        <DialogAnalyst selectedValue='null' open={open.analystInfo} clickHandler={() => toggleDialog('info')}/>
      </TableCell>
    );
  } else if (role === 'analyst') {
    if (analyst.length > 1) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]} onClick={() => toggleDialog('list')}/>
          <Chip label={extraAnalysts} onClick={() => toggleDialog('list')} />
          <DialogAnalystList open={open.analystList} clickHandler={() => toggleDialog('list')} />
        </TableCell>
      );
    } else if (analyst.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex} />
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]} onClick={() => toggleDialog('list')}/>
          <DialogAnalystList open={open.analystList} clickHandler={() => toggleDialog('list')} />
        </TableCell>
      );
    }
  }
};
