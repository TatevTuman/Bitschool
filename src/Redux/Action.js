import types from "./ActionTypes"

const API_HOST = process.env.REACT_APP_API_URL;





export function getTasksThunk(dispatch) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/task/`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.GET_TASKS, data})

        })
        .catch(error => {
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        })
}

export function addTaskThunk(dispatch, formData) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/task`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.ADD_TASK, data})
            dispatch({type: types.GET_SUCCESS_MASSAGE, successMessage: "Task added!"})
        })
        .catch(error => {
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        });
}

export function deleteOneTaskThunk(dispatch, _id) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/task/` + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.DELETE_ONE_TASK, _id});
            dispatch({type: types.GET_SUCCESS_MASSAGE, successMessage: "Task deleted!"})
        })
        .catch(error => {
            //console.log("Some problem with delete task", error)
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        })
}

export function deleteCheckedTasksThunk(dispatch, checkedTasks) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/task`, {
        method: "PATCH",
        body: JSON.stringify({tasks: Array.from(checkedTasks)}),

        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.DELETE_CHECKED_TASKS})
            dispatch({type: types.GET_SUCCESS_MASSAGE, successMessage: "Tasks deleted!"})
        })
        .catch(error => {
            //console.log("Some problem with delete checked tasks", error)
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        })
}

export function editOneTaskThunk(dispatch, editableTask, page = "todo") {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});

    fetch(`${API_HOST}/task/` + editableTask._id, {
        method: "PUT",
        body: JSON.stringify(editableTask),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())

        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.GET_SUCCESS_MASSAGE, successMessage: "Task edited!"})
            if (page === "todo") {
                dispatch({type: types.EDIT, data})
                //dispatch({type: types.TOGGLE_OPEN_ADD_TASK_MODAL});

            } else if (page === "singleTask") {
                dispatch({type: types.GET_SINGLE_TASK, data})
                dispatch({type: types.TOGGLE_EDIT_MODAL});

            } else {
                throw new Error("The Page is not Found!");
            }

        })

        .catch(error => {
            // console.log("Some problem with edit task", error)
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        })
}

//singleTask
export function getSingleTaskThunk(dispatch, data) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    //const {id} = this.props.match.params;
    fetch(`${API_HOST}/task/${data.id}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.GET_SINGLE_TASK, data})
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
        })
        .catch(error => {
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
            data.history.push("/error/" + error.status)


        })
}

export function handleDeleteSingleTaskThunk(dispatch, data) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    const id = data.id;
    const history = data.history
    fetch(`${API_HOST}/task/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            history.push("/")
            dispatch({type: types.GET_SUCCESS_MASSAGE, successMessage: "Task deleted!"})

        })
        .catch(error => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        })
}

//contactForm
export const changeContactForm = (target) => (dispatch) => {
    dispatch({type: types.CHANGE_CONTACT_FORM, target});
}

export const sendContactFromThunk = (personInfo, history) => (dispatch) => {
    const personInfoCopy = {...personInfo};
    for (let key in personInfoCopy) {
        if (typeof personInfoCopy[key] === "object" && personInfoCopy[key].hasOwnProperty("value")) {
            personInfoCopy[key] = personInfoCopy[key].value;
        } else {
            delete personInfoCopy[key];
        }
    }
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/form`, {
        method: "POST",
        body: JSON.stringify(personInfoCopy),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            history.push("/");
        })
        .catch(error => {
            dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: false});
            // console.log("Some problem with Contact Form", error)
            dispatch({type: types.GET_ERROR_MASSAGE, error: error.message})
        });
}

//AddEndEditTaskModal


export const changeModalInput = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_MODAL_INPUT, target });
}

export const changeModalDate = (date) => (dispatch) => {
    dispatch({ type: types.CHANGE_MODAL_DATE, date });
}
export const setEditableTaskToModalState = (editableTask) => (dispatch) => {
    dispatch({ type: types.SET_EDITABLE_TASK_TO_MODAL_STATE, editableTask });
}
export const resetTaskModalState = () => (dispatch) => {
    dispatch({ type: types.RESET_TASK_MODAL });
}


export const toggleTaskStatusThunk = (task) => (dispatch) => {
    const status = task.status === "done" ? "active" : "done";
    fetch(`${API_HOST}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: types.EDIT, data });

        })
        .catch(error => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        });

}

export const setDropDownValueForSearch = (dropDown, value) => (dispatch) => {
    dispatch({ type: types.SET_DROPDOWN_VARIANT, dropDown, value });
}

export const changeSearchValue = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_SEARCH_VALUE, target });
}

export const setDate = (name, date) => (dispatch) => {
    dispatch({ type: types.SET_DATE, name, date });
}


export const searchFilterThunk = (formData) => (dispatch) => {
    let formDataFilter = { ...formData };
    window.formDataFilter = formDataFilter;
    let query = "?";
    for (let key in formDataFilter) {
        if (!formDataFilter[key]) delete formDataFilter[key]
        else {
            query += key + "=" + formDataFilter[key] + "&";
        }
    }
    if (Object.keys(formDataFilter).length) {
        dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });   //Loading Started
        fetch(`${API_HOST}/task${query.slice(0, query.length - 1)}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                dispatch({ type: types.GET_TASKS, data });
                dispatch({ type: types.RESET_SEARCH_STATE });


            })
            .catch(error => {
                dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
            })
            .finally(() => {
                dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });   //Loading Ended
            })
    }

}






