import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  TableCell,
  Chip,
} from '@material-ui/core';

import {DialogAnalyst} from './DialogBox';
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

  if (role === 'researcher') {
    return (
      <TableCell className={classes.tablesCellsFlex}>
        <Typography variant="body2" noWrap={true}>{analyst[0]}</Typography>
        <DialogAnalyst selectedValue='null'/>
      </TableCell>
    );
  } else if (role === 'analyst') {
    if (analyst.length > 1) {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]}/>
          <Chip label={extraAnalysts} />
        </TableCell>
      );
    } else if (analyst.length === 0) {
      return (
        <TableCell className={classes.tablesCellsFlex} />
      );
    } else {
      return (
        <TableCell className={classes.tablesCellsFlex}>
          <Chip label={analyst[0]}/>
        </TableCell>
      );
    }
  }
};
