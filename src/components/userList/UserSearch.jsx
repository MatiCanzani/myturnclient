import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, CssBaseline, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import userContext from "../../context/user/userContext";
import turnContext from "../../context/turn/turnContext";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      margin: "13px",
      maxWidth: "170px",
    },
  },
  icon: {
    margin: "0",
  },
  button: {
    // padding: '5px',
    margin: "10px !important",
    padding: "10px !important",
    minWidth: "40px !important",
    width: "40px",
    height: "40px",
    borderRadius: "180px ",
  },
  cntr: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  excel: {
    backgroundColor: "#42aaa0",
    color: "#ffffff",
    textTransform: "capitalize",
    margin: "0.4rem", 
    '&:hover': {
      backgroundColor: "#36837b",
    },
    '&:focus': {
      backgroundColor: "#36837b",
    }
  },
  exports : {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  }
}));

const UserSeachInfo = () => {
  const classes = useStyles();

  const [name, setName] = useState({
    name: "",
  });
  const userInfoContext = useContext(userContext);
  const { getUserByFirstName, userInfo } = userInfoContext;

  const classTurnContext = useContext(turnContext);
  const { getUserTurns, userTurns } = classTurnContext;

useEffect(() => {
  getUserTurns();
// eslint-disable-next-line
},[])

  const getInputName = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getUserByFirstName(name);
  };

  const fullUsers = userInfo.map((user) => {
    const fullUser = {
      name: user.firstName,
      lastName: user.lastName,
      email: user.email,
      Phone: user.telephone,
      DNI: user.dni,
      Active: user.isActive,
    };
    return fullUser;
  });

const newUserTurns = [];

const getSortedTurns = () => {
  userTurns.map((turn)=> {
    const turnWithName = {
      name: turn.userName.firstName,
      lastName: turn.userName.lastName,
      userDay: turn.userDay,
      userHour: turn.userHours,
      userSatHours: turn.userSatHours,
    };
    newUserTurns.push(turnWithName)
    return newUserTurns;
  });

  const compareName  = (a, b) => {
    let userNameA = a.name;
    let userNameB= b.name;

   if(userNameA < userNameB){
           return -1;
   }else if(a.item > b.item){
           return 1;
   }else{
           return 0;
   }
}
  
newUserTurns.sort(compareName).sort();

return newUserTurns
}

  return (
    <Box className={classes.cntr}>
      <CssBaseline />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="input"
          name="firstName"
          placeholder="Buscar por Nombre"
          onChange={getInputName}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          <SearchIcon className={classes.icon} />
        </Button>
      </form>
      <Box className= {classes.exports}>
        <Box>
        <ExcelFile
          element={<Button className={classes.excel}>Usuarios</Button>}
          filename="Usuarios"
        >
          <ExcelSheet data={fullUsers} name="Usuarios">
            <ExcelColumn label="Nombre" value="name" />
            <ExcelColumn label="Apellido" value="lastName" />
            <ExcelColumn label="email" value="email" />
            <ExcelColumn label="Teléfono" value="Phone" />
            <ExcelColumn label="DNI" value="DNI" />
          </ExcelSheet>
        </ExcelFile>
        </Box>
      <Box>
      <ExcelFile
          element={<Button className={classes.excel} >Turnos</Button>}
          filename="Turnos"
        >
          <ExcelSheet data={getSortedTurns} name="Turnos">
            <ExcelColumn label="Nombre" value="name" />
            <ExcelColumn label="Apellido" value="lastName" />
            <ExcelColumn label="Dia" value="userDay" />
            <ExcelColumn label="Hora" value="userHour" />
            <ExcelColumn label="Hora Sabados" value="userSatHours" />
          </ExcelSheet>
        </ExcelFile>
      </Box>
      </Box>
    </Box>
  );
};
export default UserSeachInfo;
