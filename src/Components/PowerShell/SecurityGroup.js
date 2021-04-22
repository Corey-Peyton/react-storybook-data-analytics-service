import React from 'react';
import DialogDeletePowershell from '../VettingApp/CommonComponents/DialogBox';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField, Grid, Typography, Divider} from '@material-ui/core';
import Icon from '@mdi/react';
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
  mdiCardPlus,
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
  },
  card: {
    marginTop: theme.spacing(2),
  },
  cardActions: {
    borderTop: '1px solid',
    borderTopColor: theme.palette.divider,
  },
  icon: {
    marginRight: theme.spacing(1.5),
  },
}));

function SecurityGroup(props) {
  const classes = useStyles();
  const security = [{label: 'VDL Project1'}, {label: 'VDL Project2'}];
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Grid item xs={8}>
        <Typography required variant="body2">
          Security group name
        </Typography>
        <Autocomplete
          id="combo-box-demo"
          options={security}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="VDL projects"
              className={classes.inputMargin}
              error
              variant="outlined"
              helperText="This field is required"
            />
          )}
        />
      </Grid>
      <Card className={classes.card} variant="outlined">
        <CardHeader title="Some email" subheader="some.email@email.com">
          avatar=
          {
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action=
          {
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        </CardHeader>
        <Divider />
        <CardContent>
          <Typography>Personal information</Typography>
          <Grid container alignItems="flex-start">
            <Grid item xs={2}>
              <Icon path={mdiDomain} size={1} className={classes.icon} />
            </Grid>
            <Grid item xs={5} direction="column">
              <Typography variant="subtitle2" component="h3">
                Security clearance expiry date
              </Typography>
            </Grid>
            <Grid item xs={5} direction="column">
              <Typography variant="subtitle2" component="h3">
               Test date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon
                path={mdiAccountOutline}
                size={1}
                className={classes.icon}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Researcher ID
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon path={mdiCardPlus} size={1} className={classes.icon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Organization
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon path={mdiEmailOutline} size={1} className={classes.icon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Security clearance expiry date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon path={mdiMonitor} size={1} className={classes.icon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Security clearance expiry date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon path={mdiTranslate} size={1} className={classes.icon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Security clearance expiry date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Icon
                path={mdiHammerScrewdriver}
                size={1}
                className={classes.icon}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle2" component="h3">
                Security clearance expiry date
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Icon path={mdiCardPlus} size={1} />
            <Icon path={mdiDomain} size={1} />
            <Icon path={mdiAccountOutline} size={1} />
            <Icon path={mdiPhone} size={1} />
            <Icon path={mdiEmailOutline} size={1} />
            <Icon path={mdiMonitor} size={1} />
            <Icon path={mdiTranslate} size={1} />
            <Icon path={mdiHammerScrewdriver} size={1} />
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
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
    </React.Fragment>
  );
}

export default SecurityGroup;
