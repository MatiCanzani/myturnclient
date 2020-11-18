import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AuthContext from "../../context/autentication/authContext";
import Burguer from "./Menu";
import { Link } from "react-router-dom";
import logo from "../assets/logoblanco.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "50px",
    textTransform: "capitalize",
    width: "1",
    "& .MuiPaper-paper": {
      backgroundColor: "#373435 !important",
    },
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#373435",
  },
  link: {
    textDecoration: "none",
    color: "#ffffff",
  },
  logo: {
    width:"100px",
    marginRight: "1rem"
  },
  flex: {
    display: "flex",
  }
}));

const UpBar = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { user, userAuthenticated, closeSession } = authContext;

  useEffect(() => {
    userAuthenticated();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <div >
            <img  src={`${logo}`} alt="logo" className={classes.logo}/>
          </div>
          <Typography variant="subtitle1" className={classes.title}>
            {!user ? null : `Hola ${user.firstName}`}
          </Typography>
    
          {!user 
          ? null 
          :( user.isAdmin === true ? 
            (
          <div className={classes.flex}>
            <Burguer />
            <Link to={"/"} className={classes.link}>
              <Button onClick={() => closeSession()} color="inherit">
                <Typography style={{ fontSize: "0.7rem" }}>
                  Salir
                </Typography>
              </Button>
            </Link>
          </div>
        ) : (
          <Link to={"/"} className={classes.link}>
              <Button onClick={() => closeSession()} color="inherit">
                <Typography style={{ fontSize: "0.7rem" }}>
                  Salir
                </Typography>
              </Button>
            </Link>
        ))} 
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default UpBar;
