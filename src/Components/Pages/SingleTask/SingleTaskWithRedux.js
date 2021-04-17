import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import s from "./SingleTask.module.css"
import AddAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";
import {singleTaskContext} from "../../../Context/Contexts";
import {connect} from "react-redux";
import {
    deleteOneTaskThunk,
    editOneTaskThunk,
    getSingleTaskThunk,
    handleDeleteSingleTaskThunk,
} from "../../../Redux/Action";
import types from "../../../Redux/ActionTypes";


class SingleTaskWithRedux extends Component {


    handleDeleteSingleTask = () => {
        const history = this.props.history
        const id = this.props.singleTask._id
        this.props.deleteSingleTask({id, history})
    }

    goBackFromSingleTask = () => {
        this.props.history.goBack()
    }


    componentDidMount() {
        const id = this.props.match.params.id;
        const history = this.props.history;
        this.props.getSingleTask({id, history});
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
                                onSubmit={this.props.editOneTask}
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
        isEditModal,

    } = state.SingleTaskState

    return {
        singleTask,
        loading: state.GlobalState.loading,
        isEditModal,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingleTask: (data) => {
            dispatch((dispatch) => getSingleTaskThunk(dispatch, data))
        },
        toggleEditModal: () => {
            dispatch({type: types.TOGGLE_EDIT_MODAL});
        },
        editOneTask: (data) => {
            dispatch((dispatch) => editOneTaskThunk(dispatch, data, "singleTask"))
        },

        deleteOneTask: (_id) => {
            dispatch((dispatch) => deleteOneTaskThunk(dispatch, _id))
        },
        deleteSingleTask: (data) => {
            dispatch((dispatch) => handleDeleteSingleTaskThunk(dispatch, data))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTaskWithRedux);