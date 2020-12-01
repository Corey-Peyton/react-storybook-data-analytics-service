import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import {
  Typography,
  TextField,
  FormControl,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import CustomizedSnackbar from './CustomizedSnackbar';
import {AnalystMenu} from './ContextMenu';
import {analystList} from '../../../../Data/fakeData';

const ROW_HEIGHT = 56;

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
  avatar: {
    backgroundColor: green[500],
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
    padding: theme.spacing(1, 3),
  },
  dialogText: {
    paddingLeft: theme.spacing(1),
  },
  analystListing: {
    display: 'flex',
    flexFlow: 'column',
    marginRight: 'auto',
  },
  supportAnalysts: {
    maxHeight: `calc(${ROW_HEIGHT}px * 3)`,
    overflow: 'auto',
  },
  dialogFooter: {
    padding: theme.spacing(2, 3),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  footerBtns: {
    marginLeft: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
}));

export function DialogAnalyst(props) {
  const {open, clickHandler} = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog onClose={clickHandler} aria-labelledby="dashboard-dialog-title" open={open}>
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Analyst information</Typography>
            <IconButton
              onClick={clickHandler}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
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
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="contained" color="primary" onClick={clickHandler}>
            Go back
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogAnalystList(props) {
  const {open, clickHandler} = props;
  const classes = useStyles();
  const [analysts, setAnalysts] = React.useState(analystList);
  const [selected, setSelected] = React.useState([]);

  const makeLead = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
            item.role === 'lead' ?
            {...item, role: 'support'}:
            item.id === value.id ?
            {...item, role: 'lead'} :
            item,
        ));
  };

  const makeSupport = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
          item.id === value.id ?
          {...item, role: 'support'} :
          item,
        ));
  };

  const unassignRequest = (value) => (e) => {
    setAnalysts(
        analysts.map((item) =>
        item.id === value.id ?
        {...item, assigned: false, role: 'support'} :
        item,
        ));
  };

  function selectSupports(value) {
    const ids = value.map((item) => {
      return item.id;
    });

    setAnalysts(
        analysts.map((item) =>
        ids.includes(item.id) ?
        {...item, assigned: true, role: 'support'} :
        item,
        ));

    setSelected([]);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={clickHandler}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Analyst information</Typography>
            <IconButton
              onClick={clickHandler}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2'>Lead</Typography>
        </div>
        {analysts.filter((analyst) => analyst.assigned && analyst.role === 'lead').map((analyst) => {
          return (
            <div className={classes.dialogRow} key={analyst.id}>
              <Avatar>
                <Icon path={mdiAccount} size={1}/>
              </Avatar>
              <div className={classes.analystListing}>
                <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
                <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
              </div>
              <AnalystMenu role={'lead'} makeSupport={makeSupport(analyst)} unassignRequest={unassignRequest(analyst)}/>
            </div>

          );
        })
        }
        <Divider className='mt-3 mb-3'/>
        <div className={classes.dialogRow}>
          <FormControl variant="outlined" className={classes.textField}>
            <Autocomplete
              value={selected}
              multiple
              limitTags={2}
              clearOnEscape={true}
              disableCloseOnSelect={true}
              id="analyst-multiselect"
              options={analysts.filter((analyst) => !analyst.assigned)}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                setSelected(value);
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    label='Search support analysts'
                    // InputProps={{
                    //   ...params.InputProps,
                    //   startAdornment: (
                    //     <InputAdornment position="end">
                    //       <SearchIcon />
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                );
              }
              }
            />
          </FormControl>
        </div>
        <div className={classes.dialogRow}>
          <Button variant="outlined" color="primary" onClick={() => selectSupports(selected)} >
            Add support analyst
          </Button>
        </div>
        <div className={classes.dialogRow}>
          <Typography variant='subtitle2' className='mt-2'>Support Analysts</Typography>
        </div>
        <div className={classes.supportAnalysts}>
          {analysts.filter((analyst) => analyst.assigned && analyst.role === 'support').map((analyst) => {
            return (
              <div className={classes.dialogRow} key={analyst.id}>
                <Avatar >
                  <Icon path={mdiAccount} size={1} />
                </Avatar>
                <div className={classes.analystListing}>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.name}</Typography>
                  <Typography className={classes.dialogText} variant='body2'>{analyst.email}</Typography>
                </div>
                <AnalystMenu role={'support'} makeLead={makeLead(analyst)} unassignRequest={unassignRequest(analyst)}/>
              </div>
            );
          })
          }
        </div>
        <Divider className="mt-3" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={clickHandler} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={clickHandler} className={classes.footerBtns}>
            Apply
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export function DialogWithdraw(props) {
  const classes = useStyles();
  const {toggleDialog, open} = props;
  const [snackbar, setSnackbar] = React.useState(false);

  const toggleSnackbar = () => {
    toggleDialog();
    setSnackbar(!snackbar);
  };

  const SnackbarClose =() =>{
    setSnackbar(false);
  };

  return (
    <React.Fragment>
      <Dialog
        onClose={toggleDialog}
        aria-labelledby="dashboard-dialog-title"
        open={open}
        className={classes.root}
      >
        <DialogTitle id="dashboard-dialog-title">
          <div className={classes.dialogTitle}>
            <Typography variant='h6'>Withdraw Request</Typography>
            <IconButton
              onClick={toggleDialog}
              edge='end'>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <Divider className="mb-2" />
        <div className={classes.dialogRow}>
          <TextField
            id="outlined-basic"
            label="Comments *"
            variant="outlined"
            placeholder="Please provite us with a withdrawal reason"
            multiline
          />
        </div>
        <Divider className="mt-2" />
        <div className={classes.dialogFooter}>
          <Button variant="outlined" color="primary" onClick={toggleDialog} className={classes.footerBtns}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={toggleSnackbar} className={classes.footerBtns}>
            Withdraw request
          </Button>
        </div>
      </Dialog>
      <CustomizedSnackbar
        open={snackbar}
        severity="success"
        message="Vetting request has been withdrawn"
        toggleSnackbar={SnackbarClose}/>
    </React.Fragment>
  );
}
