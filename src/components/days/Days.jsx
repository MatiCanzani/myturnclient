import React, { useState, useEffect, Fragment } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Icon, Typography } from "@material-ui/core";
import Calendar from "@material-ui/icons/DateRange";

const useStyles = makeStyles(() => ({
  title: {
    color: "#373435",
    textAlign: "center",
  },
  cntr: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fac819",
    borderRadius: "0.5rem",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  subTitle: {
    color: "#373435",
    textAlign: "center",
    margin: "0.8rem",
  },
}));

const DaysOptions = ({ savedDays }) => {
  const [days, setDays] = useState(0);

  const handleChange = (e) => {
    setDays(e.target.value);
  };

  useEffect(() => {
    savedDays(days);
  });

  const classes = useStyles();
  return (
    <Container className={classes.cntr}>
      <FormControl component="fieldset">
        <Fragment>
          <div className={classes.flex}>
            <Icon>
              <Calendar style={{ color: "#373435" }} />
            </Icon>
            <Typography variant="h6" className={classes.subTitle}>
              &nbsp;Selecciona los días
            </Typography>
          </div>
        </Fragment>
        <RadioGroup aria-label="days" value={days} onChange={handleChange}>
          <FormControlLabel
            className="subtitle"
            value="Lunes / Miércoles / Viernes"
            control={<Radio />}
            label="Lunes / Miércoles / Viernes"
            name="days"
          />
          <FormControlLabel
            className="subtitle"
            value="Martes / Jueves"
            control={<Radio />}
            label="Martes / Jueves"
            name="days"
          />

          <FormControlLabel
            className="subtitle"
            value="Sábado"
            control={<Radio />}
            label="Sábado"
            name="days"
          />
        </RadioGroup>
      </FormControl>
    </Container>
  );
};

export default DaysOptions;
