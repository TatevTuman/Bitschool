import {Component} from "react";
import C from "./C";
import B from "./B";


class A extends Component {
    state = {
        inputValue: "",
    }

    handlesSubmit = (value) => {
        this.setState({
            inputValue: value,

        })
    }

    render() {
        return (
            <div>
                <h1>A component</h1>
                <B handlesSubmit={this.handlesSubmit}/>
                <C result={this.state.inputValue}/>
            </div>
        )
    }

}

export default A;