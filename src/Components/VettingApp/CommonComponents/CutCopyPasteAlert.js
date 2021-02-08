import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  blackColor: {
    color: theme.palette.text.primary,
  },
  whiteBG: {
    backgroundColor: theme.palette.common.white,
  },
  padding: {
    padding: '6px 16px',
  },
  root: {
    margin: theme.spacing(0, -2),
    width: 'auto',
    backgroundColor: theme.palette.common.white,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
}));

export default function CutCopyPasteAlert() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          className={classes.whiteBG}
          action={
            <Button size="small"
              className={classes.padding}
              onClick={() => {
                setOpen(false);
              }}
            >
              Understood
            </Button>
          }
        >
          <span className={classes.blackColor}>Cut, copy and paste functionality has been disabled on text fields for security purposes.</span>
        </Alert>
      </Collapse>
    </div>
  );
}
