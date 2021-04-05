import Spinner from "../../Spinner/Spinner";
import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import s from "./SingleTask.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import AddAndEditModal from "../../AddAndEditModal/AddAndEditModal";

const {singleTaskContext} = require("../../../Context/Contexts");
const {useContext} = require("react");


const SingleTaskWithContext=()=>{
    const context = useContext(singleTaskContext);
    const {
        singleTask,
        isEditModal,
        loading,
        toggleEditModal,
        handleEditSingleTask,
        handleDeleteSingleTask,
        goBackFromSingleTask,


    } = context;

   if (!singleTask || loading) return <Spinner/>
    return(
        <singleTaskContext.Consumer>{
            () => (

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
        </singleTaskContext.Consumer>
   )
}

export default SingleTaskWithContext;