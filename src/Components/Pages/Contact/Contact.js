import React from 'react';
import s from "./Contact.module.css"
import {Form, Button, Container} from 'react-bootstrap';
import Spinner from "../../Spinner/Spinner";
import {validator, maxLength, minLength, validateEmail} from "../../../Utils/validator";


const maxLength10 = maxLength(30);
const minLength1 = minLength(1)

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
    },


]

class Contact extends React.Component {
    state = {
        name: {
            valid: false,
            error: null,
            value: "",
        },
        email: {
            valid: false,
            error: null,
            value: "",
        },
        message: {
            valid: false,
            error: null,
            value: "",
        },
        loading: false,
        backendError: "",
    }

    handleChange = (e) => {
        const {name, value} = e.target
        let valid = true;

        let error = validator(value)
            || maxLength10(value)
            || minLength1(value)
            || (name === "email" && validateEmail(value));
        if (error) {
            valid = false
        }


        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value,
            }
        });
    }

    handleSubmit = () => {
        const contactFormData = {...this.state}
        const {name, email, message} = contactFormData

        for (let key in contactFormData) {
            if (typeof contactFormData[key] === "object" && Object.keys(contactFormData[key]).includes("value")) {
                contactFormData[key] = contactFormData[key].value;
            } else {
                delete contactFormData[key];
            }
        }


        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
        this.setState({loading: true, backendError: null})
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
                this.setState({loading: false, backendError: error.message})
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
                        value={this.state[data.name].value}
                        as={undefined ?? data.as}
                        rows={undefined ?? data.rows}

                    />
                    <Form.Text style={{color: "red"}}>{this.state[data.name].error}</Form.Text>

                </Form.Group>
            );
        });

        return (

            <>
                <Container className="mt-3">
                    <h2 style={{color: "dark"}}>Contact old</h2>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        {dataset}
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={
                                this.state.name.error
                                || this.state.email.error
                                || this.state.message.error}
                        >
                            Send
                        </Button>

                        {this.state.backendError ?
                            <h5 className={s.backendError}>{this.state.backendError ? this.state.backendError.substr(6, 70) : ""}</h5> : ""}


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