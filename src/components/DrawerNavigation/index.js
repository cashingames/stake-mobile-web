import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import './DrawerNavigation.scss'
import DrawerHeader from './DrawerHeader/DrawerHeader';
import DrawerItems from './DrawerItems/DrawerItems';

const drawerWidth = 300

export default function DrawerNavigation({ open, closeDrawer }) {

  return (
    <div>
      <Drawer 
         sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='temporary'
        anchor='left'
        onClose={() => {
          closeDrawer()
        }}
        open={open}
        >
          <div className='drawerContainer'>
            <DrawerHeader />
            <DrawerItems />
            </div>
      </Drawer>
    </div>
  );
}