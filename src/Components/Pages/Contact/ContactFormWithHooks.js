import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {maxLength, minLength, validateEmail, validator} from "../../../Utils/validator";
import Spinner from "../../Spinner/Spinner";
import s from "./Contact.module.css"

const API_HOST = "http://localhost:3001";
const maxLength10 = maxLength(30);
const minLength1 = minLength(1)
const ContactFormWithHooks = (props) => {


    const [loading, setLoading] = useState(false)
    const [backendError, setBackendError] = useState()
    const [personInfo, setPersonInfo] = useState({
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
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        let valid = true;
        let error = validator(value)
            || maxLength10(value)
            || minLength1(value)
            || (name === "email" && validateEmail(value));

        if (error) {
            valid = false
        }

        setPersonInfo({
            ...personInfo,
            [name]: {
                value: value,
                error: error,
                valid: valid
            }
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!personInfo.name.value.trim() || !personInfo.email.value.trim() || !personInfo.message.value.trim()) return;
        setLoading(true)
        fetch(`${API_HOST}/form`, {
            method: "POST",
            body: JSON.stringify({
                name: personInfo.name.value,
                email: personInfo.email.value,
                message: personInfo.message.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {

                if (data.error)
                    throw data.error

                props.history.push("/")

            })
            .catch(error => {

                setBackendError(error.message)
                setLoading(false)
                console.log("Some problem with Contact Form", error)
            })

    }


    return (<div>

        <Container className="mt-3">
            <h2 style={{color: "dark"}}>Contact</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        value={personInfo.name.value}

                    />
                    <Form.Text style={{color: "red"}}>{personInfo.name.error}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={personInfo.email.value}
                    />
                    <Form.Text style={{color: "red"}}>{personInfo.email.error}</Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Control
                        name="message"
                        type=""
                        placeholder="Your message"
                        onChange={handleChange}
                        as="textarea"
                        rows={3}
                        value={personInfo.message.value}

                    />
                    <Form.Text style={{color: "red"}}>{personInfo.message.error}</Form.Text>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={personInfo.name.error || personInfo.email.error || personInfo.message.error}>
                    Send
                </Button>

                {backendError ? <h5 className={s.backendError}>{backendError.substr(6, 70)}</h5> : ""}

            </Form>
        </Container>

        {loading && <Spinner/>}

    </div>)
}

export default ContactFormWithHooks;


