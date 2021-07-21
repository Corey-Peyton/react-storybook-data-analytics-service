import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core';
import Icon from '@mdi/react';
import {mdiChevronDown} from '@mdi/js';

export default {
  title: 'Molecules/Accordion',
  component: Accordion,
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    maxWidth: '500px',
    width: '100%',
  },
}));

export const SingleAccordion = (args) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
            aria-controls="aaw-tools-content"
            id="aaw-tools-header"
          >
            <Typography component="h4" variant="subtitle1">
              Single Accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
SingleAccordion.storyName = 'Accordion - Only Child';

export const AccordionContent = (args) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Typography className="mb-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        <Accordion className="border-top">
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
            aria-controls="aaw-tools-content"
            id="aaw-tools-header"
          >
            <Typography component="h4" variant="subtitle1">
              Single Accordion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Typography className="mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </>
  );
};
AccordionContent.storyName = 'Accordion - Between Content';

export const AccordionGroup = (args) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
            aria-controls="aaw-tools-content"
            id="aaw-tools-header"
          >
            <Typography component="h4" variant="subtitle1">
              Accordion Group 1
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
            aria-controls="aaw-tools-content"
            id="aaw-tools-header"
          >
            <Typography component="h4" variant="subtitle1">
              Accordion Group 2
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
            aria-controls="aaw-tools-content"
            id="aaw-tools-header"
          >
            <Typography component="h4" variant="subtitle1">
              Accordion Group 3
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
AccordionGroup.storyName = 'Accordion - Group';
