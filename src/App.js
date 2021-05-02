import './App.css';
import React, {useEffect} from "react";
import NavBar from "./Components/NavBar/NavBar";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import {Route, Switch, Redirect} from "react-router-dom";
import notFound from "./Components/Pages/NotFound/notFound";
import SingleTaskWithRedux from "./Components/Pages/SingleTask/SingleTaskWithRedux";
import ToDoWithRedux from "./Components/Pages/ToDo/ToDoWithRedux";
import ContactFormWithRedux from "./Components/Pages/Contact/ContactFormWithRedux";
import {connect} from "react-redux";
import {ToastContainer, toast} from "react-toastify";


const pages = [
    {
        path: "/",
        component: ToDoWithRedux,
        exact: true
    }, {
        path: "/aboutUs",
        component: AboutUs,
        exact: true
    }, {
        path: "/contact",
        component: ContactFormWithRedux,
        exact: true
    }, {
        path: "/error/:code",
        component: notFound,
        exact: true
    }, {
        path: "/task/:id",
        component: SingleTaskWithRedux,

        exact: true
    },
]

const App = (props) => {

    const {errorMassage,successMessage} = props;

    useEffect(() => {
        errorMassage &&   toast.error(`🤷‍♀️ ${errorMassage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [errorMassage])

    useEffect(() => {
        successMessage &&   toast.success(`👌 ${successMessage}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [successMessage])


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
            <ToastContainer/>

        </div>
    );
}

const mapDispatchToProps = (state) => ({
    errorMassage: state.GlobalState.errorMassage,
    successMessage:state.GlobalState.successMessage,
})
export default connect(mapDispatchToProps, null)(App);
