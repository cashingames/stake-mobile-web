import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import './BottomSheet.scss'
// const drawerWidth = 300

export default function BottomSheet({ open, onClose, BSContent }) {

  const [state, setState] = React.useState({
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <Drawer
        variant='temporary'
        anchor='bottom'
        onClose={toggleDrawer('bottom', false)}
        open={open}
      >
        <div className='bottomSheetContainer'>
          {BSContent}
        </div>
      </Drawer>
    </div>
  );
}