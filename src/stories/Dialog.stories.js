import React from 'react';

import {Button} from '../Components/CommonComponents/Button';
import {Dialog} from '../Components/CommonComponents/Dialog';
import {Typography, TextField} from '@material-ui/core';

export default {
  title: 'Molecules/Dialog',
  component: Dialog,
};

// export const InputDialog = (args) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={handleOpen}>
//         Input dialog
//       </Button>
//       <Dialog
//         id="input-dialog"
//         open={open}
//         title="Assign to me"
//         content={
//           <>
//             <Typography variant="subtitle2" className="mb-2">
//               Provide a phone number
//             </Typography>
//             <TextField
//               className="m-0 w-50"
//               id="phone-num"
//               label="Phone number"
//               required
//               variant="outlined"
//               margin="dense"
//             />
//           </>
//         }
//         primaryButton="Assign to me"
//         secondaryButton="Cancel"
//         handleSecondaryClick={handleClose}
//         handleClose={handleClose}
//       />
//     </>
//   );
// };

export const SingleActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogSingleAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
      >
        Single action dialog
      </Button>
      <Dialog
        id="single-action-dialog"
        open={open.dialogSingleAction}
        title="Single action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with one action.
            </Typography>
          </>
        }
        primaryButton="Close"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
        handleClose={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogSingleAction', !open.dialogSingleAction, e);
        }}
      />
    </>
  );
};

export const TwoActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogTwoAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
      >
        Two action dialog
      </Button>
      <Dialog
        id="two-action-dialog"
        open={open.dialogTwoAction}
        title="Two action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with two actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
        handleSecondaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
        handleClose={(e) => {
          e.stopPropagation();
          toggleDialog('dialogTwoAction', !open.dialogTwoAction, e);
        }}
      />
    </>
  );
};

export const ThreeActionDialog = (args) => {
  const [open, setOpen] = React.useState({
    dialogThreeAction: false,
  });

  const toggleDialog = (state, value, e) => {
    e.stopPropagation();
    setOpen({...open, [state]: value});
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
      >
        Three action dialog
      </Button>
      <Dialog
        id="three-action-dialog"
        open={open.dialogThreeAction}
        title="Three action dialog"
        content={
          <>
            <Typography variant="body2">
              This is an example of a dialog with three actions.
            </Typography>
          </>
        }
        primaryButton="Submit"
        secondaryButton="Cancel"
        thirdButton="Other action"
        handlePrimaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        handleSecondaryClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        handleThirdClick={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        toggleDialog={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
        handleClose={(e) => {
          e.stopPropagation();
          toggleDialog('dialogThreeAction', !open.dialogThreeAction, e);
        }}
      />
    </>
  );
};

// export function DialogNoLead(props) {
//   const classes = useStyles();
//   const {t} = useTranslation();
//   const {submitDialog, toggleDialog, open} = props;

//   const handleClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <React.Fragment>
//       <Dialog
//         onClose={toggleDialog}
//         aria-labelledby="dashboard-dialog-title"
//         open={open}
//         className={classes.root}
//         disableBackdropClick
//         scroll="paper"
//         onClick={handleClick}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') {
//             e.preventDefault();
//             e.stopPropagation();
//           }
//         }}
//       >
//         <DialogTitle id="dashboard-dialog-title">
//           <div className={classes.vettingContainerTitle}>
//             <Typography variant="h6">{t('Continue with no lead?')}</Typography>
//             <IconButton
//               id="dialog-close"
//               onClick={toggleDialog}
//               edge="end"
//               aria-label="No lead assigned - close"
//               onKeyPress={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 if (e.key === 'Enter') {
//                   toggleDialog(e);
//                 }
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </div>
//         </DialogTitle>
//         <Divider />
//         <DialogContent>
//           <div className={classes.vettingSection}>
//             <div className={classes.vettingRow}>
//               <div className={classes.vettingColumn}>
//                 <Alert severity="warning" className={classes.alert}>
//                   {t(
//                       'If you continue, the request will have no lead and the requester will be notified of the change.',
//                   )}
//                 </Alert>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//         <Divider />
//         <DialogActions>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={toggleDialog}
//             className={classes.footerBtns}
//             onKeyPress={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               if (e.key === 'Enter') {
//                 toggleDialog(e);
//               }
//             }}
//           >
//             {t('Cancel')}
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={submitDialog}
//             className={classes.footerBtns}
//             onKeyPress={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               if (e.key === 'Enter') {
//                 submitDialog(e);
//               }
//             }}
//           >
//             {t('Continue')}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }
