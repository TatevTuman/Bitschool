import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import s from "./SingleTask.module.css"
import AddAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";
import {singleTaskContext} from "../../../Context/Contexts";
import {connect} from "react-redux";


const API_HOST = "http://localhost:3001";

class SingleTaskWithRedux extends Component {

    handleEditSingleTask = (editTask) => {
        this.props.setOrRemLoading(true)
        const id = editTask._id;
        fetch(`${API_HOST}/task/${id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error

                this.props.getSingleTask(data)
                this.props.toggleEditModal()
            })
            .catch(error => {
                console.log("Some problem with EdiT Single Task", error)
            })
            .finally(() => {
                this.props.setOrRemLoading(false)
            })
    }

    handleDeleteSingleTask = () => {
        this.props.setOrRemLoading(true)
        const id = this.props.singleTask._id;
        fetch(`${API_HOST}/task/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.props.history.push("/")
            })
            .catch(error => {
                this.props.setOrRemLoading(false)
                console.log("Some problem with delete single task", error)
            })
    }

    goBackFromSingleTask = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.props.setOrRemLoading(true)
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.props.getSingleTask(data)
                this.props.setOrRemLoading(false)

            })
            .catch(error => {
                console.log("Some problem with single page", error)
                this.props.history.push("/error/" + error.status)

            })
    }

    render() {
        const {
            singleTask,
            loading,
            isEditModal,
            toggleEditModal
        } = this.props;

        if (!singleTask || loading) return <Spinner/>
        return (
            <singleTaskContext.Consumer>{
                () => (
                    <>
                        <Container>
                            <h2 style={{color: "dark"}}>Single Task with Redux</h2>

                            <Row className={s.row}>
                                <Col className={s.col}>
                                    <h3 style={{color: "#ffc107"}}>{singleTask.title}</h3>
                                    <p>{singleTask.description}</p>
                                </Col>

                                <Col className={s.col}>
                                    <Button style={{backgroundColor: "#343a40"}}
                                            variant="info"
                                            onClick={toggleEditModal}
                                    >
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </Button>

                                    <Button style={{backgroundColor: "#343a40"}} className="ml-2"
                                            variant="danger"
                                            onClick={this.handleDeleteSingleTask}
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </Col>
                            </Row>

                            <Row className={s.rowBack}>
                                <Col>
                                    <Button
                                        variant="warning"
                                        style={{color: "white"}}
                                        onClick={this.goBackFromSingleTask}
                                    >Go Back
                                    </Button>
                                </Col>
                            </Row>

                        </Container>
                        {
                            isEditModal && <AddAndEditModal
                                onHide={toggleEditModal}
                                onSubmit={this.handleEditSingleTask}
                                editableTask={singleTask}

                            />
                        }
                        {
                            loading && <Spinner/>
                        }
                    </>
                )
            }
            </singleTaskContext.Consumer>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        singleTask,
        isEditModal

    } = state.SingleTaskState

    return {
        singleTask,
        loading: state.loading,
        isEditModal
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleTask: (data) => {
            dispatch({type: "GET_SINGLE_TASK", data})
        },
        setOrRemLoading: (isLoading) => {
            dispatch({type: "SET_OR_REMOVE_LOADING", isLoading});
        },
        toggleEditModal: () => {
            dispatch({type: "TOGGLE_EDIT_MODAL"});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskWithRedux);