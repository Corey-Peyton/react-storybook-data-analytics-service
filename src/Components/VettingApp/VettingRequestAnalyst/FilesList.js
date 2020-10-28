import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Divider,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Table,
  TableBody,
  IconButton,
  Button,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(3, 0),
  },
  table: {
    width: '100%',
    margin: theme.spacing(3, 0),
  },
  fileName: {
    '& p': {
      maxWidth: '350px',
    },
  },
}));

const files = [
  {name: 'Output file example with a very long name.'},
  {
    name:
      'Another file with even a longer name for users who likes to be really descriptive. Yes, believe it happens!',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function FilesList(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');

  const handleRequestSort = (e) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <React.Fragment>
      <Typography>
        A brief explanation is needed to explain to external users what and why
        they need to complete this section.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6">
        Output files
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={order}>
              <TableSortLabel
                active={true}
                direction={order}
                onClick={handleRequestSort}
              >
                File name
                <span className="screen-reader-text">
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(files, getComparator(order, 'name')).map((file) => {
            return (
              <TableRow key={file.name}>
                <TableCell className={classes.fileName}>
                  <Typography variant="body2">{file.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton aria-label={`options for ${file.name}`}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary">
        Add Output File
      </Button>
    </React.Fragment>
  );
}
export default FilesList;
