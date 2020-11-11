import React, { useContext, useState, useEffect } from "react";
import turnContext from "../../context/turn/turnContext";
import { ListItem, List } from "@material-ui/core";

const Space = (props) => {
  const classTurnContext = useContext(turnContext);
  const { getSpace, space } = classTurnContext;

//   const classHour = [];
//   classHour.push(Object.values(props))

  useEffect(() => {
          getSpace({
              userDay: "Lunes / Miércoles / Viernes",
              userHours: props.hour,
              userSatHours: 0,
            })
  }, [])


  const showHours = () => {
    return (
        <ListItem >
        {19 - space.userTurn}
      </ListItem>
    )               
  
  }


  return (
    <div>
      <List>
          {showHours()}
      </List>
    </div>
  );
};

export default Space;
