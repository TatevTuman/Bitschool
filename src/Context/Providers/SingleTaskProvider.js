import {singleTaskContext} from "../Contexts";
import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom"

const API_HOST = "http://localhost:3001";


const SingleTaskProvider = (props) => {
console.log(props)
    const [singleTask, setSingleTask] = useState(null)
    const [isEditModal, setIsEditModal] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
            setLoading(true)
            const {id} = props.match.params;
            fetch(`${API_HOST}/task/${id}`, {
                method: "GET",
            })
                .then(res => res.json())
                .then(data => {

                    if (data.error)
                        throw data.error
                    setLoading(false)
                    setSingleTask(data)
                })
                .catch(error => {
                    console.log("Some problem with single page", error)

                    props.history.push("/error/" + error.status)

                })

    },[])

    const toggleEditModal = () => {
        setIsEditModal(!isEditModal)
    }

    const handleEditSingleTask = (editTask) => {
        setLoading(true);
        const id = editTask._id;
        fetch(`${API_HOST}/task/${id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                setSingleTask(data)
                setIsEditModal(false)

            })
            .catch(error => {
                console.log("Some problem with EdiT Single Task", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDeleteSingleTask = () => {
        setLoading(true)
        const id = singleTask._id;
        fetch(`${API_HOST}/task/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                props.history.push("/")
            })
            .catch(error => {

                setLoading(false)
                console.log("Some problem with delete single task", error)
            })
    }

    const goBackFromSingleTask = () => {
        props.history.goBack()
    }



    return (<singleTaskContext.Provider

        value={{
            singleTask: singleTask,
            isEditModal: isEditModal,
            loading: loading,
            toggleEditModal: toggleEditModal,
            handleEditSingleTask: handleEditSingleTask,
            handleDeleteSingleTask: handleDeleteSingleTask,
            goBackFromSingleTask: goBackFromSingleTask,
        }}

    >
        {props.children}

    </singleTaskContext.Provider>)
}

export default withRouter(SingleTaskProvider);