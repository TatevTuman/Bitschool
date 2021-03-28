import './App.css';
import ToDo from './Components/Pages/ToDo/ToDo';
import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import Contact from "./Components/Pages/Contact/Contact";
import {Route, Switch, Redirect} from "react-router-dom";
import notFound from "./Components/Pages/NotFound/notFound";
import SinglePage from "./Components/Pages/SingleTask/SingleTask";



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
            component: Contact,
            exact: true
        }, {
            path: "/404",
            component: notFound,
            exact: true
        },{
            path: "/task/:id",
            component: SinglePage,
            exact: true
        },
    ]
    const page = pages.map((onePage, index) => {
        return (
            <Route key={index} path={onePage.path} component={onePage.component} exact={onePage.exact}/>
        )
    })
    return (
        <div className="App">

            <NavBar/>

            <Switch>
                {page}
                <Redirect to="/404"/>
            </Switch>

        </div>
    );
}

export default App;
