// import React, { useState } from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import { Button, Box, ThemeProvider } from '@material-ui/core';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { Link } from "react-router-dom";
// import { FiMenu } from 'react-icons/fi';
// import theme from '../../themeConfig';

// const useStyles = makeStyles({
//     menuButton: {
//         display: 'inline-block',
//     }
// });
// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));

// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:hover': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);

// export default function CustomizedMenus() {
//     const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//       <ThemeProvider theme={theme}>
//     <Box className={classes.menuButton}>
//       <Button
//         aria-controls="customized-menu"
//         aria-haspopup="true"
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//       >
//       <FiMenu size={16} />
//       </Button>
//       <StyledMenu
//         id="customized-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >

//         <StyledMenuItem>
//         <Link to="/admin" color="warning" style={{ textDecoration: 'none', color:'#373435' }}>
//           <ListItemText  primary="Inicio" />
//           </Link>
//         </StyledMenuItem>

//         <StyledMenuItem>
//         <Link to="/admin/turns" style={{ textDecoration: 'none', color:'#373435' }}>
//           <ListItemText primary="Clases" />
//           </Link>
//         </StyledMenuItem>
//         <StyledMenuItem>
//         <Link to="/admin/users" style={{ textDecoration: 'none', color:'#373435' }}>
//           <ListItemText primary="Usuarios" />
//           </Link>
//         </StyledMenuItem>
//       </StyledMenu>
//     </Box>
//     </ThemeProvider>
//   );
// }

import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FiMenu size={16} style={{color:"#ffffff"}}/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link
                      to="/admin"
                      color="warning"
                      style={{ textDecoration: "none", color: "#373435" }}
                    >
                      <MenuItem onClick={handleClose}>Inicio</MenuItem>
                    </Link>
                    <Link
                      to="/admin/turns"
                      color="warning"
                      style={{ textDecoration: "none", color: "#373435" }}
                    >
                      <MenuItem onClick={handleClose}>Clases</MenuItem>
                    </Link>
                    <Link
                      to="/admin/users"
                      color="warning"
                      style={{ textDecoration: "none", color: "#373435" }}
                    >
                      <MenuItem onClick={handleClose}>Usuarios</MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
