import {Component} from "react";
import s from "./MyToDo.module.css";


class MyToDo extends Component {
    state = {
        tasks: ["Task1", "Task2", "Task3",],
        inputValue: "",
    }

    inputChange = (event) => {
        const {value} = event.target
        this.setState({
            inputValue: value

        })
        /*  console.log({value});*/
    }

    addInputValue = () => {
        const dubState = [...this.state.tasks];
        dubState.push(this.state.inputValue)
        this.setState({
            tasks:dubState,
            inputValue: "",
        })
    }



    render() {
        const data = this.state.tasks.map((item, index, array) => {
            return <p key={index}>{item}</p>
        })


        return (
            <div>
                <h1>ToDo</h1>
                <input type="text" placeholder="Add something" onChange={this.inputChange} value={this.state.inputValue}/>
                <button onClick={this.addInputValue}>Add</button>
                <div className={s.tasks_wrapper}>
                    {data}
                </div>

            </div>
        )
    }
}

export default MyToDo;