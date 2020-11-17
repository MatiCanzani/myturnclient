import React, { useContext, Fragment } from "react";
import Turn from "../turn/Turn";
import turnContext from "../../../context/turn/turnContext";
import { List, ListItem, Divider, Button, Typography } from "@material-ui/core";
import Delete from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2/src/sweetalert2.js";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useStyles = makeStyles(() => ({
  cntrUsers: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    textTransform: "uppercase",
    padding: "0px",
  },
  subtitle: {
    textAlign: "center",
  },
  user: {
    textTransform: "uppercase",
  },
}));

const TurnList = () => {
  const classTurnContext = useContext(turnContext);
  const { userTurns, deleteUserTurn } = classTurnContext;

  // Get initial state from userTurns

  const deleteTurn = (id) => {
    MySwal.fire({
      html: (
        <Fragment>
          <Typography variant="h5" style={{ marginBottom: "1rem" }}>
            Seguro que queres eliminarlo?
          </Typography>
          <Typography variant="h5" style={{ marginBottom: "1rem" }}>
            Una vez realizado no se puede revertir!
          </Typography>
        </Fragment>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "##00897b",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Si, Eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserTurn(id);
        MySwal.fire({
          html: (
            <Fragment>
              <Typography variant="h5" style={{ marginBottom: "1rem" }}>
                Eliminado!
              </Typography>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                El usuario fue removido de la clase.
              </Typography>
            </Fragment>
          ),
          icon: "success",
        });
      }
    });
  };
  const classes = useStyles();
  return (
    <List>
      <h4 className={classes.subtitle}>
        Cantidad de usarios registrados: {userTurns.length}
      </h4>
      {userTurns.map((user) => (
        <ListItem key={user._id} className={classes.cntrUsers}>
          <Turn
            id={user._id}
            style={{ padding: "0px" }}
            userTurn={`${user.userName.firstName} ${user.userName.lastName}`}
          />
          <Button
            onClick={() => deleteTurn(`${user._id}`)}
            color="secondary"
            className="del-btn"
            variant="contained"
            size="small"
          >
            <Delete />
          </Button>
          <Divider />
        </ListItem>
      ))}
    </List>
  );
};

export default TurnList;
