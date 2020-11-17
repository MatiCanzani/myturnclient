import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Card, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logocontorno.png";
import Paper from "@material-ui/core/Paper";
import AlertContext from "../../../context/alert/AlertContext";
import AuthContext from "../../../context/autentication/authContext";
import Alert from "../../alerts/alerts";
import BackImg from "../../assets/ryan-de-hamer-WIPIAJW2-P8-unsplash.jpg";

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    background: `url(${BackImg})`,
    backgroundRepeat: "none",
    backgroundSize: "cover",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: "12rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#fac819",
    "&:hover": {
      backgroundColor: "#ffcc29",
    },
    // width:"60%",
  },
  link: {
    textDecoration: "none",
    color: "#373435",
    marginBottom: "40px",
  },
  copy: {
    textDecoration: "none",
    color: "#373435",
    marginTop: "70px",
  },

  input: {
    "& label.Mui-focused": {
      color: "#373435",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#373435",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#373435",
      },
      "&:hover fieldset": {
        borderColor: "#373435",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#373435",
      },
      " & .MuiOutlinedInput-input": {
        color: "#373435",
      },
      " & .MuiOutlinedInput-laber": {
        color: "#373435",
      },
    },
    " & .MuiFormLabel-root": {
      color: "#373435",
    },
    color: "#373435",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [userData, setUser] = useState({
    email: "",
    password: "",
  });
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, userLogin, user, token } = authContext;

  const [remember, setRemember] = useState(false);

  //get info from context
  const isLogged = localStorage.getItem("logedIn");

// useEffect(() => {
//   userAuthenticated()
//      //eslint-disable-next-line
// }, [])

const logedStatus = JSON.parse(isLogged);
  useEffect(() => {
  //   const logedStatus = JSON.parse(isLogged);
    console.log(logedStatus)
    setRemember(logedStatus);
    localStorage.setItem("logedIn", remember);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      if (user.isAdmin === true) {
        props.history.push("/admin");
        localStorage.setItem("userInfo", JSON.stringify(user));
      } else {
        props.history.push("/user");
      }
    }
    //eslint-disable-next-line
  });

  const { email, password } = userData;

  const onChange = (e) => {
    setUser({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setRemember(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //when user try to login
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios");
    }
    //if pass < than 8
    if (password.length < 8) {
      showAlert("La contraseña debe contener al menos 8 caracteres");
    }
    if (message) {
      showAlert(message.msg);
    }
    userLogin({ email, password });
    localStorage.setItem("logedIn", remember);
  };

   if(token) return null; 
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item md={7} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Box mb={2}>
              <img className={classes.logo} src={`${logo}`} alt="logo" />
            </Box>
            <Card
            elevation={3}
              style={{
                width: "60%",
                padding: "0.5rem",
                textAlign: "center",
                borderRadius: "0.4rem",
                // backgroundColor: "#eceff1",
              }}
            >
              <Typography component="h1" variant="h6">
                Iniciar Sesión
              </Typography>
            </Card>

            <form className={classes.form} onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                className={classes.input}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <FormControlLabel
                control={<Checkbox checked={remember} />}
                label={<Typography variant="body2">Recordarme</Typography>}
                className={classes.input}
                onChange={handleChange}
                type="input"
              />
              {alert ? <Alert alert={alert.msg} /> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs={9}>
                  <Link to="#" variant="body2" className={classes.link}>
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" className={classes.link}>
                    Crear cuenta
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={12}>
            <Copyright className={classes.copy} />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
  }
