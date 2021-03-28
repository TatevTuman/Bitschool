import NotFound from "../../../Photo/404.jpg";
import NotFoundSingleTask from "../../../Photo/505.jpg"
import {Button, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";


class notFound extends Component {

    state = {
        title: "",
        photo: {},

    }


    componentDidMount() {


        switch (this.props.match.params.code) {
            case "404":
                this.setState({
                    title: "I can't find so page :( ",
                    photo: NotFound
                })
                break

            case "500":
                this.setState({
                    title: "I can't find a task with this ID :(",
                    photo: NotFoundSingleTask,
                })
                break
            default:
                this.props.history.push("/error/404")
                break

        }

    }

    render() {


        const goHome = () => {
            this.props.history.push("/")
        }

        return (<Container className="mt-2">
            <h2 style={{color: "dark"}}>{this.state.title}</h2>
            <Row>
                <Col>
                    <img src={this.state.photo} alt="404 error"/>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Button onClick={goHome} variant="outline-dark">GO HOME</Button>
                </Col>
            </Row>


        </Container>)
    }
}

export default notFound;


