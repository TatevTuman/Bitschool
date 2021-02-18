import {Component} from "react";


class B extends Component {
    state = {
        inputValue: "",
    }
    handlesChange = (event) => {
        const {value} = event.target
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


    handleSub=()=>{
        const {handlesSubmit} = this.props
        handlesSubmit(this.state.inputValue)

    }
    render() {

        return (
            <div>
                <h1>B component</h1>
                <div>
                    <input type="text" placeholder="Add something" onChange={this.handlesChange}
                           value={this.state.inputValue}/>
                    <button onClick={this.handleSub}>Add</button>
                </div>
            </div>
        )
    }

}

export default B;