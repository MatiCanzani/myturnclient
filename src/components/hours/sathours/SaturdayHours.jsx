import React, { useState, useEffect, useContext } from "react";
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
  text: {
    color: "##373435",
  },
  input: {
    borderColor: "##373435",
    color: "##373435",
    textAlign: "center",
  },
}));

const SatudayHourOptions = ({ savedSatHours }) => {
  const classes = useStyles();
  const [hour, setHour] = useState(0);

  const classTurnContext = useContext(turnContext);
  const { getHours, hours } = classTurnContext;


  const handleChange = (event) => {
    setHour(event.target.value);
  };



  useEffect(() => {
    getHours();
  },[]);   


  useEffect(() => {
    savedSatHours(hour);
  });   


  return (
    <div className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          className={classes.text}
        >
          Hora
        </InputLabel>
        <Select
          native
          value={hour}
          onChange={handleChange}
          label="Hour"
          className={classes.input }
          inputProps={{
            name: "hour",
            id: "outlined-age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          {hours.map((hour) => (
            <option key={hour.id} value={hour.hour} >{hour.hour}</option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SatudayHourOptions;
