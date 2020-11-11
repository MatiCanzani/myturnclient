import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import turnContext from "../../../context/turn/turnContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  input: {
    borderColor: "#373435",
    color: "#373435",
  },
}));

const HourOption = ({ savedHours }) => {
  const classes = useStyles();
  const [hour, setHour] = useState(0);

  const classTurnContext = useContext(turnContext);
  const { getHours, hours } = classTurnContext;

  useEffect(() => {
    getHours();
    // eslint-disable-next-line
  }, []);

  console.log(hours);
  const handleChange = (e) => {
    setHour(e.target.value);
  };

  useEffect(() => {
    savedHours(hour);
  });

  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.input}
          htmlFor="outlined-age-native-simple"
        >
          Hora
        </InputLabel>
        <Select
          className={classes.input}
          native
          value={hour}
          onChange={handleChange}
          label="Hour"
          inputProps={{
            name: "hour",
            id: "outlined-hour-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {hours.map((hour) => (
            <option key={hour._id} value={hour.hour}>
              {hour.hour}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default HourOption;
