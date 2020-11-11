import React, { useContext } from "react";
import Turn from "../turn/Turn";
import turnContext from "../../../context/turn/turnContext";
import { List, ListItem, Divider, Button} from "@material-ui/core";
import Delete from '@material-ui/icons/DeleteForever';
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
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

const TurnList = () => {
  
  const classTurnContext = useContext(turnContext);
  const { userTurns, deleteUserTurn,  } = classTurnContext;
  

  // Get initial state from userTurns

  const deleteTurn = (id) => {
    Swal.fire({
      title: 'Seguro que queres eliminarlo?',
      text: "Una vez realizado no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '##00897b',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Si, Eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserTurn(id)
        Swal.fire(
          'Eliminado!',
          'El usuario fue removido de la clase.',
          'success'
        )
      }
    })
  }
const classes = useStyles();
  return (
    <List>
      <h4 className={classes.subtitle}>
        Cantidad de usarios registrados: {userTurns.length}
      </h4>
      {userTurns.map((user) => (
        <ListItem key={user._id} className= {classes.cntrUsers} >
          <Turn
            id={user._id}
            style={{padding: "0px"}}
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
