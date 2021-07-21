import React from 'react';

import Stepper from '../Components/CommonComponents/Stepper';

export default {
  title: 'Molecules/Stepper',
  component: Stepper,
};

export const StepperEditable = (args) => {
  return (
    <>
      <Stepper
        steps={[
          'Step 1 example title',
          'Step 2 example title',
          'Step 3 example title',
        ]}
        stepperErrors={[0, 0, 0]}
        completed={[false, false, false]}
        activeStep={0}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Step 1 example title';
            case 1:
              return 'Step 2 example title';
            case 2:
              return 'Step 3 example title';
            default:
              break;
          }
        }}
      />
    </>
  );
};
StepperEditable.storyName = 'Editable';

export const StepperReadonly = (args) => {
  return (
    <>
      <Stepper
        steps={[
          'Step 1 example title',
          'Step 2 example title',
          'Step 3 example title',
        ]}
        stepperErrors={[0, 0, 0]}
        completed={[false, false, false]}
        activeStep={0}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Step 1 example title';
            case 1:
              return 'Step 2 example title';
            case 2:
              return 'Step 3 example title';
            default:
              break;
          }
        }}
        readonly={true}
      />
    </>
  );
};
StepperReadonly.storyName = 'Readonly';

export const StepperErrors = (args) => {
  return (
    <>
      <Stepper
        steps={[
          'Step 1 example title',
          'Step 2 example title',
          'Step 3 example title',
        ]}
        stepperErrors={[100, 100, 100]}
        completed={[false, false, false]}
        activeStep={0}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Step 1 example title';
            case 1:
              return 'Step 2 example title';
            case 2:
              return 'Step 3 example title';
            default:
              break;
          }
        }}
      />
    </>
  );
};
StepperErrors.storyName = 'Errors';

export const StepCompleted = (args) => {
  return (
    <>
      <Stepper
        steps={[
          'Step 1 example title',
          'Step 2 example title',
          'Step 3 example title',
        ]}
        stepperErrors={[0, 0, 0]}
        completed={[true, true, true]}
        activeStep={2}
        stepContent={(step) => {
          switch (step) {
            case 0:
              return 'Step 1 example title';
            case 1:
              return 'Step 2 example title';
            case 2:
              return 'Step 3 example title';
            default:
              break;
          }
        }}
      />
    </>
  );
};
StepCompleted.storyName = 'Completed';
