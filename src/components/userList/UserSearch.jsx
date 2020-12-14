import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, CssBaseline, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import userContext from "../../context/user/userContext";
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
    alignItems: "center"
  },
  excel: {
    backgroundColor: "#42aaa0",
    color: "#ffffff",
    textTransform: "capitalize",
  },
}));

const UserSeachInfo = () => {
  const classes = useStyles();

  const [name, setName] = useState({
    name: "",
  });
  const userInfoContext = useContext(userContext);

  const { getUserByFirstName, userInfo } = userInfoContext;
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

  console.log();
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
      <ExcelFile
        element={<Button className={classes.excel}>Exportar</Button>}
        filename="Usuarios"
      >
        <ExcelSheet data={fullUsers} name="Usuarios">
          <ExcelColumn label="Nmbre" value="name" />
          <ExcelColumn label="Apellido" value="lastName" />
          <ExcelColumn label="email" value="email" />
          <ExcelColumn label="Teléfono" value="Phone" />
          <ExcelColumn label="DNI" value="DNI" />
        </ExcelSheet>
      </ExcelFile>
    </Box>
  );
};
export default UserSeachInfo;
