import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import {Button, Col, Container, Row} from "react-bootstrap";
import idGenerator from "../Utils/idGenerator";


class ToDo extends React.PureComponent {
    state = {
        tasks: [
            {_id: idGenerator(), title: "Guitar1"},
            {_id: idGenerator(), title: "Guitar2"},
            {_id: idGenerator(), title: "Guitar3"}
        ],

        checkedTasks: new Set(),

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
        /*   let checkedTasks = {...this.state.checkedTasks}*/
        let checkedTasks = new Set(this.state.checkedTasks);
        if (!checkedTasks.has(_id)) {
            checkedTasks.add(_id)
        } else {
            checkedTasks.delete(_id)
        }
        this.setState({
            checkedTasks
        })
    }


    handleDeleteCheckedTasks = () => {
        const {checkedTasks} = this.state;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !checkedTasks.has(task._id));
        this.setState({
            tasks,
            checkedTasks: new Set()
        });

    }
    handleToggleCheckAllTasks = () => {
        if (this.state.checkedTasks.size <= this.state.tasks.length) {
            let tasks = [...this.state.tasks]
            tasks = tasks.map(task => task._id)
            this.setState({
                checkedTasks: new Set(tasks)
            })
        }
        if (this.state.checkedTasks.size >= this.state.tasks.length) {
            this.setState({
                checkedTasks: new Set()
            })
        }
    }

    render() {
        const {checkedTasks, tasks} = this.state;
        const tasksJSX = tasks.map(task => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                <Task task={task}
                      handleDeleteTask={this.handleDeleteTask}
                      handleToggleCheckTasks={this.handleToggleCheckTasks}
                      isAnyTaskChecked={!!checkedTasks.size}
                      isChecked={checkedTasks.has(task._id)}
                      handleToggleCheckAllTasks={this.handleToggleCheckAllTasks}
                />
            </Col>
        });
        return (

            <Container>
                <h1> T o D o Component</h1>
                <Row>
                    <Col>
                        <AddTask handleSubmit={this.handleSubmit}
                                 isAnyTaskChecked={!!checkedTasks.size}/>
                    </Col>
                </Row>

                <Row className={guitarWrapperRow.join(" ")}>
                    {tasksJSX.length ? tasksJSX : <p>No tasks!</p>}
                </Row>

                {tasksJSX.length ? <Row className="justify-content-center mt-5">
                    <Button variant="danger"
                            onClick={this.handleDeleteCheckedTasks}
                            disabled={!!!checkedTasks.size}>
                        Delete All
                    </Button>
                    <Button className="ml-3"
                            onClick={this.handleToggleCheckAllTasks}>
                        {this.state.checkedTasks.size === this.state.tasks.length ? "Remove Checked" : "Check All"}

                    </Button>
                </Row> : ""}

            </Container>)
    }

}

const guitarWrapperRow = [
    "mt-5",
    "d-flex justify-content-center",
]

export default ToDo;


