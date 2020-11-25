import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/07.png";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import BackImg from "../assets/ryan-de-hamer-WIPIAJW2-P8-unsplash.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: `url(${BackImg})`,
    backgroundRepeat: "none",
    backgroundSize: "cover"
  },
  logo: {
    width: "12rem",
  },
  paper: {
    margin: theme.spacing(2, 1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width:"60%"
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
    const isLoged = localStorage.getItem("token");
    console.log(isLoged); 
    console.log(userData);

    if (isLoged) {
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
      <Grid container >
      <Grid item  md={7} />
        <Grid item xs={12} md={5} component={Paper} elevation={3} square>
          <Box className={classes.box}  mt={15}>
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
              Entrar
            </Button>
            <Box mt={20}>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
