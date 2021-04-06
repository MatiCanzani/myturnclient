import React, { useContext, useState } from "react";
import { Card, Divider, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import userContext from "../../../context/user/userContext";
import turnContext from "../../../context/turn/turnContext";
import Delete from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Done from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import ContactName from "@material-ui/icons/PermIdentity";
import ContactEmail from "@material-ui/icons/AlternateEmail";
import ContactPhone from "@material-ui/icons/Call";
import ContactDni from "@material-ui/icons/FormatIndentIncrease";
import Active from "@material-ui/icons/Check";
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
    height: "2rem",
    margin: " 0px 0.3rem",
    // borderRadius: "110rem",
    padding: "0px",
    minWidth: "2rem",
    "& .MuiButton-label": {
      width: "4rem",
    },
  },
  cntrBtn: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    // margin: "0.5rem 3rem 1rem 0.5rem",
    padding: "0.5rem 1rem 1rem 0.5rem",
    // alignItems: "center",
  },
  card: {
    width: "100%",
  },
  iconMargin: {
    marginRight: "1rem",
  },
}));

const User = ({ user }) => {
  const userInfoContext = useContext(userContext);
  const { deleteUserById, userActive, getUserInfo } = userInfoContext;

  const classTurnContext = useContext(turnContext);
  const { deleteUserTurn } = classTurnContext;

  //delte user

  const deleteUser = (id) => {
    Swal.fire({
      title: "Seguro que queres eliminarlo?",
      text: "Antes de eliminarlo, verifica que no tengan turnos agendados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009688",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Si, Eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUserTurn(id);
        deleteUserById(id);
        Swal.fire("Eliminado!", "El usuario fue removido", "success").then(
          function (result) {
            if (result.value) {
              getUserInfo();
            }
          }
        );
      } 
    });
  };

  //chage useer active condition
  const chageUserActive = (user) => {
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
  };
  const classes = useStyles();
  return (
    <div className={classes.flex}>
      {!user.isAdmin ? (
        <List key={user._id} className={classes.cntrUsers}>
          <Card className={classes.card} elevation={3}>
            <CardContent>
              <ListItem>
                <ContactName className={classes.iconMargin} />
                <Typography ariant="body" component="p">
                  {user.firstName} {user.lastName}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ContactEmail className={classes.iconMargin} />
                <Typography
                  variant="body2"
                  component="p"
                  style={{ textTransform: "lowercase" }}
                >
                  {user.email}
                  <br />
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ContactPhone className={classes.iconMargin} />
                <Typography variant="body2" component="p">
                  {user.telephone}
                  <br />
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ContactDni className={classes.iconMargin} />
                <Typography variant="body2" component="p">
                  {user.dni}
                  <br />
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Active className={classes.iconMargin} />
                {user.isActive ? (
                  <Button
                    onClick={() => chageUserActive(user)}
                    color="primary"
                    className={classes.btn}
                    variant="contained"
                    disabled={disabled}
                  >
                    <Typography variant="body2" component="p">
                      SI
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    onClick={() => chageUserActive(user)}
                    color="primary"
                    className={classes.btn}
                    variant="contained"
                    disabled={disabled}
                  >
                    <Typography variant="body2" component="p">
                      NO
                    </Typography>
                  </Button>
                )}
              </ListItem>
              <Divider />
            </CardContent>
            <CardActions className={classes.cntrBtn}>
              {/* <Box className={classes.cntrBtn}> */}
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
              {/* </Box> */}
            </CardActions>
          </Card>
        </List>
      ) : null}
    </div>
  );
};

export default User;
