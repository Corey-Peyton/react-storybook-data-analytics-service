import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hr: {
    borderBottom: '1px solid #dedede',
  },
  avatar: {
    backgroundColor: '#4CAF50',
    color: theme.palette.grey[100],
  },
  avatarTransparent: {
    backgroundColor: 'transparent',
    color: theme.palette.grey[600],
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dialogRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
  },
  dialogText: {
    paddingLeft: theme.spacing(1),
  },
  dialogFooter: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const {onClose, selectedValue, open} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        <div className={classes.dialogTitle}>
          <Typography>Analyst information</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <hr className={classes.hr} />
      <div className={classes.dialogRow}>
        <Avatar className={classes.avatar}>A</Avatar>
        <Typography className={classes.dialogText}>brian.bill@cloud.statcan.ca</Typography>

      </div>
      <div className={classes.dialogRow}>
        <Avatar className={classes.avatarTransparent}>
          <PhoneIcon />
        </Avatar>
        <Typography className={classes.dialogText}>+1 343 567 7878</Typography>
      </div>
      <hr className={classes.hr} />
      <div className={classes.dialogFooter}>
        <Button variant="contained" color="primary" onClick={handleClose}>
            Go back
        </Button>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function AnalystDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddCircleOutlineIcon />
      </IconButton>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
