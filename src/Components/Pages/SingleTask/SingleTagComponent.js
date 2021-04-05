import SingleTaskWithContext from "./SingleTaskWithContext";
import SingleTaskProvider from "../../../Context/Providers/SingleTaskProvider";
import React from "react";

const SingleTaskComponent=(props)=>{
    return (<SingleTaskProvider>
        <SingleTaskWithContext {...props}/>
    </SingleTaskProvider>)
}

export default SingleTaskComponent;