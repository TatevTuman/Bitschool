import React from "react";
import Task from "../../Task/Task";
import {Button, Col, Container, Row} from "react-bootstrap";
import Confirm from "../../Confirm/Confirm";
import AddTaskAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";
import {connect} from "react-redux";
import types from "../../../Redux/ActionTypes";
import {
    getTasksThunk,
    addTaskThunk,
    deleteOneTaskThunk,
    deleteCheckedTasksThunk,
    editOneTaskThunk,
} from "../../../Redux/Action"


class ToDoWithRedux extends React.PureComponent {

    componentDidMount() {
        this.props.getTasks()
    }
    setEditableTask = (editableTask) => {
        this.props.setEditOneTask(editableTask)
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

                      handleDeleteTask={this.props.deleteOneTask}
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
                        onSubmit={()=>this.props.deleteCheckedTasks(checkedTasks)}
                        count={checkedTasks.size}/>
                }
                {
                    isOpenAddTaskModal && <AddTaskAndEditModal
                        onHide={this.props.toggleOpenAddTaskModal}
                        isAnyTaskChecked={!!checkedTasks.size}
                        onSubmit={this.props.addTask}

                    />

                }
                {
                    editableTask && <AddTaskAndEditModal
                        onSubmit={this.props.editOneTask}
                        editableTask={editableTask}
                        onHide={this.props.unsSetEditableTask}
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
        toggleOpenAddTaskModal: () => {
            dispatch({type: types.TOGGLE_OPEN_ADD_TASK_MODAL });
        },
        toggleConfirmModal: () => {
            dispatch({type: types.TOGGLE_CONFIRM_MODAL });
        },
        toggleChekTasks: (_id) => {
            dispatch({type: types.TOGGLE_CHECK_TASK, _id});
        },
        toggleCheckAll: () => {
            dispatch({type: types.TOGGLE_CHECK_ALL });
        },
        // new
        getTasks: () => {
            dispatch(getTasksThunk)
        },
        addTask: (data) => {
            dispatch((dispatch) => addTaskThunk(dispatch, data))
        },
        deleteOneTask: (_id) => {
            dispatch((dispatch) => deleteOneTaskThunk(dispatch, _id))
        },
        deleteCheckedTasks: (checkedTasks) => {
            dispatch((dispatch) => deleteCheckedTasksThunk(dispatch, checkedTasks))
        },
        editOneTask: (data) => {
            dispatch((dispatch) => editOneTaskThunk(dispatch, data))
        },
       //оld
        setEditOneTask: (data) => {
            dispatch({type: types.SET_EDIT_TASK , data})
        },
        unsSetEditableTask: () => {
            dispatch({type: types.SET_EDIT_TASK, action: null})
        },

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoWithRedux);


