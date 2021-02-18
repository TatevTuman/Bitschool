import {Component} from "react";
import AddNewTask from "./AddNewTask";


class ToDo extends Component {
    state = {
        inputValue: "",
    }

    takeInfo = (value) => {
        this.setState({
            inputValue: value,
        })
    }


    render() {

        return (<div>
            <h1><AddNewTask takeInfo={this.takeInfo}/></h1>
        </div>)

    }
}

export default ToDo