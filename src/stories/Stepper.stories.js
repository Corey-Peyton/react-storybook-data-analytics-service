import React from 'react';

import Stepper from '../Components/CommonComponents/Stepper';

export default {
  title: 'Molecules/Stepper',
  component: Stepper,
};

export const StepSelected = (args) => {
  return (
    <>
      <Stepper
        steps={['Step 1', 'Step 2', 'Step 3']}
        stepperErrors={[0, 0, 0]}
        completed={[false, false, false]}
        activeStep={0}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Contents of Step 1';
            case 1:
              return 'Contents of Step 2';
            case 2:
              return 'Contents of Step 3';
            default:
              break;
          }
        }}
      />
    </>
  );
};

export const StepErrorNotSelected = (args) => {
  return (
    <>
      <Stepper
        steps={['Step 1', 'Step 2', 'Step 3']}
        stepperErrors={[100, 0, 0]}
        completed={[false, false, false]}
        activeStep={1}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Contents of Step 1';
            case 1:
              return 'Contents of Step 2';
            case 2:
              return 'Contents of Step 3';
            default:
              break;
          }
        }}
      />
    </>
  );
};

export const StepErrorSelected = (args) => {
  return (
    <>
      <Stepper
        steps={['Step 1', 'Step 2', 'Step 3']}
        stepperErrors={[100, 0, 0]}
        completed={[false, false, false]}
        activeStep={0}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Contents of Step 1';
            case 1:
              return 'Contents of Step 2';
            case 2:
              return 'Contents of Step 3';
            default:
              break;
          }
        }}
      />
    </>
  );
};

export const StepCompleted = (args) => {
  return (
    <>
      <Stepper
        steps={['Step 1', 'Step 2', 'Step 3']}
        stepperErrors={[0, 0, 0]}
        completed={[true, false, false]}
        activeStep={1}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Contents of Step 1';
            case 1:
              return 'Contents of Step 2';
            case 2:
              return 'Contents of Step 3';
            default:
              break;
          }
        }}
      />
    </>
  );
};
