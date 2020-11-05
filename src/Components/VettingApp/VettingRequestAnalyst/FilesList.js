import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
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
  Drawer,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import ModifyFile from './ModifyFile';

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
  drawer: {
    '& .MuiDrawer-paper': {
      maxWidth: '400px',
      padding: theme.spacing(0, 3, 3, 3),
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      paddingRight: theme.spacing(2),
    },
    '&:focus': {
      'backgroundColor': theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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
  const [state, setState] = React.useState({
    order: 'desc',
    open: false,
    anchorEl: null,
  });

  const handleRequestSort = (e) => {
    const isAsc = state.order === 'asc';
    setState({...state, order: isAsc ? 'desc' : 'asc'});
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({...state, open: open});
  };

  const handleMenuOpen = (event) => {
    setState({...state, anchorEl: event.currentTarget});
  };

  const handleMenuClose = () => {
    setState({...state, anchorEl: null});
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
            <TableCell sortDirection={state.order}>
              <TableSortLabel
                active={true}
                direction={state.order}
                onClick={handleRequestSort}
              >
                File name
                <span className="screen-reader-text">
                  {state.order === 'desc' ?
                    'sorted descending' :
                    'sorted ascending'}
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(files, getComparator(state.order, 'name')).map((file) => {
            return (
              <TableRow key={file.name}>
                <TableCell className={classes.fileName}>
                  <Typography variant="body2">{file.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label={`options for ${file.name}`}
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <StyledMenu
                    id="actions-menu"
                    anchorEl={state.anchorEl}
                    keepMounted
                    open={Boolean(state.anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <StyledMenuItem onClick={toggleDrawer(true)}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Modify" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Delete" />
                    </StyledMenuItem>
                  </StyledMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>
        Add Output File
      </Button>
      <Drawer
        anchor="right"
        open={state.open}
        onClose={toggleDrawer(false)}
        className={classes.drawer}
      >
        <ModifyFile toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  );
}
export default FilesList;
