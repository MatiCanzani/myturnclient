import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Hidden,
  withWidth,
  Paper,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Box, Card } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AuthContext from "../../context/autentication/authContext";
import turnContext from "../../context/turn/turnContext";
import UserCard from "./userCard/UserCard";
import UserCardSat from "./userCard/UserCardSat";
import Divider from "@material-ui/core/Divider";
import Emoji from "a11y-react-emoji";
import logo from "../assets/logofull.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundRepeat: "none",
    backgroundSize: "cover",
  },
  logo: {
    width: "75%",
    margin: "1rem",
    maxWidth: "400px",
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
    width: "60%",
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  titleCntnMedium: {
    width: "350px",
    // boxShadow: "0.1rem 0.1rem 0.3rem 0.1rem rgba(0,0,0,0.35)",
    borderRadius: "0.4rem",
    backgroundColor: "#eceff1",
    margin: "1rem",
  },
  titleCntnSmall: {
    width: "350px",
    boxShadow: "0.1rem 0.1rem 0.3rem 0.1rem rgba(0,0,0,0.35)",
    borderRadius: "0.4rem",
    backgroundColor: "#eceff1",
    margin: "1rem",
  },
  title: {
    fontSize: "1.2rem",
    textAlign: "center",
    margin: "0.5rem",
  },

  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  important: {
    textAlign: "center",
  },
  button: {
    margin: "1rem",
  },
  card: {
    margin: "1.5rem",
    borderRadius: "0.4rem",
  },
}));

const Turns = () => {
  //get authentication

  const authContext = useContext(AuthContext);
  const { user, userAuthenticated } = authContext;

  const classTurnContext = useContext(turnContext);
  const { userTurn, getUserTurnsById } = classTurnContext;


  useEffect(() => {
    userAuthenticated();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserTurnsById(user._id);
    // eslint-disable-next-line
  }, []);

  const userClasses = () => {
    if (!userTurn) {
      return null;
    } else if (userTurn.userDay === "Lunes / Miércoles / Viernes") {
      return <UserCard userDay={userTurn.userDay} hours={userTurn.userHours} />;
    } else {
      return (
        <UserCardSat
          userDay={userTurn.userDay}
          hours={userTurn.userHours}
          userSatDay={userTurn.userSatDay}
          satHours={userTurn.userSatHours}
        />
      );
    }
  };
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container xs={12}>
        <Grid item md={3} />
        <Grid item xs={12} md={6}>
          <Grid item xs={12} className={classes.flex}>
            <img className={classes.logo} src={`${logo}`} alt="logo" />
          </Grid>
          <Grid item xs={12} className={classes.flex}>
            <Hidden xsDown>
              <Card className={classes.titleCntnMedium} elevation={3}>
                <Typography className={classes.title}>
                  Tu reserva fue CONFIRMADA ! <Emoji symbol="💪" label="force" />
                </Typography>
              </Card>
            </Hidden>
            <Hidden smUp>
              <Card className={classes.titleCntnSmall}>
                <Typography className={classes.title}>
                  Tu reserva fue CONFIRMADA! <Emoji symbol="💪" label="force" />
                </Typography>
              </Card>
            </Hidden>
          </Grid>
          <Grid
            item
            xs={12}
            component={Card}
            elevation={6}
            className={classes.card}
          >
            <Box className={classes.cntr}>{!user ? null : userClasses()}</Box>
            <Paper className={classes.important}>
              <Divider style={{ margin: "1rem" }} />
              <Typography variant="h6" color={"secondary"}>
                Importante!{" "}
              </Typography>
              <Divider style={{ margin: "1rem" }} />
              <Box style={{ margin: "1rem 2rem" }}>
                <Typography variant="body2">
                  Recordá completar y llevar impresa al box la DECLARACIÓN
                  JURADA en la cual conste que no presentas síntomas de COVID
                  19. La misma se deberá renovar cada 14 dias.
                </Typography>
              </Box>

              <Card>
                <a
                  href={process.env.PUBLIC_URL + "/PROTOCOLO_DDJJ.pdf"}
                  download
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                  >
                    Descargar DDJJ
                  </Button>
                </a>
              </Card>
            </Paper>
          </Grid>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </Grid>
  );
};

export default withWidth()(Turns);
