import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import Checkout from "../Checkout/Checkout";
import {Button, Card} from "react-bootstrap";


const Task =({task, handleDeleteTask})=> {

    return (
        <Card>
            <Card.Body>
                <Checkout/>
                <Card.Title>{task.title}</Card.Title>
                <Button
                    onClick={(e)=>handleDeleteTask(task._id)}
                    variant="danger"> <FontAwesomeIcon icon={faTrash}/></Button>
                <Button className="ml-1" variant="info"> <FontAwesomeIcon icon={faEdit}/></Button>
            </Card.Body>
        </Card>

    )
}

export default Task;


/*
<div>
    <Checkout/>
    <p>{item.title}</p>
    <FontAwesomeIcon icon={faTrash}/> <FontAwesomeIcon icon={faEdit}/>

</div>
*/






