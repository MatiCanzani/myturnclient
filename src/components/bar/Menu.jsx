
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Box, ThemeProvider } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import theme from '../../themeConfig';

const useStyles = makeStyles({
    menuButton: {
        display: 'inline-block',
    }
});
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <ThemeProvider theme={theme}>
    <Box className={classes.menuButton}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
      <FiMenu size={16} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <StyledMenuItem>
        <Link to="/admin" color="warning" style={{ textDecoration: 'none', color:'#373435' }}>
          <ListItemText  primary="Inicio" />
          </Link>
        </StyledMenuItem>
      
        <StyledMenuItem>
        <Link to="/admin/turns" style={{ textDecoration: 'none', color:'#373435' }}>
          <ListItemText primary="Clases" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
        <Link to="/admin/users" style={{ textDecoration: 'none', color:'#373435' }}>
          <ListItemText primary="Usuarios" />
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </Box>
    </ThemeProvider>
  );
}

