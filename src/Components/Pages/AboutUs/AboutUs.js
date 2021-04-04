import {Component} from "react";
import {Button, Container, Form} from "react-bootstrap";


/*const API_HOST = "http://localhost:3001";*/


class AboutUs extends Component {

    state = {
        name: "",
        email: "",
        message: "",
    }

    infoData = [

        {
            name: "name",
            type: "name",
            placeholder: "Name",

        },
        {
            name: "email",
            type: "email",
            placeholder: "Email",

        },
        {
            name: "message",
            type: null,
            placeholder: "Message",
            as: "textarea",
            rows: 3,

        },
    ]

    getInputValue = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }



    render() {

        const infoData = this.infoData.map((data, index) => {
            return (
                <Form.Group key={index}>
                    <Form.Control
                        name={data.name}
                        type={data.type}
                        placeholder={data.placeholder}
                        onChange={this.getInputValue}
                        value={this.state[data.name]}
                        as={data.as || undefined}
                        rows={data.rows || undefined}
                    />
                </Form.Group>
            )
        })

        return (

            <Container className="mt-5">
                <Form onSubmit={(e) => {
                    e.preventDefault()
                }}>

                    {infoData}
                    <Button
                        variant="primary"
                        type="submit"

                    >
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default AboutUs;



