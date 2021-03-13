import React from "react";
import Task from "../Task/Task";
import { Button, Col, Container, Row } from "react-bootstrap";
import idGenerator from "../Utils/idGenerator";
import WithScreenSize from "../Hoc/WithScreenSize";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import Confirm from "../Confirm/Confirm";


class ToDo extends React.PureComponent {

    state = {
        tasks: [
            { _id: idGenerator(), title: "Guitar1", description: "description 1" },
            { _id: idGenerator(), title: "Guitar2", description: "description 2" },
            { _id: idGenerator(), title: "Guitar3", description: "description 3" }
        ],

        checkedTasks: new Set(),
        isOpenAddTaskModal: false,
        isOpenConfirm: false,

    }

    toggleOpenAddTaskModal = () => {
        const { isOpenAddTaskModal } = this.state
        this.setState({
            isOpenAddTaskModal: !isOpenAddTaskModal
        })

    }

    toggleOpenConfirm = () => {
        const { isOpenConfirm } = this.state
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
        const { checkedTasks } = this.state;
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(task => !checkedTasks.has(task._id));
        this.setState({
            tasks,
            checkedTasks: new Set()
        });





    }
    toggleCheckAll = () => {
        const { tasks } = this.state
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

    render() {
        const { checkedTasks, tasks, isOpenAddTaskModal, isOpenConfirm } = this.state;
        const tasksJSX = tasks.map(task => {
            return <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                <Task task={task}
                    handleDeleteTask={this.handleDeleteTask}
                    handleToggleCheckTasks={this.handleToggleCheckTasks}
                    isAnyTaskChecked={!!checkedTasks.size}
                    isChecked={checkedTasks.has(task._id)}
                    toggleCheckAll={this.toggleCheckAll}
                />
            </Col>
        });

        return (
            <>
                <Container>
                    <h1>T o D o Component</h1>
                    <Row>
                        <Col>
                            <Button onClick={this.toggleOpenAddTaskModal}>Add Task</Button>
                        </Col>
                    </Row>


                    <Row className={guitarWrapperRow.join(" ")}>
                        {tasksJSX.length ? tasksJSX : <p>No tasks!</p>}
                    </Row>

                    {tasksJSX.length ? <Row className="justify-content-center mt-5">
                        <Button
                            variant="danger"
                            onClick={this.toggleOpenConfirm}
                            disabled={!!!checkedTasks.size}>
                            Delete All
                    </Button>
                        <Button className="ml-3"
                            onClick={this.toggleCheckAll}


                        >
                            {this.state.checkedTasks.size === this.state.tasks.length ? "Remove Checked" : "Check All"}

                        </Button>
                    </Row> : ""}

                </Container>
                {isOpenAddTaskModal &&
                    <AddTaskModal
                        onHide={this.toggleOpenAddTaskModal}
                        isAnyTaskChecked={!!checkedTasks.size}
                        handleSubmit={this.handleSubmit} />}

                {isOpenConfirm &&
                    <Confirm
                        onHide={this.toggleOpenConfirm}
                        onSubmit={this.handleDeleteCheckedTasks} 
                        count= {checkedTasks.size}/>}


            </>

        )
    }

}

const guitarWrapperRow = [
    "mt-5",
    "d-flex justify-content-center",
]


export default WithScreenSize(ToDo);


