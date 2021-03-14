import React from "react";
import { Component} from "react";
import { Modal, Button, Form } from "react-bootstrap";


class EditTaskModal extends Component {
    constructor(props) {
        super(props);
     /*   this.titleInputRef = createRef(null);*/
        this.state = {
            ...props.editableTask
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value

        });
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

    componentDidMount() {
        this.titleInputRef.current.focus();
    }

    render() {
        const { onHide } = this.props
        const { title, description } = this.state;
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
                                value={title}
                                ref={this.titleInputRef}

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
                                value={description}
                             

                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onHide}>Close</Button>
                        <Button
                          /*  onClick={onHide}*/
                            onClick={this.handleButton}
                        >
                            Edit
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

EditTaskModal.propTypes = {

}


