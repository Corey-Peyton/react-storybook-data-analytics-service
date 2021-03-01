import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: theme.spacing(1.5, 3),
    },
    '& .MuiSelect-select': {
      height: [theme.spacing(7), '!important'],
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  vettingContainerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vettingSection: {
    display: 'flex',
    flexFlow: 'column',
    padding: theme.spacing(3),
    overflowY: 'auto',
  },
  vettingRow: {
    'display': 'flex',
    'margin': theme.spacing(1.5, 0),
    'flexFlow': 'row',
    'height': '100%',
    'justifyContent': 'center',
    'width': '100%',
    'alignItems': 'center',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  vettingColumn: {
    'display': 'flex',
    'flexDirection': 'column',
    'width': '100%',
    'justifyContent': 'center',
    'marginRight': theme.spacing(1),
    'height': '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  emphasisBox: {
    background: '#ECEEF1',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderLeftStyle: 'solid',
    borderLeftWidth: '5px',
    borderLeftColor: theme.palette.primary.main,
  },
}));

function ResidualDisclosure(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    weightVar: false,
  });

  const weightOnChange = (e) => {
    if (e.target.value === 'Yes') {
      setState({...state, weightVar: true});
    } else {
      setState({...state, weightVar: false});
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Typography>
        A re-release of the same output after slight modifications greatly
        increases the risk of residual disclosure. Statistics Canada strongly
        recommends that researchers submit as few versions of the output as
        possible for release from the RDC.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" className="mb-2">
        Residual disclosure risk
      </Typography>
      <FormControl component="fieldset" className={classes.inputMargin}>
        <FormLabel component="legend">
          Does this output a weight variable?
        </FormLabel>
        <RadioGroup id="weightVariable" onChange={weightOnChange}>
          <FormControlLabel
            value="Yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>
      {state.weightVar && (
        <React.Fragment>
          <Typography component="h2" variant="h6" className="mb-2">
            Residual disclosure supporting files
          </Typography>
          <div className={classes.emphasisBox}>
            <Typography variant="subtitle2" className="mb-3">
              Supporting files for residual disclosure risk
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Residual tables (see the vetting orientation)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Both sets of syntax and highlight or indicate the changes.
                </Typography>
              </li>
            </ul>
          </div>
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            required
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className="mb-3"
            onClick={handleClickOpen}
          >
            Add output file
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            className={classes.root}
            disableBackdropClick
          >
            <DialogTitle id="form-dialog-title">
              <div className={classes.vettingContainerTitle}>
                Add supporting file
                <IconButton
                  onClick={() => handleClose('dialogUnAssign')}
                  edge="end"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <div className={classes.vettingSection}>
                <div className={classes.vettingRow}>
                  <div className={classes.vettingColumn}>
                    <FormControl
                      required
                      variant="outlined"
                      fullWidth
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
                  </div>
                </div>
                <Typography variant="subtitle2" component="h3">
                  File #1 *
                </Typography>
                <Typography variant="subtitle2" component="h3">
                  Residual tables (see the vetting orientation)
                </Typography>
                <div className={classes.vettingRow}>
                  <div className={classes.vettingColumn}>
                    <TextField
                      id="notes2"
                      label="Notes"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary" variant="contained">
                Add supporting file
              </Button>
            </DialogActions>
          </Dialog>
          <FormControl />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle2">File #1</Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="fileName1-label">File name</InputLabel>
                <Select
                  id="fileName1"
                  label="File name"
                  labelId="fileName1-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="fileContents1"
                label="File contents"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="notes1"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="subtitle2">File #2</Typography>
                </Grid>
                <Grid item>
                  <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <FormControl
                className={classes.inputMargin}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                <InputLabel id="fileName2-label">File name</InputLabel>
                <Select
                  id="fileName2"
                  label="File name"
                  labelId="fileName2-label"
                >
                  <MenuItem>File 1</MenuItem>
                  <MenuItem>File 2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="fileContents2"
                label="File contents"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
              <TextField
                className={classes.inputMargin}
                margin="dense"
                id="notes2"
                label="Notes"
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default ResidualDisclosure;
