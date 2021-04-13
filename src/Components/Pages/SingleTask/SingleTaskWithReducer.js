import {Button, Col, Container, Row} from "react-bootstrap";
import s from "./SingleTask.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import AddAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";
import React, {useEffect, useReducer} from "react";



const API_HOST = "http://localhost:3001";

const initialState = {
    singleTask: null,
    isEditModal: false,
    loading: false
}

function reducer(state, action) {
    switch (action.type) {
        case "true":
            return {
                ...state,
                loading: true
            }
        case "false":
            return {
                ...state,
                loading: false
            }
        case "data":
            return {
                ...state,
                singleTask: action.singleTask,
            }
        case "changeEditModal":
            return {
                ...state,
                isEditModal: !state.isEditModal

            }
        default:
            return state;
    }

}

const SingleTaskWithReducer = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const {singleTask, loading, isEditModal} = state;


    useEffect(() => {

        dispatch({type: "true"})

        const {id} = props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {

                if (data.error)
                    throw data.error
                dispatch({type: "false"})
                dispatch({type: "data", singleTask: data})

            })
            .catch(error => {
                console.log("Some problem with single page", error)
                props.history.push("/error/" + error.status)
            })

    }, [])


    const toggleEditModal = () => {
        dispatch({type: "changeEditModal"})
    }

    const handleEditSingleTask = (editTask) => {
        dispatch({type: "true"})
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

                dispatch({type: "data", singleTask: data})
                dispatch({type: "changeEditModal"})


            })
            .catch(error => {
                console.log("Some problem with EdiT Single Task", error)
            })
            .finally(() => {
                dispatch({type: "false"})
            })
    }

    const handleDeleteSingleTask = () => {
        dispatch({type: "true"})
        const id = singleTask._id;
        fetch(`${API_HOST}/task/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                props.history.push("/")
            })
            .catch(error => {

                dispatch({type: "false"})
                console.log("Some problem with delete single task", error)
            })
    }

    const goBackFromSingleTask = () => {
        props.history.goBack()
    }


    if (!singleTask || loading) return <Spinner/>
    return (
        <>
            <Container>
                <h2 style={{color: "dark"}}>Single Task</h2>

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
                                onClick={handleDeleteSingleTask}
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
                            onClick={goBackFromSingleTask}
                        >Go Back
                        </Button>
                    </Col>
                </Row>

            </Container>

            {
                isEditModal && <AddAndEditModal
                    onHide={toggleEditModal}
                    onSubmit={handleEditSingleTask}
                    editableTask={singleTask}

                />
            }
            {
                loading && <Spinner/>
            }
        </>
    )
}



export default SingleTaskWithReducer;