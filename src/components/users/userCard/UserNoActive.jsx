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
  bank: {
    margin: "0.5rem",
    padding: "0.3rem",
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
      {!hours || !satHours || !thusHours ? (
        <Spinner />
      ) : (
        <form className={classes.form}>
          <Grid container>
            <Grid item xs={12}>
              <Box elevation={3} className={classes.paper}>
                <Typography align="center" variant="h6">
                  Clases y Lugares Disponibles
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Paper elevation={3} className={classes.card}>
                <Fragment>
                  <img
                    className={classes.logo}
                    src={`${logo}`}
                    alt="logo"
                    elevation={3}
                  />
                </Fragment>

                <Grid item xs={12} className={classes.flex}>
                  <Hidden>
                    <Card className={classes.titleCntnMedium} elevation={3}>
                      <Typography className={classes.title} variant="body2">
                        Elegí días y horarios, verifica que haya disponibilidad
                        y en caso que quieras inscribirte, estarás habilitado
                        una vez que realices el pago por alguno de estos medios:
                        Transferencia bancaria - Efectivo.
                        <Card className={classes.bank}>
                          <Typography
                            variant="body2"
                            style={{ fontWeight: "bold" }}
                          >
                            Datos para transferencia:
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ fontStyle: "italic", fontSize: "0.8rem" }}
                          >
                            Banco Nación
                            <Typography />
                            Caja de Ahorro: 33504941365949
                            <Typography />
                            CBU: 0110494730049413659497
                            <Typography />
                            Alias: OLEO.TRANVIA.JINETE
                            <Typography />
                            Titular: PEREZ CASTRO EDUARDO
                            <Typography />
                            CUIL: 20271033401
                          </Typography>
                        </Card>
                        En caso que realices una transferencia, por favor,
                        mandanos el comprobante asi te habilitamos. Gracias y a
                        entrenar!!!
                      </Typography>
                    </Card>
                  </Hidden>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <MWF savedDays={savedDays} disabled={true} />
            </Grid>

            <Grid item xs={12} md={3}>
              <TT savedDays={savedDays} disabled={true} />
            </Grid>
            <Grid item xs={12} md={3}>
              <SAT savedSatDays={savedSatDays} disabled={true} />
            </Grid>
          </Grid>
        </form>
      )}
    </Grid>
  );
};

export default TurnSelector;
