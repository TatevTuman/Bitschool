import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Row, Col } from "react-bootstrap";
import s from "./Task.module.css"
import { memo } from "react";
import PropTypes from "prop-types";

const Task = ({
    task,
    handleDeleteTask,
    handleToggleCheckTasks,
    isAnyTaskChecked,
    isChecked,
    setEditableTask,
   }) => {

    const cls = [s.tasksBackground]

    return (
        <Container className={cls.join(" ")}>
            <Row  >
                <input onChange={() => handleToggleCheckTasks(task._id)} type="checkbox" checked={isChecked} />
            </Row>

            <Row xs={1} md={2} >
                <Col><h3 style={{ color: "#ffc107" }}>{task.title}</h3> <p style={{ color: "white" }}>{task.description}</p></Col>

                <Col>

                    <Button style={{ backgroundColor: "#343a40" }}
                        variant="info"
                        disabled={isAnyTaskChecked}
                        onClick={() => setEditableTask(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />

                    </Button>

                    <Button style={{ backgroundColor: "#343a40" }} className="ml-2"
                        onClick={() => handleDeleteTask(task._id)}
                        variant="danger"
                        disabled={isAnyTaskChecked}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>




                </Col>
            </Row>

        </Container>

    )
}
Task.propTypes = {
/*    task: PropTypes.shape({
      /!*  _id: PropTypes.string.isRequired,*!/
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleDeleteTask: PropTypes.func.isRequired,
    handleToggleCheckTasks: PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool,
    toggleCheckAll: PropTypes.func*/
}


export default memo(Task);







