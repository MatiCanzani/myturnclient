import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CssBaseline,
  Container,
  Typography,
   Card
} from "@material-ui/core";
import UserSearchForm from "../../userList/UserSearch";
import UserList from "../../userList/list/UserList";

const useStyles = makeStyles(() => ({
  mainCntr: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formCntr: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: "#eeeeee",
    borderRadius: "20px",
    width: "100%",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  search: {
    marginBottom: "100px",
  },
  userList: {
    maxWidth: "600px",
    width: "90%",
    height: "350px",
  },
  title: {
    color: "#373435",
    textAlign: "center",
    padding: "0px 1.5rem",
  },
  box: {
    background: " #eceff1",
    borderRadius: "0.5rem",
    margin: "1.5rem 0px",
    width: "100%",
  },
}));

const Users = () => {
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Grid className={classes.flex}>
          <div className={classes.paper}>
            <Grid container spacing={2} className={classes.formCntr}>
              <Card elevation={3} className={classes.box}>
                <Typography variant="h5" className={classes.title}>
                  Control Usuarios
                </Typography>
              </Card>
              <Grid item xs={12} sm={12}>
                <UserSearchForm className={classes.search} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <UserList />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Users;
