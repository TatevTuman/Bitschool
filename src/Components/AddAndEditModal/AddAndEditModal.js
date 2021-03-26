import React from "react";
import {Component, createRef} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import formatDate from "../../Utils/formatDate"
import PropTypes from "prop-types";

class AddAndEditModal extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();

        this.state = {
            title: "",
            description: "",
            ...props.editableTask,
            date: props.editableTask ? new Date(props.editableTask.date) : new Date()

        }
    }


    setDate = (date) => {
        this.setState({
            date
        });
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value

        })
    }
    handleButton = ({key, type}) => {
        const {title, description} = this.state
        if (!title || !description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return
        const formData = {
            ...this.state,
            date: formatDate(this.state.date)
        }
        this.props.onSubmit(formData);
        this.props.onHide();
    }


    componentDidMount() {
        this.inputRef.current.focus();

    }

    render() {
        const {onHide, isAnyTaskChecked, editableTask} = this.props;
        const {title, description, date} = this.state;

        return (
            <div>
                <Modal
                    show={true}
                    onHide={onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {editableTask ? "Edit task modal" : "Add task modal"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="tat">
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="Title"
                                onChange={this.handleChange}
                                onKeyPress={this.handleButton}
                                value={title}
                                ref={this.inputRef}
                                disabled={isAnyTaskChecked}

                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{resize: "none"}}
                                placeholder="Description "
                                onChange={this.handleChange}
                                value={description}
                                disabled={isAnyTaskChecked}

                            />
                        </Form.Group>

                        <Form.Group>
                            <DatePicker
                                selected={date}
                                onChange={date => this.setDate(date)}/>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}>Close</Button>
                        <Button
                            onClick={this.handleButton}
                            disabled={isAnyTaskChecked}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>)
    }
}

AddAndEditModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    editableTask: PropTypes.object
}


export default AddAndEditModal;