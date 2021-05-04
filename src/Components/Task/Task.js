import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faCheck, faHourglass} from '@fortawesome/free-solid-svg-icons';
import {Button, Container, Row, Col} from "react-bootstrap";
import s from "./Task.module.css"
import {memo} from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

const Task = ({
                  task,
                  handleDeleteTask,
                  handleToggleCheckTasks,
                  isAnyTaskChecked,
                  isChecked,
                  setEditableTask,
                  toggleStatus,
                  ...props
              }) => {

    const cls = [s.tasksBackground]

    return (
        <Container className={cls.join(" ")}>
            <Row>
                <input onChange={() => handleToggleCheckTasks(task._id)} type="checkbox" checked={isChecked}/>
            </Row>

            <Row xs={1} md={2}>
                <Col><Link to={"/task/" + task._id}><h3 style={{color: "#ffc107"}}>{task.title}</h3></Link>
                    <p style={{color: "white"}}>{task.description}</p>
                    <p style={{color: "white"}}> {task.date.slice(0, 10)}</p>
                </Col>

                <Col>

                    <Button style={{backgroundColor: "#343a40"}}
                            variant="info"
                            disabled={isAnyTaskChecked}
                            onClick={() => setEditableTask(task)}
                    >
                        <FontAwesomeIcon icon={faEdit}/>

                    </Button>

                    <Button style={{backgroundColor: "#343a40"}} className="ml-2"
                            onClick={() => handleDeleteTask(task._id)}
                            variant="danger"
                            disabled={isAnyTaskChecked}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                    <Button style={{backgroundColor: "#343a40"}} className="ml-2"
                            onClick={()=>toggleStatus(task)}

                            variant={task.status === "done" ? "success" : "secondary"}
                    >
                        {task.status === "done" && <FontAwesomeIcon icon={faCheck}/>}
                        {task.status === "active" && <FontAwesomeIcon icon={faHourglass}/>}

                    </Button>

                </Col>
            </Row>

        </Container>
    )

}
Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }),
    handleDeleteTask: PropTypes.func.isRequired,
    handleToggleCheckTasks: PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool,
    toggleCheckAll: PropTypes.func,
    setEditableTask: PropTypes.func
}

export default withRouter(memo(Task));







