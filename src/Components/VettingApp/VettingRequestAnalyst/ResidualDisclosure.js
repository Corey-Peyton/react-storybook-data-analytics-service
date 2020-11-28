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

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  emphasisBox: {
    background: theme.palette.grey[200],
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
      <FormControl
        component="fieldset"
        className={classes.inputMargin}
        // error={!!errors.consistentOutput}
      >
        <FormLabel component="legend">
          Does this output a weight variable?
        </FormLabel>
        {/* <Controller
                    render={({onBlur, onChange, value}) => ( */}
        <RadioGroup
          id="weightVariable"
          onChange={weightOnChange}
          // value={value}
        >
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
        {/* )} */}
        {/* name="consistentOutput"
              // control={control}
              // rules={{ required: requiredErrorMessage }}
            /> */}
        {/* <FormHelperText>{errors.consistentOutput?.message}</FormHelperText> */}
      </FormControl>
      {state.weightVar && (
        <React.Fragment>
          <Typography component="h2" variant="h6" className="mb-2">
        Residual disclosure supporting files
          </Typography>
          <div className={classes.emphasisBox}>
            <Typography variant="subtitle2" className="mb-3">Supporting files for residual disclosure risk</Typography>
            <ul>
              <li>
                <Typography variant="body2">Residual tables (see the vetting orientation)</Typography>
              </li>
              <li>
                <Typography variant="body2">Both sets of syntax and highlight or indicate the changes.</Typography>
              </li>
            </ul>
          </div>
          <FormControl
            className={classes.inputMargin}
            margin="dense"
            required
            variant="outlined"
            fullWidth />
          <Button variant="contained" color="primary" className="mb-3" onClick={handleClickOpen}>
            Add output file
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"

          >
            <DialogTitle id="form-dialog-title">Add supporting file</DialogTitle>
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
              <Typography variant="subtitle2">Residual tables (see the vetting orientation)</Typography>
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
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="outlined">Cancel</Button>
              <Button onClick={handleClose} color="primary" variant="contained">Add supporting file</Button>
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
                // name={'outputFiles[' + index + '].sheetName'}
                label="File contents"
                multiline
                rows={2}
                variant="outlined"
                // inputRef={register}
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
                // name={'outputFiles[' + index + '].sheetName'}
                label="File contents"
                multiline
                rows={2}
                variant="outlined"
                // inputRef={register}
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
