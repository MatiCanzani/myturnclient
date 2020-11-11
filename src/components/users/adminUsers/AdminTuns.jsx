import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  CssBaseline,
  Paper,
  Typography,
} from "@material-ui/core";
import AdminForm from "../../turnForms/adminform/AdminForm";
import AuthContext from "../../../context/autentication/authContext";

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
  box: {
    background: " #eceff1",
    borderRadius: "0.5rem",
    marginTop: "1.5rem",
    width: "100%",
  },
  title: {
    color: "#373435",
    textAlign: "center",
    padding: "0px 1.5rem",
  },
}));

const AdminTurns = ({ id }) => {
  //get authentication info

  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  useEffect(() => {
    userAuthenticated();
    //eslint-disable-next-line
  }, []);

  const classes = useStyles();

  
  return (
    <div>
      {/* <UpBar /> */}
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        
        <Grid container spacing={2} className={classes.formCntr} sm={12}>
          <Paper elevation={3} className={classes.box}>
            <Typography variant="h5" className={classes.title}>
              Control de Clases
            </Typography>
          </Paper>
          <Grid item xs={12} sm={12}>
            <AdminForm />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminTurns;
