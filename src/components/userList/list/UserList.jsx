import React, { useContext, useEffect } from "react";
import User from "../user/User";
import userContext from "../../../context/user/userContext";
import { List, ListItem } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cntrUsers:{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    textTransform: 'uppercase',
    padding: '0px',
  },
  subtitle: {
    textAlign: 'center',
  },
  user: {
    textTransform: 'uppercase',
  }
}));

const UserInfo = () => {

  // Get initial state from userTurns
  const userInfoContext = useContext(userContext);
  const { userInfo, getUserInfo, getUserByDni, dni } = userInfoContext;


  //get user turn when load component
  useEffect(() => {
    !dni ?  getUserInfo() : getUserByDni();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <List>
  
        {userInfo.length === 0 ? (
         <h4 className={classes.subtitle}> 
         "No hay usuarios registrados"
         </h4>
        ) : (
          userInfo.map((user) => (
            <ListItem key={user._id} className= {classes.cntrUsers}>
              <User user={user} />
              <Divider />
            </ListItem>
          ))
        )}
  
    </List>
  );
};

export default UserInfo;
