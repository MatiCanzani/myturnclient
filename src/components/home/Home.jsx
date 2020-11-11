import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/07.png";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { Box, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LMV from "./L_M_V";
import MJ from "./M_J";
import S from "./S";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  logo: {
    width: "15rem",
  },
  paper: {
    margin: theme.spacing(2, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "1.5rem",
      marginTop: "1rem",
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link to="#" style={{ color: "#373435", textDecoration: "none" }}>
        CanzaniDevs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Home = (props) => {

  const redirects = () =>{

    const userData = JSON.parse( localStorage.getItem("userInfo"));
    const isLoged = localStorage.getItem("logedIn");
    console.log(isLoged);
    console.log(userData);

    if (isLoged === "true") {
      if (userData) {
        if (userData.isAdmin === true) {
          props.history.push("/admin");
        } else {
          props.history.push("/user");
        }
      }
    } else {
      props.history.push("/login");
    }
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container xs={12} md={8}>
        <Grid item xs={12} >
          <Typography className={classes.title}>Clases</Typography>
        </Grid>
        <Grid container xs={12} md={4}>
            <Grid item xs={12}  >
              <LMV />
            </Grid>
        </Grid>
        <Grid container xs={12} md={4}>
            <Grid item xs={12} >
              <MJ />
            </Grid>
        </Grid>
        <Grid container xs={12} md={4}>
            <Grid item xs={12} >
              <S />
            </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} md={4}>
        <Grid item xs={12} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <div>
              <img src={`${logo}`} className={classes.logo} alt="logo" />
            </div>
            <Button
              onClick={redirects} 
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reservar
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
