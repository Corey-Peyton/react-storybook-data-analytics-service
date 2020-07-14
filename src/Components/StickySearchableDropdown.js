import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  InputAdornment,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  details: {
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filter: {
    'width': '100%',
    'margin': '0',
    '& fieldset': {
      margin: theme.spacing(0, 3),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: theme.spacing(4),
    },
  },
  listFieldset: {
    width: '100%',
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  list: {
    height: '15em',
    overflowY: 'auto',
    width: '100%',
  },
  listIcon: {
    minWidth: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(0, 2, 0, 2),
  },
  noMatches: {
    marginLeft: theme.spacing(3),
  },
}));

export default function StickySearchableDropdown(props) {
  const classes = useStyles();
  const {t} = useTranslation();

  const [state, setState] = React.useState({
    checked: [0],
    list: props.list,
  });

  const handleToggle = (value) => () => {
    const currentIndex = state.checked.indexOf(value);
    const newChecked = [...state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setState({...state, checked: newChecked});
  };

  const filterList = (event) => {
    const filteredList = props.list.filter(function(item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setState({...state, list: filteredList});
  };

  return (
    <ExpansionPanel
      defaultExpanded={props.defaultExpanded}
      className={classes.root}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.summary,
          content: classes.summaryContent,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="subtitle2">{props.summary}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {props.filterable && (
          <TextField
            className={classes.filter}
            id={`${props.id}-filter`}
            variant="outlined"
            margin="dense"
            onChange={filterList}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
              inputProps: {
                'aria-label': `${t('filter')} ${props.summary}`,
                'placeholder': props.placeholder,
              },
            }}
          />
        )}
        <FormControl component="fieldset" className={classes.listFieldset}>
          <FormLabel
            component="legend"
            className={props.legendHidden && 'screen-reader-text'}
          >
            {props.summary}
          </FormLabel>
          <List className={classes.list}>
            {state.list.length === 0 && <Typography className={classes.noMatches}>No matches.</Typography>}
            {state.list.map((listItem, index) => {
              const labelId = `${props.id}-label-${index}`;
              return (
                <ListItem
                  className={classes.listItem}
                  component="li"
                  key={`${props.id}-li-${index}`}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(listItem)}
                >
                  <ListItemIcon
                    className={classes.listIcon}
                    key={`${props.id}-li-icon-${index}`}
                  >
                    <Checkbox
                      className={classes.iconButton}
                      color="primary"
                      key={`${props.id}-chbx-${index}`}
                      edge="start"
                      checked={state.checked.indexOf(listItem) !== -1}
                      tabIndex={-1}
                      inputProps={{'aria-labelledby': labelId}}
                    />
                  </ListItemIcon>
                  <ListItemText
                    key={`${props.summary}-li-text-${index}`}
                    id={labelId}
                    primary={listItem}
                  />
                </ListItem>
              );
            })}
          </List>
        </FormControl>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
