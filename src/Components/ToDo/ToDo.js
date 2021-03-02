import React, {Component} from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import {Button, Col, Container, Row} from "react-bootstrap";
import idGenerator from "../Utils/idGenerator";


class ToDo extends Component {
    state = {
        tasks: [
            {_id: idGenerator(), title: "Guitar1"},
            {_id: idGenerator(), title: "Guitar2"},
            {_id: idGenerator(), title: "Guitar3"}
        ],
       /* checkedTasks: [],*/
        checkedTasks: [],
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

    handleToggleCheckTasks = (_id) => {
        let checkedTasks = [...this.state.checkedTasks]
        if (!checkedTasks.includes(_id)) {
            checkedTasks.push(_id)
        } else {
            checkedTasks = checkedTasks.filter(taskId => taskId !== _id)
        }
        this.setState({
            checkedTasks
        })
        console.log(checkedTasks);
    }


    handleDeleteCheckedTasks = () => {

        const {checkedTasks} = this.state;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !checkedTasks.includes(task._id));
        this.setState({
            tasks,
            checkedTasks: []
        });

    }


    render() {
        const {checkedTasks, tasks} = this.state;
        const tasksJSX = tasks.map(task => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                <Task task={task}
                      handleDeleteTask={this.handleDeleteTask}
                      handleToggleCheckTasks={this.handleToggleCheckTasks}
                      isAnyTaskChecked={!!checkedTasks.length}
                      isChecked={checkedTasks.includes(task._id)}
                />
            </Col>
        });
        return (
            <Container>
                <h1> T o D o Component</h1>
                <Row>
                    <Col>
                        <AddTask handleSubmit={this.handleSubmit}
                                 isAnyTaskChecked={!!checkedTasks.length}/>
                    </Col>
                </Row>

                <Row className={guitarWrapperRow.join(" ")}>
                    {tasksJSX.length ? tasksJSX : <p>No tasks!</p>}
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button variant="danger"
                            onClick={this.handleDeleteCheckedTasks}
                            disabled={!!!checkedTasks.length}>
                        Delete All
                    </Button>
                </Row>

            </Container>)
    }

}

const guitarWrapperRow = [
    "mt-5",
    "d-flex justify-content-center",
]

export default ToDo;

