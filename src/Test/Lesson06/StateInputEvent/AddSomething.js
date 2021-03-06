import {Component} from "react";
import s from "./AddSomething.module.css";


class AddSomething extends Component {
    state = {
        tasks: ["task1", "task2", "task3"],
        inputValue:""
    }
    handleChange = (event) => {
        const {value}= event.target;
        this.setState({
            inputValue:value
        })
    }

    handleSubmit=()=>{
        const tasks=[...this.state.tasks];
        tasks.push(this.state.inputValue)
        this.setState({
            tasks:tasks,
            inputValue:""
        })

    }

    render() {
        const tasksJSX = this.state.tasks.map((item, index, array) => {
            return <p key={index}>{item}</p>
        })
        return (
            <div>
                <h1>State Input Event</h1>
                <div>
                    <input type="text" placeholder="Add something" onChange={this.handleChange} value={this.state.inputValue}/>
                    <button onClick={this.handleSubmit} >Add</button>
                </div>
                <div className={s.tasks_wrapper}>
                    {tasksJSX}
                </div>
            </div>
        )
    }
}

export default AddSomething;