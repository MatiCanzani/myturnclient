import React, { useState, useContext, useEffect, Fragment } from "react";
import { Button, Box, Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AlertContext from "../../../context/alert/AlertContext";
import Alert from "../../alerts/alerts";
import turnContext from "../../../context/turn/turnContext";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import MWF from "../../home/L_M_V";
import TT from "../../home/M_J";
import SAT from "../../home/S";
import Spinner from "../../spinner/Spinner"



const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    color: "#373435",
    textAlign: "center",
  },
  button: {
    margin: "1rem 0px",
    color: "#ffffff",
  },
  paper: {
    borderRadius: "1.5rem",
    width: "100%",
  },
  title: {
    color: "#373435",
    textAlign: "center",
    background: " #eceff1",
    borderRadius: "0.5rem",
  },
  subTitle: {
    color: "#373435",
    textAlign: "center",
    padding: "0.8rem",
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // Fix IE 11 issue.
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  available: {
    color: "#373435",
    margin: " 1rem ",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "16px 8px",
  },
  block: {
    backgroundColor: "red",
    height: "100%",
    wide: "100%",
    zIndex: 9999,
    position: "relative",
  },
}));

const MySwal = withReactContent(Swal);
const TurnSelector = () => {
  const history = useHistory();
  const classes = useStyles();
  const [userSelection, setUserSelection] = useState(0);
  const [userSatSelection, setUserSatSelection] = useState(0);


  const [days, savedDays] = useState(0);
  // const [hours, savedHours] = useState(0);
  const [satDays, savedSatDays] = useState(0);

  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  // Get initial state from userTurns
  const classTurnContext = useContext(turnContext);
  const { createUserTurns, hours, satHours, thusHours, getHours, getHoursThus, getHoursSat } = classTurnContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    console.log(satDays);
    if (days.days === "") {
      setDisabled(false);
      setDisabled2(false);
    }

    if (days.days === "Lunes / Miércoles / Viernes") {
      setUserSelection({
        userDay: days.days,
        userHours: days.hour,
        userSatHours: 0,
      });
      setDisabled2(true);
    }
    if (days.days === "Martes / Jueves") {
      setUserSelection({
        userDay: days.days,
        userHours: days.hour,
        userSatHours: 0,
      });
      setDisabled(true);
    }
    if (satDays.days === "Sábado") {
      setUserSatSelection({
        userDay: satDays.days,
        userHours: 0,
        userSatHours: satDays.hour,
      });
      setDisabled(true);
    }
  }, [days, satDays]);

  //
  useEffect(() => {
    getHoursThus();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getHours();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getHoursSat();
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (days.days === 0) {
      showAlert("Debes seleccionar un día");
    } else if (days.hour === 0) {
      showAlert("Debes seleccionar un horario");
    }

    if (days.days === "Martes / Jueves " && days.days === 0) {
      showAlert("Debes seleccionar un día");
    } else if (
      days.days === "Martes / Jueves" &&
      days.hour !== 0 &&
      days.satDays === 0
    ) {
      showAlert("Debes seleccionar un horario para los sabados");
    }

    // setLoading(true);
    setUserSelection({
      userDay: days.days,
      userHours: days.hour,
      userSatDays: 0,
    });

    setUserSatSelection({
      userDay: satDays.days,
      userHours: 0,
      userSatHours: satDays.hour,
    });
    // getUserTurns(userSelection);

    //setShowResults(true);
    //setTimeout(() => {
    //setShowResults(true);
    //setLoading(false);
    //}, 600);
  };

  const reserve = () => {

    if (days.days !== "Lunes / Miércoles / Viernes") {
      MySwal.fire({
       
        html: (
          <Fragment>
             <Typography variant="h5" style={{marginBottom: "1rem"}}>
             Tu selección es: 
            </Typography>
            <Typography variant="body1">
              {days.days} :{days.hour} hs,
            </Typography>
            {""}
            <Typography variant="body1">
              {satDays.days} : {satDays.hour} hs
              </Typography>
          </Fragment>
        ),
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#f44336",
        confirmButtonColor: "#3f51b5",
        confirmButtonText: "Sí, Reservar!",
      }).then((result) => {
        if (result.isConfirmed) {
          createUserTurns(userSelection);
          createUserTurns(userSatSelection);
          MySwal.fire({
            html: (
              <Fragment>
                 <Typography variant="h5" style={{marginBottom: "1rem"}}>
                 "Reserva realizada con éxito!
                </Typography>
              </Fragment>
            ),
            icon: "success",
            confirmButtonColor: "#3f51b5",
          }).then(function (result) {
            if (result.value) {
              history.push("/confirm");
            }
          });
        }
      });
    } else {
      MySwal.fire({   
        html: (
          <Fragment>
             <Typography variant="h5" style={{marginBottom: "1rem"}}>
             Tu selección es: 
            </Typography>
            <Typography variant="body1">
              {days.days} :{days.hour} hs,
            </Typography>
          </Fragment>
        ),
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#f44336",
        confirmButtonColor: "#3f51b5",
        confirmButtonText: "Sí, Reservar!",
      }).then((result) => {
        if (result.isConfirmed) {
          createUserTurns(userSelection);
          MySwal.fire({
            html: (
              <Fragment>
                 <Typography variant="h5" style={{marginBottom: "1rem"}}>
                 "Reserva realizada con éxito!
                </Typography>
              </Fragment>
            ),
            icon: "success",
            confirmButtonColor: "#3f51b5",
          }).then(function (result) {
            if (result.value) {
              history.push("/confirm");
            }
          });
        }
      });
    }
  };

  const TueThuSat = () => {
    console.log(days.hour);
    if (days.days === "") {
      return (
        <Box style={{ margin: "1rem" }}>
          {" "}
          <Typography variant="subtitle1" align="center" color="primary">
            {" "}
            Debes seleccionar un turno
          </Typography>
        </Box>
      );
    }
    if (days.days !== "Lunes / Miércoles / Viernes") {
      return (
        <Box style={{ margin: "1rem" }}>
          {" "}
          <Typography color="primary" variant="subtitle1">
            {" "}
            Días : {days.days}
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {" "}
            Horario: {days.hour} hs{" "}
          </Typography>
          {satDays.days === "" ? (
            <Typography color="secondary" variant="subtitle1">
              Falta seleccionar el Sábado
            </Typography>
          ) : (
            <Fragment>
              <Typography color="primary" variant="subtitle1">
                Días : {satDays.days}
              </Typography>
              <Typography color="primary" variant="subtitle1">
                Horario: {satDays.hour} hs.{" "}
              </Typography>
            </Fragment>
          )}
        </Box>
      );
    } else {
      return (
        <Box style={{ margin: "1rem" }}>
          {" "}
          <Typography color="primary" variant="subtitle1">
            {" "}
            Días : {days.days}
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {" "}
            Horario: {days.hour} hs{" "}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Grid container component="main" className={classes.flex}>
      <Box elevation={3} className={classes.paper}>
      <Typography align="center" variant="h5">
          Clases y Lugares Disponibles
        </Typography>
        <Typography align="center" variant="h6">
          Selecciona Días y Horarios
        </Typography>
      </Box>

      {!hours || !satHours || !thusHours ?
      (<Spinner />) :
      (
        <form onSubmit={handleSubmit} className={classes.form}>
        <Grid container >
          <Grid item xs={12} md={3}>
            <MWF savedDays={savedDays} disabled={disabled} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TT savedDays={savedDays} disabled={disabled2} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SAT savedSatDays={savedSatDays} disabled={disabled2} />
          </Grid>

          <div>{alert ? <Alert alert={alert.msg} /> : null}</div>

          <Grid item xs={12} md={3}>
            <Paper elevation={3} className={classes.card}>
              <Typography variant="h6" component={"h1"} align="center">
                {" "}
                Tu Selección:{" "}
              </Typography>
              <Typography>{TueThuSat()}</Typography>
              <Button
                onClick={() => reserve()}
                color="secondary"
                variant="contained"
                endIcon={<Icon>send</Icon>}
                type="submit"
                className={classes.button}
              >
                Reservar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
      )}
    </Grid>
  );
};

export default TurnSelector;
