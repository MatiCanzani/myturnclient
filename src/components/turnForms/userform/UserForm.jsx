import React, { Fragment, useState, useContext, useEffect } from "react";
import Hours from "../../hours/hour/Hours";
import SatudayHourOptions from "../../hours/sathours/SaturdayHours";
import DaysOptions from "../../days/Days";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AlertContext from "../../../context/alert/AlertContext";
import Alert from "../../alerts/alerts";
import turnContext from "../../../context/turn/turnContext";
import Watch from "@material-ui/icons/AccessTime";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Spinner from "../../spinner/Spinner";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#373435",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e1c1d",
    "&:hover": {
      backgroundColor: "#373435",
    },
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
    width: "100%", // Fix IE 11 issue.
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
}));

const TurnSelector = () => {
  const history = useHistory();
  const classes = useStyles();
  const [userSelection, setUserSelection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const [days, savedDays] = useState(0);
  const [hours, savedHours] = useState(0);
  const [satHours, savedSatHours] = useState(0);

  // Get initial state from userTurns
  const classTurnContext = useContext(turnContext);
  const {
    createUserTurns,
    getUserTurns,

    userTurns,
  } = classTurnContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    if (days === "Lunes / Miércoles / Viernes") {
      setUserSelection({
        userDay: days,
        userHours: hours,
        userSatHours: 0,
      });
    } else {
      setUserSelection({
        userDay: days,
        userHours: hours,
        userSatHours: satHours,
      });
    }
  }, [days, hours, satHours]);

  //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (days === 0) {
      showAlert("Debes seleccionar un día");
    } else if (hours === 0) {
      showAlert("Debes seleccionar un horario");
    }

    if (days === "Martes / Jueves / Sábados" && days === 0) {
      showAlert("Debes seleccionar un día");
    } else if (
      days === "Martes / Jueves / Sábados" &&
      hours !== 0 &&
      satHours === 0
    ) {
      showAlert("Debes seleccionar un horario para los sabados");
    }

    setLoading(true);
    setUserSelection({
      userDay: days,
      userHours: hours,
      userSatHours: satHours,
    });
    getUserTurns(userSelection);
    setShowResults(true);
    setTimeout(() => {
      setShowResults(true);
      setLoading(false);
    }, 600);
  };

  const showSpaces = () => {
    if (showResults) {
      return (
        <div className={classes.list}>
          <Typography className={classes.available}>
            Lugares disponibles: {19 - userTurns.length}
          </Typography>
          <Button
            onClick={() => reserve()}
            color="secondary"
            className="del-btn"
            variant="contained"
            size="small"
          >
            Reservar
          </Button>
        </div>
      );
    }
  };

  const reserve = () => {
    console.log(userSelection);
    if (days !== "Lunes / Miércoles / Viernes") {
      Swal.fire({
        title: "Tu selección es: ",
        text: `Martes / Jueves : ${hours} hs Sábados: ${satHours} hs`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Sí, Reservar!",
      }).then((result) => {
        if (result.isConfirmed) {
          createUserTurns(userSelection);
          Swal.fire({
            title: "Reserva realizada con éxito!",
            icon: "success",
            confirmButtonColor: "#3085d6",
          }).then(function (result) {
            if (result.value) {
              history.push("/confirm");
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "Tu selección es: ",
        text: `${days}: ${hours} hs`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Sí, reservar!",
      }).then((result) => {
        if (result.isConfirmed) {
          createUserTurns(userSelection);
          Swal.fire({
            title: "Reserva realizada con éxito!",
            icon: "success",
            confirmButtonColor: "#3085d6",
          }).then(function (result) {
            if (result.value) {
              history.push("/confirm");
            }
          });
        }
      });
    }
  };

  return (
    <div className={classes.flex}>
      <Box className={classes.paper}>
        <Box elevation={3} className={classes.box}>
          <Typography variant="h6" className={classes.title}>
            Selecciona Días y Horarios
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} className={classes.form}>
          <DaysOptions savedDays={savedDays} />
          {days === 0 || days === "Lunes / Miércoles / Viernes" ? (
            <Fragment>
              <div className={classes.flex}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography variant="h6" className={classes.subTitle}>
                  {" "}
                  &nbsp;Selecciona el horario
                </Typography>
              </div>
              <Hours savedHours={savedHours} />
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.flex}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography variant="h6" className={classes.subTitle}>
                  &nbsp;Selecciona el horario
                </Typography>
              </div>
              <Hours savedHours={savedHours} />
              <div className={classes.flex}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography variant="h6" className={classes.subTitle}>
                  &nbsp;Sábados
                </Typography>
              </div>
              <SatudayHourOptions savedSatHours={savedSatHours} />
            </Fragment>
          )}
          <div>{alert ? <Alert alert={alert.msg} /> : null}</div>
          <div className={classes.flex}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              type="submit"
            >
              Consultar
            </Button>
          </div>

          {loading ? <Spinner /> : showSpaces()}
        </form>
      </Box>
    </div>
  );
};

export default TurnSelector;
