import React, {Component} from "react";
import Task from "../Task/Task";
import guitarRed from "../../Photo/guitarRed.jpg"
import guitarClassic from "../../Photo/guitarClassic.jpg"
import ukulClassic from "../../Photo/guitarRed.jpg"
import ukulYellow from "../../Photo/ukulYellow.jpg"
import AddTask from "../AddTask/AddTask";
import {Col, Container, Row} from "react-bootstrap";
import s from "./ToDo.module.css";


class ToDo extends Component {
    /*    state = {
            guitar: [
                {name: " TERRIS TF-3802С RD", strings: 6, photo: <img src={guitarRed}/>},
                {name: " Doff RG Guitar ", strings: 7, photo: <img src={guitarClassic}/>},
                {name: " Укулеле JUS 20 MAYA Afro", strings: 4, photo: <img src={ukulClassic}/>},
                {name: " Укулеле PLUS-50 YW   ", strings: 4, photo: <img src={ukulYellow}/>}
            ],
            inputValue: "",
        }*/
    state = {
        guitar: [" TERRIS TF-3802С RD", " Doff RG Guitar ", " Укулеле JUS 20 MAYA Afro"],
        /*  inputValue: "",*/
    }


    /*    const newArray = myArray.map(a => ({...a}));*/
    handleSubmit = (value) => {
        const guitar = [...this.state.guitar]
        guitar.push(value)
        this.setState({
                guitar: guitar,
            }
        )
    }

    render() {
        const guitarsJSX = this.state.guitar.map(function (item, index, array) {
            return <Col className={s.guitarsList} xs={12} sm={6} md={4} lg={3}
                        key={index}><Task item={item} index={index}/></Col>
        });
        return (
            <Container>
                <h1> T o D o Component</h1>
                <Row>
                    <Col>
                        <AddTask handleSubmit={this.handleSubmit}/>
                    </Col>
                </Row>

                <Row className={guitarWrapperRow.join(" ")}>
                    {guitarsJSX}
                </Row>

            </Container>)
    }

}

const guitarWrapperRow = [
    "mt-5",
    "d-flex justify-content-center",
]

export default ToDo;


