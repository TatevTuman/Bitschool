import React, {Component} from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import {Col, Container, Row} from "react-bootstrap";
import s from "./ToDo.module.css";
import idGenerator from "../Utils/idGenerator";


class ToDo extends Component {
    state = {
        tasks: [
            {_id: idGenerator(), title: "Guitar1"},
            {_id: idGenerator(), title: "Guitar2"},
            {_id: idGenerator(), title: "Guitar3"}
        ]
    }

    handleSubmit = (value) => {
        const tasks = [...this.state.tasks]
        tasks.push({
            _id: idGenerator(),
            title: value,
        })
        this.setState({
                tasks: tasks,
            }
        )
    }

    handleDeleteTask = (_id) => {
        const tasks = [...this.state.tasks]
        const index = tasks.findIndex(task => task._id === _id);
        tasks.splice(index, 1);
        this.setState({
            tasks
        });
    }

    render() {
        const tasksJSX = this.state.tasks.map(task => {
            return <Col key={task._id} className={s.guitarsList} xs={12} sm={6} md={4} lg={3}>
                <Task task={task}
                      handleDeleteTask={this.handleDeleteTask}
                /></Col>
        });
        return (
            <Container>
                <h1> T o D o Component</h1>
                <Row>
                    <Col>
                        <AddTask handleSubmit={this.handleSubmit}/>
                    </Col>
                </Row>

                <Row className={guitarWrapperRow.join(" ")}>
                    {tasksJSX}
                </Row>

            </Container>)
    }

}

const guitarWrapperRow = [
    "mt-5",
    "d-flex justify-content-center",
]

export default ToDo;


