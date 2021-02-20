import {Component} from "react";
import s from "./AddNewTask.module.css"

import guitarClassic from "../Photo/guitarClassic.jpg"
import guitarRed from "../Photo/guitarRed.jpg"
import ukulClassic from "../Photo/ukulClassic.jpg"
import ukulYellow from "../Photo/ukulYellow.jpg"


class AddNewTask extends Component {

    state = {
        guitar: [
            {name: " TERRIS TF-3802С RD", strings: 6, photo: <img src={guitarRed}/>},
            {name: " Doff RG Guitar ", strings: 7, photo: <img src={guitarClassic}/>},
            {name: " Укулеле JUS 20 MAYA Afro", strings: 4, photo: <img src={ukulClassic}/>},
            {name: " Укулеле PLUS-50 YW   ", strings: 4, photo: <img src={ukulYellow}/>}
        ],
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
        console.log({budState});
    }

    render() {
        const myGuitar = this.state.guitar.map((item, index, array) => {
            return (
                <div key={index}>{item.name} {item.photo} </div>
            )

        })
        return (<div className={s.allBody}>

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