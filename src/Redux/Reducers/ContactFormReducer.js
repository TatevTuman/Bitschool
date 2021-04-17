

import types from "../ActionTypes";
import {maxLength, minLength,validateEmail,validator} from "../../Utils/validator";


const maxLength10 = maxLength(30);
const minLength1 = minLength(0)

const initialState = {
    name: {
        valid: false,
        error: null,
        value: ""
    },
    email: {
        valid: false,
        error: null,
        value: ""
    },
    message: {
        valid: false,
        error: null,
        value: ""
    },
    //backendError:null
}

const ContactFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_CONTACT_FORM: {
            const { name, value } = action.target;
            let valid = true;
            let error = validator(value)
                || maxLength10(value)
                || minLength1(value)
                || (name === "email" && validateEmail(value));

            if (error) {
                valid = false
            }
            return {
                ...state,
                [name]: {
                    value,
                    error,
                    valid,
                }
            }
        }

        default: return state;
    }
}

export default ContactFormReducer;
