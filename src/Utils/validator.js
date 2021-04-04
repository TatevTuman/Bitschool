export const validator = (value) => {
    return !!value.length ? undefined : "This field must be filled"
}
export const maxLength = (length) => (value) => value.length > length ? "Max length is " + length : undefined;
export const minLength = (length) => (value) => value.length < length ? "Min length is " + length : undefined;
export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? undefined : "Invalid Email";
}
