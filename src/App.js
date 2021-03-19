import './App.css';
import ToDo from './Components/Pages/ToDo/ToDo';
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import Contact from "./Components/Pages/Contact/Contact";
import {Route, Switch, Redirect} from "react-router-dom";


function App() {
    return (
        <div className="App">

            <NavBar/>
            <Switch>
                <Route path="/" component={ToDo} exact/>
                <Route path="/aboutUs" component={AboutUs} exact/>
                <Route path="/contact" component={Contact} exact/>
                <Redirect to="/"/>
            </Switch>

        </div>
    );
}

export default App;
