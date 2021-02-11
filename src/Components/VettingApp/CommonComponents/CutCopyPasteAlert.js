import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

export default function CutCopyPasteAlert() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <Button size="small"
              color="inherit"
              className={classes.padding}
              onClick={() => {
                setOpen(false);
              }}
            >
              Understood
            </Button>
          }
        >
          Cut, copy and paste functionality has been disabled on text fields for security purposes.
        </Alert>
      </Collapse>
    </div>
  );
}
