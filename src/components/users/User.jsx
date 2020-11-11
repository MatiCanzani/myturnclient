import React, { Fragment, useContext, useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import UserForm from "../turnForms/userform/UserForm";
import AuthContext from "../../context/autentication/authContext";
import turnContext from "../../context/turn/turnContext";
import UserNoActive from "./userCard/UserNoActive";
import UserConfirm from "../users/UserConfirm"
import Spinner from "../spinner/Spinner"

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
}));

const Turns = (props) => {


  //get authentication info

  // const [loading, setLoading]  = useState(false);

  const authContext = useContext(AuthContext);
  const { user, userAuthenticated} = authContext;

  const classTurnContext = useContext(turnContext);
  const {userTurn} = classTurnContext;

  useEffect(() => {
    userAuthenticated();
    // eslint-disable-next-line
  }, []);
  

  const classes = useStyles();
  return (
    <Fragment>
      {/* <UpBar /> */}
      <Container className={classes.userCardCntr}>
        <Box className={classes.cntr}>
          {!user
            ? null
            : (user.isActive === false ? (
                <UserNoActive />
              ) :           
              (!userTurn) ? (
                <UserForm />
                ): (<UserConfirm />))
              }
        </Box>
      </Container>
    </Fragment>
  );
};

export default Turns;
