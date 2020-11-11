import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Emoji from "a11y-react-emoji";
import logo from "../../assets/logofull.png";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cntr: {
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "600%",
    width: "95%",
  },
  card: {
    padding: "10px",
    textAlign: "center",
    color: "#ffff",
  },

  cntrTitle:{
    background: " #eceff1",
    borderRadius: "0.5rem"
  },

  title: {
    marginBottom: "2rem",
    color: "#373435",
  
    fontSize:"1.2rem",
    fontWeight: "bolder",
    padding: "0.5rem",
  },
  pos: {
    // marginBottom: "1rem",
  },
  span: {
    color: "#d50000 ",
  },
  image: {
    width: "100%",
    marginBottom: "2.2rem",
    marginTop: "1.2rem",
  },
  text:{
    color: "#373435",
    fontSize:"1.2rem",

  }
}));

export default function Active(props) {
  const classes = useStyles();

  return (
    <Grid>
    <div className={classes.card}>
      <div>
        <div>
          <img className={classes.image} src={`${logo}`} alt="" />
        </div>
        <div className={classes.cntrTitle}>
        <Typography  className={classes.title}>
         Tu reserva fue confirmada! <Emoji symbol="💪" label="force" />{" "}
        </Typography>
        </div>
        <Typography  className={classes.text}>
          Tus clases son los días:
        </Typography>
        <Typography
          className={classes.span}
          variant="h6"
          component="h6"
          gutterBottom
        >
          {props.userDay}
        </Typography>
        <Typography className={classes.text}>
          en el horario de las :
        </Typography>
        <Typography
          className={classes.span}
          variant="h6"
          component="h6"
          gutterBottom
        >
          {props.hours} hs.
        </Typography>

      </div>
    </div>
    </Grid>
  );
}
