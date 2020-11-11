
import React, { Fragment } from 'react';
import UpBar from "../bar/upBar";

const Layout = (props) =>{
    // const children = props.children;
    return(
        <Fragment>
            <UpBar />
            {props.children}
        </Fragment>
    ) 
}
export default Layout