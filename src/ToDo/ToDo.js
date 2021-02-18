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
            <h2><AddNewTask takeInfo={this.takeInfo}/></h2>
        </div>)

    }
}

export default ToDo