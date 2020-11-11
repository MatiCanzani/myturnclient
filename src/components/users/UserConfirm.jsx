import React, {useContext, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Container, Button } from "@material-ui/core";
import AuthContext from "../../context/autentication/authContext";
import turnContext from "../../context/turn/turnContext";
import UserCard from "./userCard/UserCard";
import UserCardSat from "./userCard/UserCardSat";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(() => ({
  userCardCntr: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cntr: {
    maxWidth: "700px",
    width: "95%",
    marginBottom: "30px",
  },
  button: {
    margin: "1rem",
  },
  important: {
    textAlign: "center",
    "& first-child": {
      margin: "3rem",
    },
  },
}));

const Turns = () => {
  //get authentication 


  const authContext = useContext(AuthContext);
  const { user, userAuthenticated } = authContext;

  const classTurnContext = useContext(turnContext);
  const { userTurn, getUserTurnsById, getUserTurns } = classTurnContext;

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
    } else if (userTurn.userSatHours === "0") {
      getUserTurns();
      return <UserCard userDay={userTurn.userDay} hours={userTurn.userHours} />;
    } else {
      getUserTurns();
      return (
        <UserCardSat
          userDay={userTurn.userDay}
          hours={userTurn.userHours}
          satHours={userTurn.userSatHours}
        />
      );
    }
  };

  // console.log(userDays)
  const classes = useStyles();

  return (
    <Fragment>
    {/* <UpBar /> */}
    <Container className={classes.userCardCntr}>
      <Box className={classes.cntr}>
      {/* <Container className={classes.userCardCntr}> */}
      <Box className={classes.cntr}>{!user ? null : userClasses()}</Box>
      <div className={classes.important}>
        <Divider style={{ margin: "1rem" }} />
        <Typography variant="h6">Importante!</Typography>
        <Divider style={{ margin: "1rem" }} />
        <Typography>
          Recordá completar y llevar impresa al box la DECLARACIÓN JURADA en la cual conste que
          no presentas síntomas de COVID 19. La misma se deberá renovar cada 14 dias. 
        </Typography>
        <div>
          <a href={process.env.PUBLIC_URL + "/PROTOCOLO_DDJJ.pdf"} download style={{textDecoration: "none"}}> 
          <Button 
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          >
            Descargar DDJJ
            </Button></a>
        </div>
        </div>
      </Box>
      </Container>
    </Fragment>
  );
};

export default Turns;
