import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    flexGrow: 1,
    justifyContent: "center",
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

  // function generate(element) {
  //   return [0, 1, 2].map((value) =>
  //     React.cloneElement(element, {
  //       key: value,
  //     }),
  //   );
  // }

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
        <Typography className={classes.title}>
            Martes / Jueves 
          </Typography>
          <div>
            <List className={classes.box}>
              {/* {generate( */}

              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText variant="body1" color="initial">
                  13:00 Hs
                </ListItemText>
              <ListItemText style={{ backgroundColor: "yellow" }}>
                Disponible
              </ListItemText>
              </ListItem>
              <Divider />
           
              {/* )} */}
            </List>
          </div>
        </Grid>

        <Divider />
      </Paper>
    </Fragment>
  );
};

export default ClassList;
