import NotFound from "../../../Photo/404.jpg";
import {Button, Col, Container, Row} from "react-bootstrap";

const notFound = (props) => {
    const goHome = () => {
        props.history.push("/");
    }
    return (

        <Container className="mt-2">
            <h2 style={{color: "dark"}}>I don't have so page :(</h2>
            <Row>
                <Col>
                    <img src={NotFound} alt="error 404"/>

                </Col>

            </Row>

            <Row className="mt-2">

                <Col>

                    <Button onClick={goHome} variant="outline-dark">GO HOME</Button>
                </Col>


            </Row>
        </Container>

    )
}
export default notFound;


/* <h1 style={{color: "dark"}}>Error 404</h1>
<h2 style={{color: "dark"}}>I don't have so page</h2>
style={{backgroundColor: "black"}}*/


