import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import {Button, Card} from "react-bootstrap";
import s from "./Task.module.css"
import {memo} from "react";
import WithScreenSize from "../Hoc/WithScreenSize";
import PropTypes from "prop-types";

const Task = ({task, handleDeleteTask, handleToggleCheckTasks, isAnyTaskChecked, isChecked, ...props}) => {

    const cls = [s.tasksBackground]
    if (isChecked) {
        cls.push(s.checkedBackground)
    }
    return (
        <Card className={cls.join(" ")}>
            <input onChange={() => handleToggleCheckTasks(task._id)} type="checkbox" checked={isChecked}/>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Title>{task.description}</Card.Title>

                <Button
                    onClick={() => handleDeleteTask(task._id)}
                    variant="danger"
                    disabled={isAnyTaskChecked}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>

                <Button className="ml-1"
                        variant="info"
                        disabled={isAnyTaskChecked}>
                    <FontAwesomeIcon icon={faEdit}/>

                </Button>

            </Card.Body>
        </Card>

    )
}
Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleDeleteTask: PropTypes.func.isRequired,
    handleToggleCheckTasks:PropTypes.func.isRequired,
    isAnyTaskChecked: PropTypes.bool.isRequired,
    isChecked:PropTypes.bool ,
    toggleCheckAll: PropTypes.func
}


export default WithScreenSize(memo(Task));







