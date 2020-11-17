import React, {  useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container} from "@material-ui/core";
import UserForm from "../turnForms/userform/UserForm";
import AuthContext from "../../context/autentication/authContext";
import turnContext from "../../context/turn/turnContext";
import UserNoActive from "./userCard/UserNoActive";
import UserConfirm from "../users/UserConfirm"


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

const Turns = () => {

  // const [loading, setLoading]  = useState(false);
  //get authentication info
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const classTurnContext = useContext(turnContext);
  const {userTurn, getHours } = classTurnContext;

  // useEffect(() => {
  //   userAuthenticated();
  //    // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    getHours();
    // eslint-disable-next-line
  }, []);


  
  const classes = useStyles();
  return (
      <Container className={classes.userCardCntr}> 
          {!user
            ? null
            : user.isActive === false ? 
               ( <UserNoActive />)
               :      
              !userTurn ? 
                (<UserForm />)
                : (<UserConfirm />)
            }
      </Container> 
  );
};

export default Turns;
