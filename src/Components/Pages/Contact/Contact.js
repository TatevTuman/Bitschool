import React from 'react';
import {Form, Button, Container} from 'react-bootstrap';
import Spinner from "../../Spinner/Spinner";

const API_HOST = "http://localhost:3001";

const inputsData = [
    {
        name: "name",
        type: "text",
        placeholder: "Your name"
    },
    {
        name: "email",
        type: "email",
        placeholder: "Your e-mail"
    },
    {
        name: "message",
        type: null,
        placeholder: "Your message",
        as: "textarea",
        rows: 3
    }
]

class Contact extends React.Component {
    state = {
        name: "",
        email: "",
        message: "",
        loading: false
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        });
    }
    handleSubmit = () => {
        this.setState({loading: true})
        const contactFormData = {...this.state}
        fetch(`${API_HOST}/form`, {
            method: "POST",
            body: JSON.stringify({
                name: contactFormData.name,
                email: contactFormData.email,
                message: contactFormData.message
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.error)
                    throw data.error
                this.props.history.push("/")


            })
            .catch(error => {
                this.setState({loading: false})
                console.log("Some problem with Contact Form", error)
            })

    }

    render() {
        const dataset = inputsData.map((data, index) => {
            return (
                <Form.Group key={index}>
                    <Form.Control
                        type={data.type}
                        placeholder={data.placeholder}
                        name={data.name}
                        onChange={this.handleChange}
                        value={this.state[data.name]}
                        as={undefined ?? data.as}
                        rows={undefined ?? data.rows}
                    />
                </Form.Group>
            );
        });

        return (
            <>
                <Container className="mt-3">
                    <h2 style={{color: "dark"}}>Contact</h2>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        {dataset}
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Send
                        </Button>
                    </Form>
                </Container>

                {
                    this.state.loading && <Spinner/>
                }

            </>


        )
    }
}

export default Contact;