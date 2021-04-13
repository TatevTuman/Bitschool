import React from "react";
import Task from "../../Task/Task";
import {Button, Col, Container, Row} from "react-bootstrap";
import Confirm from "../../Confirm/Confirm";
import AddTaskAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";
import {connect} from "react-redux";


const API_HOST = "http://localhost:3001";

class ToDoWithRedux extends React.PureComponent {

    handleSubmit = (formData) => {
        this.props.setOrRemLoading(true);
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
                this.props.addTask(data)
            })
            .catch(error => {
                console.log("Some problem with add task", error)
            })
            .finally(() => {
                this.props.setOrRemLoading(false);
            });


    }

    handleDeleteTask = (_id) => {
        this.props.setOrRemLoading(true);
        fetch(`${API_HOST}/task/` + _id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.props.deleteOneTask(_id)
            })
            .catch(error => {
                console.log("Some problem with delete task", error)
            })
            .finally(() => {
                this.props.setOrRemLoading(false);
            })

    }

    handleDeleteCheckedTasks = () => {
        this.props.setOrRemLoading(true);
        const {checkedTasks} = this.props;
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
                this.props.deleteCheckedTasks();
            })
            .catch(error => {
                console.log("Some problem with delete checked tasks", error)
            })
            .finally(() => {
                this.props.setOrRemLoading(false);
            })

    }

    componentDidMount() {
        this.props.setOrRemLoading(true);
        fetch(`${API_HOST}/task`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                /*  this.setState({
                      tasks: data
                  })*/
                this.props.getTasks(data);

            })
            .catch(error => {
                console.log("Some problem getting tasks from base", error)
            })
            .finally(() => {
                this.props.setOrRemLoading(false);
            })
    }

    setEditableTask = (editableTask) => {
        this.props.setEditableTask2(editableTask)
    }


    handleEditTask = (editableTask) => {
        this.setState({loading: true});
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
                this.props.editOneTask(data)

            })
            .catch(error => {
                console.log("Some problem with edit task", error)
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        const {
            tasks,
            loading,
            isOpenAddTaskModal,
            checkedTasks,
            isOpenConfirm,
            editableTask,

        } = this.props;

        const tasksJSX = tasks.map(task => {
            return <Col key={task._id}>

                <Task task={task}
                      handleDeleteTask={this.handleDeleteTask}
                      handleToggleCheckTasks={this.props.toggleChekTasks}
                      isAnyTaskChecked={!!checkedTasks.size}
                      isChecked={checkedTasks.has(task._id)}
                      toggleCheckAll={this.props.toggleCheckAll}
                      setEditableTask={this.setEditableTask}
                />
            </Col>
        });
        return (
            <>
                <Container>
                    <h2 style={{color: "dark"}}>T o D o Component with redux</h2>
                    <Row>
                        <Col className="pt-3 pb-3" style={{backgroundColor: "#343a40"}}>
                            <Button variant="warning"
                                    style={{color: " #ffffff"}}
                                    onClick={this.props.toggleOpenAddTaskModal}
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
                                    onClick={this.props.toggleCheckAll}
                            >
                                {this.props.checkedTasks.size === this.props.tasks.length ? "Remove Checked" : "Check All"}
                            </Button>

                            <Button className="ml-3" style={{backgroundColor: "#343a40"}}
                                    variant="danger"
                                    onClick={this.props.toggleConfirmModal}
                                    disabled={!!!checkedTasks.size}>
                                Delete All
                            </Button>

                        </Col>
                    </Row> : ""}


                </Container>

                {
                    isOpenConfirm &&
                    <Confirm
                        onHide={this.props.toggleConfirmModal}
                        onSubmit={this.handleDeleteCheckedTasks}
                        count={checkedTasks.size}/>
                }

                {
                    isOpenAddTaskModal && <AddTaskAndEditModal
                        onHide={this.props.toggleOpenAddTaskModal}
                        isAnyTaskChecked={!!checkedTasks.size}
                        onSubmit={this.handleSubmit}/>

                }

                {
                    editableTask && <AddTaskAndEditModal
                        onSubmit={this.handleEditTask}
                        editableTask={editableTask}

                    />
                }
                {
                    loading && <Spinner/>
                }


            </>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        isOpenAddTaskModal,
        tasks,
        checkedTasks,
        isOpenConfirm,
        editableTask

    } = state.ToDoState
    return {
        tasks,
        loading: state.loading,
        isOpenAddTaskModal,
        checkedTasks,
        isOpenConfirm,
        editableTask


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTasks: (data) => {
            dispatch({type: "GET_TASKS", data});
        },
        deleteOneTask: (_id) => {
            dispatch({type: "DELETE_ONE_TASK", _id});
        },
        setOrRemLoading: (isLoading) => {
            dispatch({type: "SET_OR_REMOVE_LOADING", isLoading});
        },
        toggleOpenAddTaskModal: () => {
            dispatch({type: "TOGGLE_OPEN_ADD_TASK_MODAL"});
        },
        addTask: (data) => {
            dispatch({type: "ADD_TASK", data});
        },
        toggleConfirmModal: () => {
            dispatch({type: "TOGGLE_CONFIRM_MODAL"});
        },

        toggleChekTasks: (_id) => {
            dispatch({type: "TOGGLE_CHECK_TASK", _id});
        },
        deleteCheckedTasks: () => {
            dispatch({type: "DELETE_CHECKED_TASKS"})
        },
        toggleCheckAll: () => {
            dispatch({type: "TOGGLE_CHECK_ALL"});

        },
        editOneTask: (data) => {
            dispatch({type: "EDIT", data})
        },
        setEditableTask2:(data)=>{
            dispatch({type:"SET_EDIT_TASK", data})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWithRedux);


