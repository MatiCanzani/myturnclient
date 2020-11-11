import React, { useContext, useEffect, Fragment } from "react";
import userContext from "../../../../context/user/userContext";
import AuthContext from "../../../../context/autentication/authContext";
import Paper from "@material-ui/core/Paper";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  cardsCntr: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eeeeee"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  total: {
    backgroundColor: "#0277bd",
    "&:hover": {
      backgroundColor: "#0288d1",
      borderRadius: "50px",
    },
    borderRadius: "50px",
    marginTop: theme.spacing(3),
    color: "#ffffff",
  },
  noActive: {
    backgroundColor: "#c62828",
    "&:hover": {
      backgroundColor: "#d32f2f",
      borderRadius: "50px",
    },
    borderRadius: "50px",
    marginTop: theme.spacing(3),
    color: "#ffffff",
  },
  active: {
    backgroundColor: "#00838f",
    "&:hover": {
      backgroundColor: "#0097a7",
      borderRadius: "50px",
    },
    borderRadius: "50px",
    marginTop: theme.spacing(3),
    color: "#ffffff",
  },
}));

const Admin = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  // Get initial state from userTurns
  const userInfoContext = useContext(userContext);
  const { userInfo, getUserInfo } = userInfoContext;

  //get user turn when load component
  useEffect(() => {
    userAuthenticated();
    getUserInfo();
    //eslint-disable-next-line
  }, []);

  const usersActive = userInfo.filter((user) => user.isActive === true);
  const usersInactive = userInfo.filter((user) => user.isActive === false);
  return (
    <Fragment>
      <div className={classes.cardsCntr}>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Paper elevation={3} className={classes.paper}>
              <Box className={classes.box}>
                <Typography>Usuarios</Typography>
                <Typography>registrados</Typography>
                <Button variant="contained" className={classes.total}>
                  <p>{userInfo.length}</p>
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} className={classes.paper}>
              <Box className={classes.box}>
                <Typography>Usuarios</Typography>
                <Typography>Activos</Typography>
                <Button variant="contained" className={classes.active}>
                  <p>{usersActive.length}</p>
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} className={classes.paper}>
              <Box className={classes.box}>
                <Typography>Usuarios</Typography>
                <Typography>no activos</Typography>
                <Button variant="contained" className={classes.noActive}>
                  <p>{usersInactive.length}</p>
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
};
export default Admin;
