import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoubleDialog({open, onClick, handleClose, dialogueMessage}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description"
          sx={{
            fontFamily:'Graphik',
            color:'#000'

          }}>
          {dialogueMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick} autoFocus sx={{
            color:'black',
            fontFamily:'Graphik',
          }}>
            Yes
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose} autoFocus sx={{
            color:'black',
            fontFamily:'Graphik',
          }}>
        Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}