import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import "./menu.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      justifyContent: "center",
      textAlign: "center",
    },
    "& .MuiPaper-root": {
      backgroungColor: "#d2961e",
    },
  },
  btn: {
    color: "#ffff",
  },
}));

const MenuButtons = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.sticky}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="down"
      >
        <Link to="/admin">
          <MenuItem onClick={handleClose}>INICIO</MenuItem>
        </Link>
        <Link to="/admin/turns">
          <MenuItem onClick={handleClose}>TURNOS</MenuItem>
        </Link>
        <Link to="/admin/userus">
          <MenuItem onClick={handleClose}>USUARIOS</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default MenuButtons;
