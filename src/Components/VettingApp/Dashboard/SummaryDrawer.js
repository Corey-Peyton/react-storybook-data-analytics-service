import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
  ClickAwayListener,
} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  drawerContent: {
    width: 250,
  },
});

export default function SummaryDrawer(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({...state, [anchor]: open});
  };

  const content = () => (
    <div className={classes.drawerContent}>
      <Button onClick={props.clickHandler}>Close</Button>
      <div className={classes.drawerHeader}>
        <Typography component="h2" variant="h6">Project title example one</Typography>
        <div className={classes.closeBtn}>
        </div>
      </div>
      <div className={classes.drawerSection}>
        <Typography component="h3" variant="subtitle2" className="pb-3">{t('Details')}</Typography>
        <Typography variant="body2" className="pb-2">{t('ID')} 1219-000001</Typography>
        <Typography variant="body2" className="pb-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis vulputate mi. Praesent posuere eu elit in dictum. Maecenas
          sagittis commodo massa, id tincidunt elit viverra nec. Vivamus vel
          enim eros. Morbi commodo velit mauris, ac malesuada ante congue ut.
        </Typography>
      </div>
      <div className={classes.clearfix}></div>
      <div className={classes.drawerSectionIndex}>
        <List className="pt-0 pb-2">
          <ListItem button
            onClick={props.toggleAppsDrawer}
            id="apps-btn"
            aria-label={t('Go to Apps')}
          >
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">{t('Apps')}</Typography>}
            />
          </ListItem>
          <ListItem button
            onClick={props.toggleDatasetsDrawer}
            id="datasets-btn"
            aria-label={t('Go to Datasets')}
          >
            <ListItemText
              disableTypography
              primary={<Typography variant="body2">{t('Datasets')}</Typography>} />
          </ListItem>
        </List>
      </div>
      <Divider />
      <div className="pt-3 pb-2 pl-2">
        <Typography component="h3" variant="subtitle2">{t('Team')}</Typography>
      </div>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>Right</Button>
      <Drawer
        anchor='right'
        open={props.open}
        onClose={toggleDrawer('right', false)}
        onEscapeKeyDown={props.clickHandler}
        onBackdropClick={props.clickHandler}
        variant='temporary'
      >
        {content()}
      </Drawer>
    </div>
  );
}
