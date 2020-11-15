import React, { Fragment, useContext, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import turnContext from "../../context/turn/turnContext";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.1rem",
    marginTop: "0.6rem",
  },

  flex: {
    display: "flex",
    flexDirection: "row"
  },
  row:{
    '&:hover': {
      backgroundColor: '#00ss00',    
    },
  }
}));

const MWF = ({ savedDays, disabled }) => {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const [selection, setSelection] = useState({
    days: "",
    hour: value,
  });

  const classTurnContext = useContext(turnContext);
  const { hours } = classTurnContext;
  // useEffect(() => {
  //   getHours();
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    savedDays(selection);
      // eslint-disable-next-line
  }, [selection]);

  const handleClick = (event) => {
    if (event.target.value === value) {
      setValue("");
      setSelection({
        days: "",
        hour: value,
      })
    } else {
      setValue(event.target.value);
    setSelection({
      days: "Lunes / Miércoles / Viernes",
      hour: event.target.value,
    });
  }
  };

  return (
    <Fragment>
      <Paper className={classes.paper}>
          <FormControl component="fieldset" className={classes.row}>
            <FormLabel component="legend" style={{paddingTop: "1.5rem"}} align="center">
              Lunes / Miércoles / Viernes
            </FormLabel>
            <RadioGroup
              name="Lunes / Miércoles / Viernes"
              value={value}
            >
              <Fragment>
                <List>
                  {hours.map((hour) => (
                    <Fragment key={hour.hours}>
                      {hour.space === 19 ? null : (
                        <Fragment>
                          <ListItem
                            
                          >
                            <ListItemText  >
                              <FormControlLabel
                                value={hour.hours}
                                control={<Radio onClick={handleClick} disabled={disabled} />}
                                label={
                                  <Typography variant="body2">
                                    {hour.hours}
                                  </Typography>
                                }
                              />
                              </ListItemText>
                              <ListItemText>
                              <Typography variant="body2" >
                                {19 - hour.space} disponibles.
                              </Typography>
                              
                            </ListItemText>
                          </ListItem>
                          <Divider />
                        </Fragment>
                      )}
                    </Fragment>
                  ))}
                </List>
              </Fragment>
            </RadioGroup>
          </FormControl>

      </Paper>
    </Fragment>
  );
};

export default MWF;
