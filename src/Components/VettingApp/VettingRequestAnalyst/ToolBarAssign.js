import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Toolbar, IconButton, Typography, TextField, Divider, FormControl} from '@material-ui/core';
import Icon from '@mdi/react';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import NumberFormat from 'react-number-format';

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
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  textField: {
    width: '100%',
    padding: 0,
  },
}));

function ToolBarAssign(props) {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" component="h2" className={classes.title}>
              Vetting requests dashboard
      </Typography>
      <Button
        color="primary"
        className={classes.headerBtn} onClick={handleClickOpen}>
        <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        <Typography variant="subtitle2" color="textSecondary" component="h3">Assign to me</Typography>
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
              Save
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Assign vetting request to me</Typography>
            <IconButton
              onClick={handleClose}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mt-3 pt-0">
          <Typography variant="subtitle2" className="mb-2">Provide a phone number</Typography>
          <FormControl variant="outlined" className={classes.textField}>
            <NumberFormat
              id='phone'
              label='Phone number *'
              customInput={TextField}
              type="text"
              variant='outlined'
              format="+1 (###) ### ####"
              mask="_"
              allowEmptyFormatting
              autoComplete='phone'
            />
          </FormControl>
        </DialogContent>
        <Divider className="mt-3 mb-1" />
        <DialogActions className={classes.dialogFooter}>
          <Button onClick={handleClose} color="primary" variant="outlined" >Cancel</Button>
          <Button onClick={props.assign} color="primary" variant="contained" className={classes.footerBtns}>Assign to me</Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

export default ToolBarAssign;

