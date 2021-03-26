import React from "react";
import Task from "../../Task/Task";
import {Button, Col, Container, Row} from "react-bootstrap";
import Confirm from "../../Confirm/Confirm";
import AddTaskAndEditModal from "../../AddAndEditModal/AddAndEditModal";



const API_HOST = "http://localhost:3001";

class ToDo extends React.PureComponent {

    state = {
        tasks: [],

        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        editableTask: null,

    }
    toggleOpenConfirm = () => {
        const {isOpenConfirm} = this.state
        this.setState({
            isOpenConfirm: !isOpenConfirm
        })
    }

    toggleOpenAddTaskModal = () => {
        const {isOpenAddTaskModal} = this.state
        this.setState({
            isOpenAddTaskModal: !isOpenAddTaskModal
        })
    }


    handleSubmit = (formData) => {
        fetch(`${API_HOST}/task`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                const tasks = [...this.state.tasks];
                tasks.push(data);
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.log("Some problem with add task", error)
            })
    }


    handleDeleteTask = (_id) => {

        fetch(`${API_HOST}/task/` + _id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                const tasks = [...this.state.tasks]
                const index = tasks.findIndex(task => task._id === _id);
                tasks.splice(index, 1);
                this.setState({
                    tasks
                });

            })
            .catch(error => {
                console.log("Some problem with delete task", error)
            })

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
        fetch(`${API_HOST}/task`, {
            method: "PATCH",
            body: JSON.stringify({tasks: Array.from(checkedTasks)}),

            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                let tasks = [...this.state.tasks];
                tasks = tasks.filter(task => !checkedTasks.has(task._id));
                this.setState({
                    tasks,
                    checkedTasks: new Set()
                });
            })
            .catch(error => {
                console.log("Some problem with delete checked tasks", error)
            })


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

    componentDidMount() {
        fetch(`${API_HOST}/task`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.setState({
                    tasks: data
                })
            })
            .catch(error => {
                console.log("Some problem getting tasks from base", error)
            })
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

        fetch(`${API_HOST}/task/` + editableTask._id, {
            method: "PUT",
            body: JSON.stringify(editableTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())

            .then(data => {
                if (data.error)
                    throw data.error
                const tasks = [...this.state.tasks];
                const idx = tasks.findIndex(task => task._id === editableTask._id);
                tasks[idx] = editableTask;
                this.setState({
                    tasks
                });

            })
            .catch(error => {
                console.log("Some problem with edit task", error)
            })
    }


    render() {
        const {checkedTasks, tasks, isOpenAddTaskModal, isOpenConfirm, editableTask} = this.state;
        const tasksJSX = tasks.map(task => {
            return <Col key={task._id}>

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
                    <h2 style={{color: "dark"}}>T o D o Component</h2>
                    <Row>
                        <Col className="pt-3 pb-3" style={{backgroundColor: "#343a40"}}>
                            <Button variant="warning"
                                    style={{color: " #ffffff"}}
                                    onClick={this.toggleOpenAddTaskModal}
                                    disabled={!!checkedTasks.size}>
                                Add Task
                            </Button>
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
                    isOpenAddTaskModal && <AddTaskAndEditModal
                        onHide={this.toggleOpenAddTaskModal}
                        isAnyTaskChecked={!!checkedTasks.size}
                        onSubmit={this.handleSubmit}/>

                }

                {
                    editableTask && <AddTaskAndEditModal
                        onHide={this.removeEditableTask}
                        onSubmit={this.handleEditTask}
                        editableTask={editableTask}

                    />
                }



            </>

        )
    }

}


export default ToDo;


