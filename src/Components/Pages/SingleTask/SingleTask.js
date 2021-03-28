import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import s from "./SingleTask.module.css"
import AddAndEditModal from "../../AddAndEditModal/AddAndEditModal";
import Spinner from "../../Spinner/Spinner";


const API_HOST = "http://localhost:3001";

class SingleTask extends Component {

    state = {
        singleTask: null,
        isEditModal: false,
        loading: false
    }

    toggleEditModal = () => {
        this.setState({
            isEditModal: !this.state.isEditModal
        })
    }

    handleEditSingleTask = (editTask) => {
        this.setState({loading: true});
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
                this.setState({
                    singleTask: data,
                    isEditModal: false
                })
            })
            .catch(error => {
                console.log("Some problem with EdiT Single Task", error)
            })
            .finally(() => {
                this.setState({loading: false});
            })
    }

    handleDeleteSingleTask = () => {
        this.setState({loading: true});
        const id = this.state.singleTask._id;
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
                this.setState({loading: false});
                console.log("Some problem with delete single task", error)
            })

    }

    goBackFromSingleTask = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.setState({loading: true});
        const {id} = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.setState({
                    singleTask: data,
                    loading: false
                })
            })
            .catch(error => {
                console.log("Some problem with single page", error)
                this.props.history.push("/error/" + error.status)

            })

    }

    render() {
        const {singleTask, isEditModal, loading} = this.state;
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
                                    onClick={this.toggleEditModal}
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
                        onHide={this.toggleEditModal}
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
}


export default SingleTask;