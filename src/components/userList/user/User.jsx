import React, { useContext, useState } from "react";
import { List} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import userContext from "../../../context/user/userContext";
import turnContext from "../../../context/turn/turnContext";
import Delete from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/CheckCircleOutline";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: " 0px 0.5rem",
  },
  cntrUsers: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0px",
    padding: "0.5rem",
    width: "100%",
  },
  user: {
    color: "#373435",
  },
  btn: {
    width: "auto",
    height: "2rem",
    margin: " 0px 0.3rem",
    borderRadius: "110rem",
    padding: "0px",
    minWidth: "2rem",
    "& .MuiButton-label": {
      width: "2rem",
    },
  },
  cntrBtn: {
    display: "flex",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
}));

const User = ({ user }) => {
  const userInfoContext = useContext(userContext);
  const { deleteUserById, userActive, getUserInfo } = userInfoContext;

  const classTurnContext = useContext(turnContext);
  const { deleteUserTurn,  } = classTurnContext;

  //delte user

  const deleteUser = (id) => {
    Swal.fire({
      title: "Seguro que queres eliminarlo?",
      text: "Una vez realizado no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009688",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Si, Eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserTurn(id);
        deleteUserById(id);
        Swal.fire(
          "Eliminado!",
          "El usuario fue removido de la clase.",
          "success"
        ).then(function (result) {
          if (result.value) {
            getUserInfo();
          }
        });
      }
    });
  };

  //chage useer active condition
  const chageUserActive = (user) => {
    console.log(user);
    if (user.isActive) {
      user.isActive = false;
    } else {
      user.isActive = true;
    }
    userActive(user);
  };

  //change edit button visibility
  const edit = <Edit value="edit" />;
  const save = <Done value="save" />;

  const [disabled, setDisabled] = useState(true);
  const [children, setChildren] = useState(edit);

  const showButtons = () => {
    setDisabled(!disabled);

    if (disabled) {
      setChildren(save);
    } else {
      setChildren(edit);
    }
    //  console.log({value: e.target.value})
  };
  const classes = useStyles();
  return (
    <div className={classes.flex}>
      {!user.isAdmin ? (
        <List key={user._id}  className={classes.cntrUsers}>
          <ListItemText>
            <span className={classes.user}>
              {user.firstName}{" "} {user.lastName}
            </span>
          </ListItemText>
          <Box className={classes.cntrBtn}>
            {user.isActive ? (
              <Button
                onClick={() => chageUserActive(user)}
                color="primary"
                className={classes.btn}
                variant="contained"
                disabled={disabled}
              >
                SI
              </Button>
            ) : (
              <Button
                onClick={() => chageUserActive(user)}
                color="primary"
                className={classes.btn}
                variant="contained"
                disabled={disabled}
              >
                NO
              </Button>
            )}
            <Button
              onClick={() => showButtons()}
              className={classes.btn}
              variant="contained"
              style={{ backgroundColor: "#ffcc29" }}
            >
              {children}
            </Button>

            <Button
              onClick={() => deleteUser(user._id)}
              color="secondary"
              className={classes.btn}
              variant="contained"
            >
              <Delete />
            </Button>
          </Box>
        </List>
      ) : null}
    </div>
  );
};

export default User;
