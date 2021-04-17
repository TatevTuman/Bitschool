import types from "./ActionTypes"

const API_HOST = "http://localhost:3001";

export function getTasksThunk(dispatch) {
    dispatch({type: types.SET_OR_REMOVE_LOADING, isLoading: true});
    fetch(`${API_HOST}/task`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.GET_TASKS, data})

        })
        .catch(error => {
            console.log("Some problem getting tasks from base", error)
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        })
}

export function addTaskThunk(dispatch, formData) {
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
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
        })
        .catch(error => {
            console.log("Some problem with add task", error)
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        });
}

export function deleteOneTaskThunk(dispatch, _id) {
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
    fetch(`${API_HOST}/task/` + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({type: types.DELETE_ONE_TASK , _id});
        })
        .catch(error => {
            console.log("Some problem with delete task", error)
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        })
}

export function deleteCheckedTasksThunk(dispatch, checkedTasks) {
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
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
        })
        .catch(error => {
            console.log("Some problem with delete checked tasks", error)
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        })
}

export function editOneTaskThunk(dispatch, editableTask, page="todo") {
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
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
            if (page === "todo") {
                dispatch({type: types.EDIT , data})
                //dispatch({type: types.TOGGLE_OPEN_ADD_TASK_MODAL});
            } else if (page === "singleTask") {
                dispatch({type: types.GET_SINGLE_TASK , data})
                dispatch({type: types.TOGGLE_EDIT_MODAL});
            } else {
                throw new Error("The Page is not Found!");
            }
        })
        .catch(error => {
            console.log("Some problem with edit task", error)
        })
        .finally(() => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        })
}

/////singleTask
export  function getSingleTaskThunk(dispatch,data){
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
    //const {id} = this.props.match.params;
    fetch(`${API_HOST}/task/${data.id}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
           /* this.props.getSingleTask(data)*/
            dispatch({type: types.GET_SINGLE_TASK, data})
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
        })
        .catch(error => {
            console.log("Some problem with single page", error)
           data.history.push("/error/" + error.status)


        })
}
export function handleDeleteSingleTaskThunk(dispatch,data){
    dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: true});
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
        })
        .catch(error => {
            dispatch({type: types.SET_OR_REMOVE_LOADING , isLoading: false});
            console.log("Some problem with delete single task", error)
        })
}


//contactForm
export const changeContactForm = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_CONTACT_FORM, target });
}

export const sendContactFromThunk = (personInfo, history) => (dispatch) => {
    const personInfoCopy = { ...personInfo };
    for (let key in personInfoCopy) {
        if (typeof personInfoCopy[key] === "object" && personInfoCopy[key].hasOwnProperty("value")) {
            personInfoCopy[key] = personInfoCopy[key].value;
        } else {
            delete personInfoCopy[key];
        }
    }
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
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
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
            console.log("Some problem with Contact Form", error)
        });
}






