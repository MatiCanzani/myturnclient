import React, { Fragment, useEffect, useContext } from "react";
import { Hidden, Box, Typography, Grid, Paper, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MWF from "../../home/L_M_V";
import TT from "../../home/M_J";
import SAT from "../../home/S";
import logo from "../../assets/logofull.png";
import Spinner from "../../spinner/Spinner";
import turnContext from "../../../context/turn/turnContext";

const useStyles = makeStyles(() => ({
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    color: "#373435",
    textAlign: "center",
  },
  button: {
    margin: "1rem 0px",
    color: "#ffffff",
  },
  paper: {
    borderRadius: "1.5rem",
    width: "100%",
  },
  title: {
    color: "#373435",
    textAlign: "center",
    background: " #eceff1",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    
  },
  subTitle: {
    padding: "0.8rem",
  },
  form: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // Fix IE 11 issue.
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  available: {
    color: "#373435",
    margin: " 1rem ",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: "16px 8px",
    // height: "25rem",
  },
  block: {
    backgroundColor: "red",
    height: "100%",
    wide: "100%",
    zIndex: 9999,
    position: "relative",
  },
  logo: {
    width: "75%",
    marginTop: "2rem",
    maxWidth: "400px",
  },
  titleCntnMedium: {
    width: "16rem",
    borderRadius: "0.4rem",
    backgroundColor: "#eceff1",
    margin: "2rem 0",
  },
  titleCntnSmall: {
    width: "16rem",
    borderRadius: "0.4rem",
    backgroundColor: "#eceff1",
    margin: "2rem 0",
  },
}));

const TurnSelector = () => {
  const classTurnContext = useContext(turnContext);
  const {
    getHours,
    getHoursSat,
    getHoursThus,
    hours,
    thusHours,
    satHours,
  } = classTurnContext;

  const classes = useStyles();

  const savedDays = () => "";

  const savedSatDays = () => "";

  useEffect(() => {
    getHoursThus();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getHours();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getHoursSat();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container component="main" className={classes.flex}>
      <Box elevation={3} className={classes.paper}>
        <Typography align="center" variant="h5">
          Clases y Lugares Disponibles
        </Typography>
      </Box>
      {!hours || !satHours || !thusHours ? (
        <Spinner />
      ) : (
        <form className={classes.form}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <MWF savedDays={savedDays} disabled={true} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TT savedDays={savedDays} disabled={true} />
            </Grid>
            <Grid item xs={12} md={3}>
              <SAT savedSatDays={savedSatDays} disabled={true} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper elevation={3} className={classes.card}>
                <Fragment>
                  <img className={classes.logo} src={`${logo}`} alt="logo" />
                </Fragment>
                <Grid item xs={12} className={classes.flex}>
                  <Hidden xsDown>
                    <Card className={classes.titleCntnMedium} elevation={3}>
                      <Typography className={classes.title}>
                        Elegí días y horarios, verifica que haya disponibilidad
                        y en caso que quieras inscribirte, estarás habilitado
                        una vez que realices el pago por alguno de estos medios:
                        Transferencia bancaria - Efectivo. En caso que realices
                        una transferencia, por favor, mandanos el comprobante
                        asi te habilitamos. Gracias y a entrenar!!!
                      
                      </Typography>
                    </Card>
                  </Hidden>
                  <Hidden smUp>
                    <Card className={classes.titleCntnSmall}>
                      <Typography className={classes.title}>
                        Elegí días y horarios, verifica que haya disponibilidad
                        y en caso que quieras inscribirte, estarás habilitado
                        una vez que realices el pago por alguno de estos medios:
                        Transferencia bancaria - Efectivo. En caso que realices
                        una transferencia, por favor, mandanos el comprobante
                        asi te habilitamos. Gracias y a entrenar!!!
                      </Typography>
                      {/* <Typography
                        color="secondary"
                        align="center"
                        className={classes.subTitle}
                      >
                        Por favor ponete en contacto con JuaguarCF.
                      // </Typography> */}
                    </Card>
                  </Hidden>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      )}
    </Grid>
  );
};

export default TurnSelector;
