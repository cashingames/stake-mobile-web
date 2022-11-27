import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import './BottomSheet.scss'
// const drawerWidth = 300

export default function BottomSheet({ open, closeBottomSheet, BSContent }) {

  return (
    <div>
      <Drawer 
         sx={{
          width: '100%',
          height: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: "100%",
            height: 250,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        anchor='bottom'
        onClose={() => {
          closeBottomSheet()
        }}
        open={open}
        >
          <div className='bottomSheetContainer'>
            {BSContent}
            </div>
      </Drawer>
    </div>
  );
}