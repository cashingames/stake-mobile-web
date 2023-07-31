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

export default function AlertDialog({open, setOpen, handleClose, dialogueMessage}) {
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
            color: '#1C453B',
            fontFamily: 'gotham-medium',
            fontSize: '1rem',
         

          }}>
          {dialogueMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus sx={{
            color:'#fff',
            fontFamily:'gotham-medium',
            backgroundColor:'#E15220',
            textTransform:'capitalize'
          }}>
            OK, got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}