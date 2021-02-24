import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import {
  Button,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  FormControl,
} from '@material-ui/core';
import Icon from '@mdi/react';
import ReplayIcon from '@material-ui/icons/Replay';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {mdiAccountPlus} from '@mdi/js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  InputLabel,
  Snackbar,
  Divider,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      'width': 400,
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiFormLabel-root': {
        'line-height': 1,
        'background-color': 'white',
      },
      '& .MuiOutlinedInput-multiline': {
        padding: 0,
      },
      '& .MuiOutlinedInput-inputMultiline': {
        'max-height': 130,
        'overflow': 'auto !important',
        'padding': theme.spacing(2),
      },
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  main: {
    background: theme.palette.grey[100],
    paddingBottom: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
  alert: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  headerBtn: {
    marginLeft: theme.spacing(3),
  },
  dialogFooter: {
    padding: theme.spacing(3, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: [theme.spacing(2), '!important'],
  },
  dialogRow: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
    height: '100%',
  },
  alertRow: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(0.75, 1),
  },
  hiddenRow: {
    display: 'none',
  },
  formControl: {
    'display': 'flex',
    'flexFlow': 'row',
    'justifyContent': 'space-between',
    '& .MuiTextField-root': {
      width: '49% !important',
    },
  },
}));

function ToolBarUnassign(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState({
    dialogUpdate: false,
    dialogUnAssign: false,
    dialogDeny: false,
    snackBarDeny: false,
    snackBarApprove: false,
    dialogApprove: false,
  });

  const [state, setState] = React.useState({
    comments: '',
    approveMinutes: '',
    approveHours: '',
    denyMinutes: '',
    denyHours: '',
  });

  const handleClickOpen = (state) => {
    setOpen({...open, [state]: true});
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };

  const handleDeny = () => {
    setOpen({...open, dialogDeny: false, snackBarDeny: true});
  };

  const handleApprove = () => {
    setOpen({...open, dialogApprove: false, snackBarApprove: true});
  };

  const [selected, setSelected] = React.useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const disableCutCopyPaste = (e, command, value) => {
    // display error if user tries to cut/copy/paste
    let msg;
    e.preventDefault();
    switch (command) {
      case 'cut':
        msg = t('Cut has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'copy':
        msg = t('Copy has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      case 'paste':
        msg = t('Paste has been disabled for security purposes.');
        setState({
          ...state,
          [value]: {
            ...state[value],
            commands: msg,
            errorText: msg,
          },
        });
        break;
      default:
        break;
    }
  };

  const toggleHelperText = (value) => {
    if (state[value].commands === state[value].errorText) {
      if (Boolean(state[value].invalid)) {
        // set error text back to invalid error
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: state[value].invalid,
          },
        });
      } else {
        // clear error text if no invalid error exists
        setState({
          ...state,
          [value]: {
            ...state[value],
            errorText: '',
          },
        });
      }
    }
  };

  const {t} = useTranslation();

  return (
    <Toolbar>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Back to vetting requests dashboard"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="subtitle1" component="p" className={classes.title}>
        Vetting requests dashboard
      </Typography>
      <Button
        onClick={() => handleClickOpen('dialogUnAssign')}
        className={classes.headerBtn}
        startIcon={
          <Icon path={mdiAccountPlus} className="icon-grey" size={1} />
        }
      >
        Unassign from me
      </Button>
      <Dialog
        open={open.dialogUnAssign}
        aria-labelledby="alert-dialog-unassign"
        aria-describedby="alert-dialog-unassign"
        onClose={() => handleClickClose('dialogUnAssign')}
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-update">
          <div className={classes.dialogTitle}>
            Unassign from me
            <IconButton
              onClick={() => handleClickClose('dialogUnAssign')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className="mb-2 mt-2">
          <Typography variant="body2">
            If you choose to proceed the request will no longer have a lead
            analyst and an email will be sent to the researcher notifying them
            of the change.
          </Typography>
        </DialogContent>
        <Divider className="mb-0" />
        <DialogActions className={classes.dialogFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClickClose('dialogUnAssign')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              props.handleUnassignFromMe();
              handleClickClose('dialogUnassign');
            }}
            className={classes.footerBtns}
          >
            Unassign
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        color="primary"
        className={classes.headerBtn}
        startIcon={<ReplayIcon />}
        onClick={() => handleClickOpen('dialogUpdate')}
      >
        Request an update
      </Button>
      <Dialog
        open={open.dialogUpdate}
        onClose={() => handleClickClose('dialogUpdate')}
        aria-labelledby="alert-dialog-update"
        aria-describedby="alert-dialog-update"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-update">
          <div className={classes.dialogTitle}>
            Request an update
            <IconButton
              onClick={() => handleClickClose('dialogUpdate')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <div className={classes.alertRow}>
          <Alert severity="warning" className={classes.alert}>
            Do not include any confidential information.
          </Alert>
        </div>
        <div className={classes.dialogRow}>
          <TextField
            id="update-input"
            label="Comments"
            variant="outlined"
            multiline
            className={classes.textField}
            required
            onCut={(e) => disableCutCopyPaste(e, 'cut', 'comments')}
            onCopy={(e) => disableCutCopyPaste(e, 'copy', 'comments')}
            onPaste={(e) => disableCutCopyPaste(e, 'paste', 'comments')}
            onClick={() => toggleHelperText('comments')}
            onBlur={() => toggleHelperText('comments')}
            onFocus={() => toggleHelperText('comments')}
            value={state.comments.text}
            error={Boolean(state.comments.errorText)}
            helperText={state.comments.errorText}
          />
        </div>
        <Divider className="mb-0 mt-3" />
        <DialogActions className={classes.dialogFooter}>
          <Button
            onClick={() => handleClickClose('dialogUpdate')}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleClickClose('dialogUpdate')}
            color="primary"
            variant="contained"
            className={classes.footerBtns}
          >
            Submit request
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        aria-controls="toolbar-unassign-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
        className={classes.headerBtn}
      >
        Resolve
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="toolbar-unassign-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClickOpen('dialogApprove')}>
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleClickOpen('dialogDeny')}>Deny</MenuItem>
      </Menu>
      <Dialog
        open={open.dialogApprove}
        onClose={() => handleClickClose('dialogApprove')}
        aria-labelledby="alert-dialog-approve"
        aria-describedby="alert-dialog-approve"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-approved-request">
          <div className={classes.dialogTitle}>
            Approve request
            <IconButton
              onClick={() => handleClickClose('dialogApprove')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant="subtitle2">Billable hours</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              label="Hours"
              customInput={TextField}
              type="text"
              variant="outlined"
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'approveHours')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'approveHours')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'approveHours')}
              onClick={() => toggleHelperText('approveHours')}
              onBlur={() => toggleHelperText('approveHours')}
              onFocus={() => toggleHelperText('approveHours')}
              value={state.approveHours.text}
              error={Boolean(state.approveHours.errorText)}
              helperText={state.approveHours.errorText}
            />
            <NumberFormat
              label="Minutes"
              customInput={TextField}
              type="text"
              variant="outlined"
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'approveMinutes')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'approveMinutes')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'approveMinutes')}
              onClick={() => toggleHelperText('approveMinutes')}
              onBlur={() => toggleHelperText('approveMinutes')}
              onFocus={() => toggleHelperText('approveMinutes')}
              value={state.approveMinutes.text}
              error={Boolean(state.approveMinutes.errorText)}
              helperText={state.approveMinutes.errorText}
            />
          </FormControl>
        </div>
        <Divider className="mt-2" />
        <DialogActions className={classes.dialogFooter}>
          <Button
            onClick={() => handleClickClose('dialogApprove')}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.footerBtns}
            onClick={handleApprove}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open.snackBarApprove}
        onClose={() => handleClickClose('snackBarApprove')}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert
          onClose={() => handleClickClose('snackBarApprove')}
          severity="success"
          className={classes.alert}
          variant="filled"
        >
          The vetting request 10_2020_4564677 has been approved.
        </Alert>
      </Snackbar>
      <Dialog
        open={open.dialogDeny}
        onClose={() => handleClickClose('dialogDeny')}
        aria-labelledby="alert-dialog-deny"
        aria-describedby="alert-dialog-deny"
        className={classes.root}
      >
        <DialogTitle id="alert-dialog-denied-request">
          <div className={classes.dialogTitle}>
            Deny request
            <IconButton
              onClick={() => handleClickClose('dialogDeny')}
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider />
        <div className={classes.alertRow}>
          <Alert severity="warning" className={classes.alert}>
            Do not include any confidential information.
          </Alert>
        </div>
        <div className={classes.dialogRow}>
          <Typography variant="subtitle2">Billable hours</Typography>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.formControl}>
            <NumberFormat
              label="Hours"
              customInput={TextField}
              type="text"
              variant="outlined"
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'denyHours')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'denyHours')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'denyHours')}
              onClick={() => toggleHelperText('denyHours')}
              onBlur={() => toggleHelperText('denyHours')}
              onFocus={() => toggleHelperText('denyHours')}
              value={state.denyHours.text}
              error={Boolean(state.denyHours.errorText)}
              helperText={state.denyHours.errorText}
            />
            <NumberFormat
              label="Minutes"
              customInput={TextField}
              type="text"
              variant="outlined"
              onCut={(e) => disableCutCopyPaste(e, 'cut', 'denyMinutes')}
              onCopy={(e) => disableCutCopyPaste(e, 'copy', 'denyMinutes')}
              onPaste={(e) => disableCutCopyPaste(e, 'paste', 'denyMinutes')}
              onClick={() => toggleHelperText('denyMinutes')}
              onBlur={() => toggleHelperText('denyMinutes')}
              onFocus={() => toggleHelperText('denyMinutes')}
              value={state.denyMinutes.text}
              error={Boolean(state.denyMinutes.errorText)}
              helperText={state.denyMinutes.errorText}
            />
          </FormControl>
        </div>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" required>
            <InputLabel id="denied-select-label">Denied reason</InputLabel>
            <Select
              labelId="denied-select-label"
              id="denied-select"
              onChange={handleChange}
              value={selected}
              label="Denied reason"
              fullWidth
              placeholder="Select an option"
            >
              <MenuItem value="">
                <em>Select an option</em>
              </MenuItem>
              <MenuItem value="Non-SSI project">Non-SSI project</MenuItem>
              <MenuItem value="Confidential requirements are not met">
                Confidential requirements are not met
              </MenuItem>
              <MenuItem value="Request is missing information">
                Request is missing information
              </MenuItem>
              <MenuItem value="Output file(s) are not in line with the project proposal">
                Output file(s) are not in line with the project proposal
              </MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <>
          {selected === 'Other' ? (
            <div className={classes.dialogRow}>
              <FormControl variant="outlined">
                <TextField
                  id="withdraw-input"
                  label="Comments"
                  variant="outlined"
                  multiline
                  required="true"
                  onCut={(e) => disableCutCopyPaste(e, 'cut', 'comments')}
                  onCopy={(e) => disableCutCopyPaste(e, 'copy', 'comments')}
                  onPaste={(e) => disableCutCopyPaste(e, 'paste', 'comments')}
                  onClick={() => toggleHelperText('comments')}
                  onBlur={() => toggleHelperText('comments')}
                  onFocus={() => toggleHelperText('comments')}
                  value={state.comments.text}
                  error={Boolean(state.comments.errorText)}
                  helperText={state.comments.errorText}
                />
              </FormControl>
            </div>
          ) : (
            <div className={classes.dialogRow}>
              <FormControl variant="outlined">
                <TextField
                  id="withdraw-input"
                  label="Comments"
                  variant="outlined"
                  multiline
                  onCut={(e) => disableCutCopyPaste(e, 'cut', 'comments')}
                  onCopy={(e) => disableCutCopyPaste(e, 'copy', 'comments')}
                  onPaste={(e) => disableCutCopyPaste(e, 'paste', 'comments')}
                  onClick={() => toggleHelperText('comments')}
                  onBlur={() => toggleHelperText('comments')}
                  onFocus={() => toggleHelperText('comments')}
                  value={state.comments.text}
                  error={Boolean(state.comments.errorText)}
                  helperText={state.comments.errorText}
                />
              </FormControl>
            </div>
          )}
        </>
        <Divider className="mt-2" />
        <DialogActions className={classes.dialogFooter}>
          <Button
            onClick={() => handleClickClose('dialogDeny')}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.footerBtns}
            onClick={handleDeny}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open.snackBarDeny}
        onClose={() => handleClickClose('snackBarDeny')}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert
          onClose={() => handleClickClose('snackBarDeny')}
          severity="success"
          className={classes.alert}
          variant="filled"
        >
          The vetting request 10_2020_4564677 has been denied.
        </Alert>
      </Snackbar>
    </Toolbar>
  );
}

export default ToolBarUnassign;
