import React, { useState, useContext, Fragment} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logocontorno.png";
import Paper from "@material-ui/core/Paper";
import AlertContext from "../../../context/alert/AlertContext";
import AuthContext from "../../../context/autentication/authContext";
import Alert from "../../alerts/alerts";
import BackImg from "../../assets/fondo2.jpg"
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  leftImage: {
    height: "100vh",
    background: `url(${BackImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  flex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
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
  const { forgotPass, message  } = authContext;

  const { email } = userData;

  const onChange = (e) => {
    setUser({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    //when user try to login
    if (email.trim() === "") {
      showAlert("Todos los campos son obligatorios");
    }  
    if (message) {
      showAlert(message.msg);
    } 
    
      MySwal.fire({
        html: (
          <Fragment>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              Revisa tu correo para realizar el cambio.
            </Typography>
          </Fragment>
        ),
        icon: "info",
        confirmButtonColor: "##00897b",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push("/login");
        }
      });
    forgotPass({ email });
  };

  // if (!token) return null;
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item md={12} />
      <Grid item md={6}>
          <Grid item>
            <div  className={classes.leftImage}>
            </div>
          </Grid>
        </Grid>
      <Grid item xs={12} md={5} component={Paper} elevation={6} square className={classes.flex}>
        <Container component="main">
          <CssBaseline />
          <div className={classes.paper}>
            <Box mb={2}>
              <img className={classes.logo} src={`${logo}`} alt="logo" />
            </Box>

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
              {alert ? <Alert alert={alert.msg} /> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Resetear Contraseña
              </Button>
              <Grid container>
                <Grid item xs={9}>
                  <Link to="/login" variant="body2" className={classes.link}>
                    Volver a Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" className={classes.link}>
                    Crear Cuenta
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
