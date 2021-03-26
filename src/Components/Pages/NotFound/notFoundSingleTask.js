import {Button, Col, Container, Row} from "react-bootstrap";
import NotFoundSingleTask from "../../../Photo/505.jpg"

const notFoundSingleTask = (props) => {
const goHome=()=>{
    props.history.push("/")
}
    return (<Container className="mt-2">
        <h2 style={{color: "dark"}}>I can't find a task with this ID :(</h2>
        <Row>
            <Col>
                <img src={NotFoundSingleTask} alt="server error"/>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col>
                <Button onClick={goHome} variant="outline-dark">GO HOME</Button>
            </Col>
        </Row>



    </Container>)
}
export default notFoundSingleTask;
