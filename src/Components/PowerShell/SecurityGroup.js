import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
// import DialogDeletePowershell from '../VettingApp/CommonComponents/DialogBox';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import {
  TextField,
  Grid,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {useTranslation} from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {red} from '@material-ui/core/colors';
import {
  mdiDomain,
  mdiAccountOutline,
  mdiPhone,
  mdiEmailOutline,
  mdiMonitor,
  mdiTranslate,
  mdiHammerScrewdriver,
} from '@mdi/js';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  inputMargin: {
    margin: theme.spacing(1, 0),
  },
  avatar: {
    backgroundColor: red[500],
    color: theme.palette.grey[100],
  },
  card: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  icon: {
    paddingLeft: theme.spacing(1),
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
  widthAuto: {
    width: 'auto !important',
  },
  vettingText: {
    paddingLeft: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

function SecurityGroup(props) {
  const [open, setOpen] = React.useState({
    dialogAddResearcher: false,
    snackbarAddResearcher: false,
  });

  const addvirtualmachine = () => {
    setOpen({
      ...open,
      dialogAddVirtualMachine: false,
      snackbarVirtualMachine: true,
    });
  };

  const handleClickClose = (state) => {
    setOpen({...open, [state]: false});
  };
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Grid item xs={8}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Environment</FormLabel>
          <RadioGroup
            aria-label="environment"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="VDL"
            />
            <FormControlLabel value="Prerelease" control={<Radio />} label="Prerelease" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
          title="Some email"
          subheader="email@email.com"
        />
        <Divider className={classes.divider} />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1">Personal information</Typography>

            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Security clearance expiry date
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  02/23/2021
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Researcher ID
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  54674
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiDomain} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Organization
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  Statistics Canada
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiAccountOutline} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Username
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  some.email
                </Typography>
              </div>
            </div>
            <Typography variant="body1">Contact information</Typography>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiPhone} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Phone number
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  555-867-5309
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiEmailOutline} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Email
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  email@email.com
                </Typography>
              </div>
            </div>
            <Typography variant="body1">vDL information</Typography>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiMonitor} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Virtual machine name
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  STC-0412-ST
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiTranslate} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Virtual machine language
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  English
                </Typography>
              </div>
            </div>
            <div className={classes.vettingRow}>
              <div className={clsx(classes.vettingColumn, classes.widthAuto)}>
                <Icon path={mdiHammerScrewdriver} size={1} />
              </div>
              <div className={classes.vettingColumn}>
                <Typography className={classes.vettingText} variant="body2">
                  Required tools
                </Typography>
                <Typography className={classes.vettingText} variant="body2">
                  02/23/2021
                </Typography>
              </div>
            </div>
          </CardContent>
          <Divider className={classes.divider} />
        </Collapse>
        <CardActions>
          <Button color="primary" variant="contained">
            Edit
          </Button>
          <Button color="primary" variant="contained">
            Delete
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={open.dialogAddSupporting}
        aria-labelledby="form-dialog-title"
        fullWidth
        className={classes.root}
        scroll="paper"
      >
        <DialogTitle
          id="form-dialog-title"
          className={classes.vettingContainerTitle}
          disableTypography
        >
          <Typography variant="h6" component="h2">
            Add supporting file
          </Typography>
          <IconButton
            onClick={() => handleClickClose('dialogAddSupporting')}
            edge="end"
            aria-label="Close add supporting file"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogActions className={classes.dialogFooter}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => handleClickClose('dialogdeletevirtualmachine')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={addvirtualmachine}
            className={classes.footerBtns}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SecurityGroup;
