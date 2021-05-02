import React, {useEffect, useRef} from "react";
import {Component, createRef} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import formatDate from "../../Utils/formatDate"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {changeModalDate, changeModalInput, resetTaskModalState, setEditableTaskToModalState} from "../../Redux/Action";

const AddAndEditModal = (props) => {


    const {
        //state
        editableTask,
        //functions
        onHide,
        changeModalInput,
        changeModalDate,
        setEditableTaskToModalState,
        onSubmit,
        resetTaskModalState
    } = props;
    const {
        title,
        description,
        date
    } = props.state;
    const inputRef = useRef(null);
    const handleS = ({key, type}) => {
        if (
            !title ||
            !description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;
        const formData = {
            ...props.state,
            date: formatDate(date)
        }
        onSubmit(formData);

    }
    useEffect(() => {
        editableTask && setEditableTaskToModalState(editableTask);
        inputRef.current.focus();
        return () => {
            resetTaskModalState();
        }
    }, [setEditableTaskToModalState, editableTask])
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
                            onChange={(e) => changeModalInput(e.target)}
                            onKeyPress={handleS}
                            ref={inputRef}
                            value={title}
                            //disabled={isAnyTaskChecked}

                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            name="description"
                            as="textarea"
                            rows={3}
                            style={{resize: "none"}}
                            placeholder="Description"
                            onChange={(e) => changeModalInput(e.target)}
                            value={description}
                            // disabled={isAnyTaskChecked}

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
                        onClick={handleS}
                        disabled={!title || !description}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>)

}

AddAndEditModal.propTypes = {
    isAnyTaskChecked: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    editableTask: PropTypes.object
}

const mapStateToProps = (state) => {

    return {
        state: state.AddAndEditModalState
    }
}
const mapDispatchToProps = {
    changeModalInput,
    changeModalDate,
    setEditableTaskToModalState,
    resetTaskModalState
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAndEditModal);