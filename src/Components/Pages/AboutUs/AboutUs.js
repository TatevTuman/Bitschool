import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const AboutUs = () => {

    return (
        <Container>
            {<h2 style={{color: "dark"}}>About</h2>}
            <Row>
                <Col className="text-left">
                    <p>
                        <h3>Tatev Tumanyan</h3>
                        <h5>Purpose</h5>
                        <div>Getting a Front End Developer position</div>
                    </p>
                    <p>
                        <h5>Professional skills and knowledge</h5>
                        <li>Knowledge of Javascript and ES6 +, React + Redux;</li>
                        <li>Strong knowledge of HTML5, CSS3 / SASS / LESS, experience in adaptive and cross-browser
                            layout;
                        </li>
                        <li>Knowledge of the HTTP / HTTPS protocol, experience with RestAPI;</li>
                    </p>
                    <p>
                        <h5>Education</h5>
                        <div>Faculty of Informatics and Computer Science</div>
                        <div>Department of Information Security</div>
                    </p>

                    <p>
                        <h5>Languages</h5>
                        <div>- Armenian</div>
                        <div>- Russian</div>
                        <div>- English - B2</div>
                    </p>
                    <p>

                        <h5> Freelance</h5>
                        <li> Website layout orders</li>
                        <li> Experience with git and gitflow;</li>
                        <li> Experience with React, Redux</li>
                    </p>


                </Col>
            </Row>

        </Container>
    )


}

export default AboutUs;



