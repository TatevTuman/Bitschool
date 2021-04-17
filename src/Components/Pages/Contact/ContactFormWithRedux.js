import {Button, Container, Form} from "react-bootstrap";
import Spinner from "../../Spinner/Spinner";
import {connect} from "react-redux";
import {
    changeContactForm,
    sendContactFromThunk
} from "../../../Redux/Action"
import React from "react";


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

const ContactFormWithRedux = (props) => {
    const {
        personInfo,
        loading,
        //func
        sendContactFromThunk,
        changeContactForm,
    } = props;


    const dataset = inputsData.map((data, index) => {
        return (
            <Form.Group key={index}>
                <Form.Control
                    type={data.type}
                    placeholder={data.placeholder}
                    name={data.name}
                    onChange={(e) => changeContactForm(e.target)}
                    value={personInfo[data.name].value}
                    as={undefined ?? data.as}
                    rows={undefined ?? data.rows}
                />
                <Form.Text style={{color: "red"}}>{personInfo[data.name].error}</Form.Text>
            </Form.Group>
        )
    })

    return (<div>

        <Container className="mt-3">
            <h2 style={{color: "dark"}}>Contact</h2>
            <Form onSubmit={(e) => e.preventDefault()}>
                {dataset}
                <Button
                    variant="primary"
                    type="submit"
                    disabled={personInfo.name.error || personInfo.email.error || personInfo.message.error}
                    onClick={() => sendContactFromThunk(personInfo, props.history)}>
                    Send
                </Button>

            </Form>
        </Container>
        {loading && <Spinner/>}

    </div>)
}

const mapStateToProps = (state) => {
    const {
        name,
        email,
        message,

    } = state.ContactFormState;
    return {
        personInfo: {
            name,
            email,
            message,
        },

        loading: state.GlobalState.loading
    }

}
const mapDispatchToProps = {
    sendContactFromThunk,
    changeContactForm
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormWithRedux);






