import React, { useState, useContext, useEffect,Fragment  } from "react";
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
import AlertContext from "../../../context/alert/AlertContext";
import AuthContext from "../../../context/autentication/authContext";
import Alert from "../../alerts/alerts";
import BackImg from "../../assets/ryan-de-hamer-WIPIAJW2-P8-unsplash.jpg";
import Paper from "@material-ui/core/Paper";
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#fac819",
    "&:hover": {
      backgroundColor: "#ffcc29",
    },
  },
  link: {
    textDecoration: "none",
    color: "#373435",
    marginBottom: "40px",
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

export default function ResetPassword(props) {
  const classes = useStyles();

  //get info from context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, resetPass } = authContext;

  useEffect(() => {
    if (message) {
      showAlert(message.msg);
    }
  }, [message, showAlert]);

  const [user, setUser] = useState({
    id: props.match.params.id,
    password: "",
    confirmPass: "",
  });

  //get user info
  const { id, password, confirmPass } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  //when user try to logIn
  const onSubmit = (e) => {
    e.preventDefault();
    // min password 8 characters
    if (password.length < 8) {
      showAlert("La contraseña debe contener al menos 8 caracteres");
      return;
    }
    //passwords show be iqual
    if (password !== confirmPass) {
      showAlert("Las contraseñas deben ser iguales");
      return;
    }
    if (message) {
      showAlert(message.msg);
    } else {
      MySwal.fire({
        html: (
          <Fragment>
            <Typography variant="h6" style={{ marginBottom: "1rem" }}>
              Tu contraseña fue modificada con éxito!
            </Typography>
          </Fragment>
        ),
        icon: "success",
        confirmButtonColor: "##00897b",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push("/login");
        }
      });
    }

    //pass to action
    resetPass({
      id,
      password,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item container xs={12}>
        <Grid item xs={0} md={6} />
        <Grid item xs={12} md={6} component={Paper} elevation={6} square>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Box mb={2}>
                <img className={classes.logo} src={`${logo}`} alt="logo" />
              </Box>
              <Typography component="h1" variant="h5">
                Crea tu nueva contraseña
              </Typography>
              <form className={classes.form} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={onChange}
                      className={classes.input}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPass"
                      label="Confirmar Contraseña"
                      type="password"
                      id="confirm-pass"
                      autoComplete="current-password"
                      value={confirmPass}
                      onChange={onChange}
                      className={classes.input}
                    />
                  </Grid>
                </Grid>
                {alert ? <Alert alert={alert.msg} /> : null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                >
                  enviar
                </Button>
              </form>
            </div>
            <Box mt={5}>
              <Copyright className={classes.link} />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
}
