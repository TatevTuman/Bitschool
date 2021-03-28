import NotFound from "../../../Photo/404.jpg";
import NotFoundSingleTask from "../../../Photo/505.jpg"
import {Button, Col, Container, Row} from "react-bootstrap";
import {Component} from "react";
import {withRouter} from "react-router-dom";


class notFound extends Component{

    state={
        title:"",
        photo:{},
        statusCode: this.props.error

    }



componentDidMount() {
    if(this.props.location.pathname==="/404"){
        this.setState({
            title:"I can't find so page :( ",
            photo:NotFound
        })
        if(this.props.location.pathname==="/505"){
            this.setState({
                title:"I can't find a task with this ID :(",
                photo:NotFoundSingleTask,
            })
        }
    }
}


    render() {

        const goHome=()=>{
            this.props.history.push("/")
        }

        return(<Container className="mt-2">
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

export default withRouter (notFound);


/* <h1 style={{color: "dark"}}>Error 404</h1>
<h2 style={{color: "dark"}}>I don't have so page</h2>
style={{backgroundColor: "black"}}*/


