import {Component} from "react";
import s from "./AddNewTask.module.css"



class AddNewTask extends Component {

    state = {
        guitar: ["Jumbo", "Ukulele", "Dreadnought",],
        inputValue: "",
    }

    getInputValue = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue: value
        })
    }

    addNewName = () => {
        const {takeInfo} = this.props
        takeInfo(this.state.inputValue);
        const budState = [...this.state.guitar];
        budState.push(this.state.inputValue)
        this.setState({
            guitar: budState,
            inputValue: "",
        })
    }

    render() {
        const myGuitar = this.state.guitar.map((item, index, array) => {
            return <p key={index}>{item}</p>
        })
        return (<div>
            <input type="text" placeholder="Add new guitar " onChange={this.getInputValue}
                   value={this.state.inputValue}/>
            <button onClick={this.addNewName}>Add guitar</button>
            <div className={s.tasks_wrapper}>
                {myGuitar}

            </div>


        </div>)

    }
}

export default AddNewTask;