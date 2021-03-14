import React from "react";
import { Component, createRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes, { bool } from "prop-types";

class AddTaskAndEditModal extends Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.titleInputRef = createRef(null);
        this.state = {
            title: "",
            description: "",
            ...props.editableTask
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value

        })
    }
    handleButtonForAdd = ({key, type}) => {
        const { title, description } = this.state
        if (!title || !description ||
            (type === 'keypress' && key !== 'Enter')
            )
            return
        const formData = {
            title,
            description,
        }
        this.props.handleSubmit(formData)
        this.props.onHide();
    }

    componentDidMount() {
        this.inputRef.current.focus();
   

    }
    handleButton = ({key, type}) => {
        const { title, description } = this.state
        if (!title || !description ||
            (type === 'keypress' && key !== 'Enter')
            )
            return
     
        this.props.onSubmit(this.state)
        this.props.onHide();
    }

    render() {
        const { onHide, isAnyTaskChecked } = this.props
        return (
        <div>

            {this.props.editableTask?
                <div>
                <Modal
                    show={true}
                    onHide={this.onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit task modal
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
                                value={this.state.title}
                                ref={this.inputRef}

                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{ resize: "none" }}
                                placeholder="Description "
                                onChange={this.handleChange}
                                value={this.state.description}
                             

                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}>Close</Button>
                        <Button

                            onClick={this.handleButton}
                        >
                            Edit
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>    : 
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
                        Add task modal
    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="tat">
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={this.state.title}
                            disabled={isAnyTaskChecked}
                            ref={this.inputRef}

                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows={3}
                            style={{ resize: "none" }}
                            placeholder="Description "
                            onChange={this.handleChange}
                            value={this.state.description}
                            disabled={isAnyTaskChecked}

                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Close</Button>
                    <Button

                        onClick={this.handleButtonForAdd}
                        disabled={isAnyTaskChecked}
                    >
                        Add
                        </Button>
                </Modal.Footer>
            </Modal>
        </div>  }


           
        </div>)
    }
}

AddTaskAndEditModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    editableTask:bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
}


export default AddTaskAndEditModal;