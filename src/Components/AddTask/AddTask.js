import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";


class AddTask extends Component {

    state = {
        inputValue: "",

    }

    handleChange = (event) => {
        const {value} = event.target;
        this.setState({
            inputValue: value

        })
    }


    handleButton = () => {
        if (!this.state.inputValue)
            return
        this.props.handleSubmit(this.state.inputValue)
        this.setState({
            inputValue: ""
        })

    }

    addAllTexts = (event) => {
        if (event.key === "Enter") {
            this.handleButton();
        }
    }

    render() {
        const {isAnyTaskChecked} = this.props

        return (<div>

            <Form.Group controlId="tat">
                <Form.Control type="text" placeholder="Add new guitar" onChange={this.handleChange}
                              onKeyPress={this.addAllTexts}
                              value={this.state.inputValue}
                              disabled={isAnyTaskChecked}/>
            </Form.Group>
            <Button variant="info"
                    onClick={this.handleButton}
            disabled={isAnyTaskChecked}>
                Add guitar
            </Button>


        </div>)

    }
}

export default AddTask;







