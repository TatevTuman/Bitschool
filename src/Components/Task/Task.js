import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import {Button, Card} from "react-bootstrap";
import s from "./Task.module.css"
import {memo} from "react";


const Task = ({task, handleDeleteTask, handleToggleCheckTasks, isAnyTaskChecked , isChecked}) => {
    console.log("Task works" + task._id)
const cls = [s.tasksBackground]
    if(isChecked){
        cls.push(s.checkedBackground)
    }
    return (
        <Card className={cls.join(" ")}>
            <input onClick={() => handleToggleCheckTasks(task._id)} type="checkbox"/>
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>

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

export default memo(Task);







