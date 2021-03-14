import React from "react";
import Task from "../Task/Task";
import {Button, Col, Container, Row} from "react-bootstrap";
import idGenerator from "../Utils/idGenerator";
import Confirm from "../Confirm/Confirm";
import AddTaskAndEditModal from "../AddTaskAndEditModal/AddTaskAndEditModal";


class ToDo extends React.PureComponent {

    state = {
        tasks: [
            {_id: idGenerator(), title: "Guitar1", description: "description 1"},
            {_id: idGenerator(), title: "Guitar2", description: "description 2"},
            {_id: idGenerator(), title: "Guitar3", description: "description 3"}
        ],

        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        editableTask: null
    }

    toggleOpenAddTaskModal = () => {
        const {isOpenAddTaskModal} = this.state
        this.setState({
            isOpenAddTaskModal: !isOpenAddTaskModal
        })
    }

    toggleOpenConfirm = () => {
        const {isOpenConfirm} = this.state
        this.setState({
            isOpenConfirm: !isOpenConfirm
        })
    }

    handleSubmit = (formData) => {
        const tasks = [...this.state.tasks]
        tasks.push({
            _id: idGenerator(),
            ...formData,
        })
        this.setState({
                tasks
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
    toggleCheckAll = () => {
        const {tasks} = this.state
        let checkedTasks = new Set(this.state.checkedTasks)
        if (tasks.length === checkedTasks.size) {
            checkedTasks.clear();
        } else {
            tasks.forEach(task => {
                checkedTasks.add(task._id);
            });
        }
        this.setState({
            checkedTasks
        });

    }

    setEditableTask = (editableTask) => {
        this.setState({
            editableTask
        });
    }
    removeEditableTask = () => {
        this.setState({
            editableTask: null
        });
    }
    handleEditTask = (editableTask) => {
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex(task => task._id === editableTask._id);
        tasks[idx] = editableTask;
        this.setState({
            tasks
        });

    }


    render() {
        const {checkedTasks, tasks, isOpenAddTaskModal, isOpenConfirm, editableTask} = this.state;
        const tasksJSX = tasks.map(task => {
            return <Col key={task._id}>
                {/*  xs={12} sm={6} md={4} lg={3} */}
                <Task task={task}
                      handleDeleteTask={this.handleDeleteTask}
                      handleToggleCheckTasks={this.handleToggleCheckTasks}
                      isAnyTaskChecked={!!checkedTasks.size}
                      isChecked={checkedTasks.has(task._id)}
                      toggleCheckAll={this.toggleCheckAll}
                      setEditableTask={this.setEditableTask}

                />
            </Col>
        });

        return (
            <>
                <Container>
                    <h2 style={{color: "white"}}>T o D o Component</h2>
                    <Row>
                        <Col className="pt-3 pb-3" style={{backgroundColor: "#343a40"}}>
                            <Button variant="warning" style={{color: " #ffffff"}} onClick={this.toggleOpenAddTaskModal}>Add
                                Task</Button>
                        </Col>
                    </Row>


                    <Row className="pt-3 pb-3 mt-2" style={{backgroundColor: "rgb(52, 58, 64)"}}>
                        <Col>
                            {tasksJSX.length ? tasksJSX : <p style={{color: "white"}}>No tasks!</p>}
                        </Col>

                    </Row>

                    {tasksJSX.length ? <Row className=" mt-2">

                        <Col className="pt-3 pb-3" style={{backgroundColor: "#343a40"}}>

                            <Button style={{backgroundColor: "#343a40"}}
                                    onClick={this.toggleCheckAll}
                            >
                                {this.state.checkedTasks.size === this.state.tasks.length ? "Remove Checked" : "Check All"}
                            </Button>

                            <Button className="ml-3" style={{backgroundColor: "#343a40"}}
                                    variant="danger"
                                    onClick={this.toggleOpenConfirm}
                                    disabled={!!!checkedTasks.size}>
                                Delete All
                            </Button>

                        </Col>
                    </Row> : ""}

                </Container>

                {
                    isOpenConfirm &&
                    <Confirm
                        onHide={this.toggleOpenConfirm}
                        onSubmit={this.handleDeleteCheckedTasks}
                        count={checkedTasks.size}/>
                }

                {
                    isOpenAddTaskModal &&
                    <AddTaskAndEditModal
                        onHide={this.toggleOpenAddTaskModal}
                        isAnyTaskChecked={!!checkedTasks.size}
                        onSubmit={this.handleSubmit}/>
                }

                {
                    editableTask &&
                    <AddTaskAndEditModal
                        onHide={this.removeEditableTask}
                        editableTask={editableTask}
                        onSubmit={this.handleEditTask}
                    />
                }
            </>

        )
    }

}


export default ToDo;


