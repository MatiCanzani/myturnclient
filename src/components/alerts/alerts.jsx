import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(4),
    },
    display: 'flex',
    justifyContent: 'center',

  },
  alert: {
    backgroundColor: '#ffffff',
    color: '#CC0000',
    position: 'relative',
    zIndex: 9999,
  }

}));

  const SimpleAlerts = ({alert}) =>  {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error" className={classes.alert}> {alert} </Alert>
    </div>
  );
}

export default SimpleAlerts;