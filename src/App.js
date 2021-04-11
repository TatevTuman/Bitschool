import './App.css';
import ToDo from './Components/Pages/ToDo/ToDo';
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import {Route, Switch, Redirect} from "react-router-dom";
import notFound from "./Components/Pages/NotFound/notFound";
import ContactFormWithHooks from "./Components/Pages/Contact/ContactFormWithHooks";

import SingleTaskComponent from "./Components/Pages/SingleTask/SingleTagComponent";
import Counter from "./DEMO/Demo";


function App() {
    const pages = [
        {
            path: "/",
            component: ToDo,
            exact: true
        }, {
            path: "/aboutUs",
            component: AboutUs,
            exact: true
        }, {
            path: "/contact",
            component: ContactFormWithHooks,
            exact: true
        }, {
            path: "/error/:code",
            component: notFound,
            exact: true
        }, {
            path: "/task/:id",
            component: SingleTaskComponent,

            exact: true
        },
    ]
    const page = pages.map((onePage, index) => {

        return (
            <Route
                key={index}
                path={onePage.path}
                component={onePage.component}
                exact={onePage.exact}
            />
        )
    })
    return (
        <div className="App">

            <NavBar/>
            <Switch>
                {page}
                <Redirect to="/error/404"/>
            </Switch>
{/*<Counter/>*/}

        </div>
    );
}

export default App;
