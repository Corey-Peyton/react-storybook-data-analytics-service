import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {SnackbarSupportFab} from '../CommonComponents/Snackbars';
import Fab from '@material-ui/core/Fab';
import Email from '@material-ui/icons/Email';
import {DialogGetSupportFab} from '../CommonComponents/DialogBox';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingSupportButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState({
    dialogSupportFab: false,
  });

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        variant="extended"
        aria-label="support"
        onClick={() => handleClickOpen('dialogSupportFab')}
        className={classes.fab}
      >
        <Email className={classes.extendedIcon} />
        Get support
      </Fab>
      <DialogGetSupportFab
        toggleDialog={() => handleClickClose('dialogSupportFab')}
        open={open.dialogSupportFab}
      />
      <SnackbarSupportFab
        open={open.snackbarSupportFab}
        handleClose={() => handleClickClose('snackbarSupportFab')}
      />
    </div>
  );
}
