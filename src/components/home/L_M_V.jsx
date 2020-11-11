import React, { Fragment, useContext, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import turnContext from "../../context/turn/turnContext";
import Space from "./Space";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
    marginTop: "0.6rem",
  },
}));

const ClassList = () => {
  const classes = useStyles();

  const classTurnContext = useContext(turnContext);
  const {
    hours,
    getHours,
  } = classTurnContext;


  useEffect(() => {
    getHours();
    // eslint-disable-next-line
  }, []);
  

 
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Lunes / Miércoles / Viernes
          </Typography>
          <div>
            <List>
               {hours.map((hour, i) => (
                 <div>
              <ListItem key={i} id={hour.hour} className={classes.box}>
                {hour.hour}
              <Space hour={hour.hour}/>
              </ListItem>
              
               <Divider />
              
               </div>
               
            ))}
          
             </List>
          </div>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default ClassList;
