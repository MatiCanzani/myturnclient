import React, { Fragment, useState, useContext, useEffect } from "react";
import Hours from "../../hours/hour/Hours";
import SatudayHourOptions from "../../hours/sathours/SaturdayHours";
import DaysOptions from "../../days/Days";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import AlertContext from "../../../context/alert/AlertContext";
import Alert from "../../alerts/alerts";
import turnContext from "../../../context/turn/turnContext";
import TurnList from "../../Turns/turnlist/TurnList";
import Watch from "@material-ui/icons/AccessTime";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleCnt: {
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
    color: "#ffffff"
  },
  paper: {
    // backgroundColor: "#eeeeee",
    borderRadius: "1.5rem",
    width: "100%",
  },
  subTitle: {
    color: "#373435",
    textAlign: "center",
    padding: "0.8rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
}));

//form to select classes schedules by users

const TurnSelector = () => {
  const classes = useStyles();
  const [userTurns, setUserTurns] = useState({
    userDay: "",
    userHours: "",
    userSatHours: "",
  });

  // Get initial state from userTurns
  const classTurnContext = useContext(turnContext);
  const { getUserTurns } = classTurnContext;

  const [days, savedDays] = useState(0);
  const [hours, savedHours] = useState(0);
  const [satHours, savedSatHours] = useState(0);
  const [showNames, setShowNames] = useState(false)

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  useEffect(() => {
    if (days === "Lunes / Miércoles / Viernes") {
      setUserTurns({
        userDay: days,
        userHours: hours,
        userSatHours: 0,
      });
    } else {
      setUserTurns({
        userDay: days,
        userHours: hours,
        userSatHours: satHours,
      });
    }
  }, [days, hours, satHours]);

useEffect(() => {
  getUserTurns(userTurns);
  //eslint-disable-next-line
},[userTurns])

console.log(userTurns)

  const handleSubmit = (e) => {
    console.log(userTurns)
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
      showAlert("Debes seleccionar un horario para los sábados");
    }

    getUserTurns(userTurns);
    savedSatHours({
      satHours: "",
    });
    setShowNames(true)
  };

  const showResults = () => {
    if(showNames) {
      return <TurnList />
    }
  }

  console.log(userTurns)
  return (
    <div className={classes.flex}>
      <div elevation={3} className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <DaysOptions savedDays={savedDays} />
          {days === 0 || days === "Lunes / Miércoles / Viernes" ? (
            <Fragment>
              <div className={classes.subtitleCnt}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography  variant="h6" className={classes.subTitle}>
                  {" "}
                  &nbsp;Selecciona el horario
                </Typography>
              </div>
              <Hours savedHours={savedHours} />
            </Fragment>
          ) : (
            <Fragment>
          <div className={classes.subtitleCnt}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography  variant="h6" className={classes.subTitle}>
                  &nbsp;Selecciona el horario
                </Typography>
              </div>
              <Hours savedHours={savedHours} />
              <div className={classes.flex}>
                <Icon>
                  <Watch style={{ color: "#373435" }} />
                </Icon>
                <Typography  variant="h6" className={classes.subTitle}>&nbsp;Sábados</Typography>
              </div>
              <SatudayHourOptions savedSatHours={savedSatHours} />
            </Fragment>
          )}
          <div>
          {alert ? <Alert alert={alert.msg} /> : null}
          </div>

          <div className={classes.flex}>
            <Button
              variant="contained"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              type="submit"
              >
              Mostras Usuarios
            </Button>
          </div>
          {showResults()}
        </form>
      </div>
    </div>
  );
};

export default TurnSelector;
