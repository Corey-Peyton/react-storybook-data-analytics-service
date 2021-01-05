import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
  FormControl,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ModifyFile from './ModifyFile';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        'width': '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
      },
      '& .MuiInputBase-input': {
        'max-height': 130,
        'overflow': 'hidden auto !important',
      },
      '& .MuiAutocomplete-endAdornment': {
        'top': '5.5px',
      },
    },
  },
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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

  const toggleDrawer = (event, open) => {
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

  const [open, setOpen] = React.useState({
    dialogAddSupporting: false,
    snackbarAddSupporting: false,
    snackbarSave: false,
  });

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const saveChanges = (event) => {
    setOpen({...open, snackbarSave: true});
    toggleDrawer(event, false);
  };

  const addSupportingFile = () => {
    setOpen({...open, dialogAddSupporting: false, snackbarAddSupporting: true});
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
                    <StyledMenuItem onClick={(e) => toggleDrawer(e, true)}>
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
      <Button variant="contained" color="primary" onClick={(e) => toggleDrawer(e, true)}>
        Add Output File
      </Button>
      <Drawer
        anchor="right"
        open={state.open}
        onClose={(e) => toggleDrawer(e, false)}
        className={classes.drawer}
      >
        <ModifyFile toggleDrawer={toggleDrawer} saveChanges={saveChanges} handleClickOpen={handleClickOpen} />
      </Drawer>
      <Dialog
        open={open.dialogAddSupporting}
        onClose={() => handleClickClose('dialogAddSupporting')}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Add supporting file</Typography>
            <IconButton
              onClick={() => handleClickClose('dialogAddSupporting')}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <DialogContent>
          <FormControl
            required
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
          >
            <InputLabel id="outputFolder-label">
              Output folder name
            </InputLabel>
            <Select
              id="supportingFilesFolder"
              label="Supporting folder *"
              labelId="supportingFilesFolder-label"
            >
              <MenuItem key={-1} value="">
                None
              </MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle2">File #1 *</Typography>
          <Typography variant="subtitle2">
            Residual tables (see the vetting orientation)
          </Typography>
          <TextField
            className={classes.inputMargin}
            margin="dense"
            id="notes2"
            label="Notes"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
          />
        </DialogContent>
        <Divider className="mb-1 mt-2" />
        <DialogActions className={classes.dialogFooter}>
          <Button color="primary" variant="outlined" onClick={() => handleClickClose('dialogAddSupporting')}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained"
            onClick={addSupportingFile}
            className={classes.footerBtns}>
              Add supporting file</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open.snackbarAddSupporting} autoHideDuration={6000} onClose={() => handleClickClose('snackbarAddSupporting')} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <Alert
          severity="success"
          // className={classes.button}
          variant="filled"
          onClose={() => handleClickClose('snackbarAddSupporting')}
        >
          The supporting file has been added
        </Alert>
      </Snackbar>
      <Snackbar open={open.snackbarSave} autoHideDuration={6000} onClose={() => handleClickClose('snackbarSave')} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <Alert
          severity="success"
          className={classes.alert}
          variant="filled"
          onClose={() => handleClickClose('snackbarSave')}
        >
          The output file has been saved
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
export default FilesList;
