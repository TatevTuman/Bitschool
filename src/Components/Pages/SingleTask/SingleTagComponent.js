import SingleTaskWithContext from "./SingleTaskWithContext";
import SingleTaskProvider from "../../../Context/Providers/SingleTaskProvider";
import React from "react";
import SingleTaskWithReducer from "./SingleTaskWithReducer";

const SingleTaskComponent=(props)=> {
    return (

        /* <SingleTaskProvider>
         <SingleTaskWithContext {...props}/>
     </SingleTaskProvider>*/
        <SingleTaskWithReducer {...props}/>

    )
}

export default SingleTaskComponent;