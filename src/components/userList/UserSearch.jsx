import React, { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, CssBaseline, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import userContext from '../../context/user/userContext';
const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      margin: '13px',
      maxWidth: '170px',
    },
  },
  icon: {
      margin: '0' 
  },
  button:{
    // padding: '5px',
    margin: '10px !important',
    padding: '10px !important',
    minWidth: '40px !important',
    width: '40px',
    height: '40px',
    borderRadius: '180px ',
  },
  cntr: {
    marginBottom: "20px",
  }

}));


const UserSeachInfo = () => {
  const classes = useStyles();
  const userInfoContext = useContext(userContext);
  const [ dni, setDni ] = useState({
    dni: ''
  })
  const { getUserByDni} = userInfoContext;
  const getInputDni = e => {
    setDni({
      ...dni,
      [e.target.name] : e.target.value
    })
  }

const onSubmit = e => {
  e.preventDefault();
  getUserByDni(dni)
}

  return (
    <Box className={classes.cntr}>
      <CssBaseline />
    <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}
      >
      <TextField 
      id="input" 
      name="dni"
      placeholder="Buscar por DNI"
      onChange={getInputDni}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >< SearchIcon className={classes.icon}/>
        </Button>
    </form>
    </Box>
  );
}
export default  UserSeachInfo 

