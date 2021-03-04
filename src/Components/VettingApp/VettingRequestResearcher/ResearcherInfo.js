import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import NumberFormat from 'react-number-format';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputMargin: {
    margin: theme.spacing(1, 0),
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
  tooltipLabel: {
    'display': 'flex',
    'alignItems': 'center',
    '& svg': {
      paddingLeft: theme.spacing(1),
    },
  },
  pt0: {
    paddingTop: [0, '!important'],
  },
}));

function ResearcherInfo(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Typography>
        Vetting of statistical output is required by Statistics Canada to ensure
        data protection. Statistics Canada Analysts will review all external
        users' vetting requests. These requests are subject to a risk-based
        assessment of potential disclosure based on established rules and
        procedures.
      </Typography>
      <Divider className={classes.divider} />
      <Typography component="h2" variant="h6" className="mt-1 mb-1">
        Requester details
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="Firstname"
            name="Firstname"
            variant="outlined"
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            label="First name"
            required
            inputProps={{readOnly: true}}
            value="Steve"
          />
          <TextField
            id="Lastname"
            name="Lastname"
            label="Last name"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            inputProps={{readOnly: true}}
            value="Rogers"
          />
          <TextField
            id="Username"
            name="Username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            inputProps={{readOnly: true}}
            value="steve.rogers@cloud.statcan.ca"
          />
          <TextField
            id="Role"
            name="Role"
            label="Role"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            value="?"
            inputProps={{readOnly: true}}
          />
          <TextField
            id="Email"
            name="Email"
            label="Email"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            defaultValue={props.title}
            className={classes.inputMargin}
            value="steve.rogers@canada.ca"
            inputProps={{readOnly: true}}
          />
          <FormControl variant="outlined" fullWidth>
            <NumberFormat
              id="phone-input"
              label={t('Phone number')}
              aria-label={t('Phone number')}
              value="+1 (999) 999 9999"
              customInput={TextField}
              type="text"
              fullWidth
              className="mt-1"
              variant="outlined"
              format="+1 (###) ### ####"
              mask="_"
              allowEmptyFormatting
              autoComplete="phone"
              inputProps={{readOnly: true}}
              required
            />
          </FormControl>
          <Typography component="h2" variant="h6" className="mt-1 mb-1">
            Request details
          </Typography>
          <TextField
            id="project"
            name="project"
            label="Project"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
            value="20-SSH-UTO-1111"
          />
          <TextField
            id="RequestID"
            name="RequestID"
            label="Request ID"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            className={classes.inputMargin}
            inputProps={{readOnly: true}}
            value="0101-000000"
          />
          <TextField
            id="Requestname"
            name="Requestname"
            label="Request name"
            variant="outlined"
            value={props.title}
            fullWidth
            onChange={props.handleTitleChange}
            onBlur={props.handleFieldOnBlur}
            margin="dense"
            className={classes.inputMargin}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.pt0}>
          <TextField
            id="Createdon"
            name="Createdon"
            label="Created on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            className={classes.inputMargin}
            value="Jan 1, 2021"
          />
          <TextField
            id="Updatedon"
            name="Updatedon"
            label="Updated on"
            variant="outlined"
            required
            fullWidth
            margin="dense"
            inputProps={{readOnly: true}}
            value="Dec 31, 2021"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default ResearcherInfo;
