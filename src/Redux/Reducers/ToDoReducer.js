import types from "../ActionTypes";


const initialState = {

    tasks: [],
    isOpenAddTaskModal: false,
    isOpenConfirm: false,
    checkedTasks: new Set(),
    editableTask: null,

}

const ToDoReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }
        case types.DELETE_ONE_TASK : {
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => task._id !== action._id);
            return {
                ...state,
                tasks

            }
        }
        case types.TOGGLE_OPEN_ADD_TASK_MODAL : {
            return {
                ...state,
                isOpenAddTaskModal: !state.isOpenAddTaskModal
            }
        }
        case types.ADD_TASK : {
            let tasks = [...state.tasks];
            tasks.push(action.data);
            return {
                ...state,
                tasks,
                isOpenAddTaskModal: false

            }
        }
        case types.TOGGLE_CONFIRM_MODAL : {
            return {
                ...state,
                isOpenConfirm: !state.isOpenConfirm
            }
        }
        case types.TOGGLE_CHECK_TASK : {
            let checkedTasks = new Set(state.checkedTasks);
            if (!checkedTasks.has(action._id)) {
                checkedTasks.add(action._id)
            } else {
                checkedTasks.delete(action._id)
            }
            return {
                ...state,
                checkedTasks
            }
        }
        case types.DELETE_CHECKED_TASKS : {
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => !state.checkedTasks.has(task._id));
            return {
                ...state,
                checkedTasks: new Set(),
                tasks,
                isOpenConfirm: false

            }
        }
        case types.TOGGLE_CHECK_ALL : {
            const {tasks} = state;
            let checkedTasks = new Set(state.checkedTasks);
            if (tasks.length === checkedTasks.size) {
                checkedTasks.clear();
            } else {
                tasks.forEach(task => {
                    checkedTasks.add(task._id);
                });
            }
            return {
                ...state,
                checkedTasks

            }
        }
        case types.EDIT: {
            const tasks = [...state.tasks];
            const {data} = action;
            const idx = tasks.findIndex(task => task._id === data._id);
            tasks[idx] = data;
            return {
                ...state,
                tasks,
                editableTask: null

            }
        }
        case types.SET_EDIT_TASK : {
            return {
                ...state,
                editableTask: action.data

            }
        }

        default:
            return state;
    }
}


export default ToDoReducer;