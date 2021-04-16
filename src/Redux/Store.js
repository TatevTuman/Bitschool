import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import types from "./ActionTypes";

const initialState = {

    ToDoState: {
        tasks: [],
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        checkedTasks: new Set(),
        editableTask: null,
    },
    loading: false,

    SingleTaskState:{
        singleTask: null,
        isEditModal: false,
    }

}
const reduser = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_TASKS: {
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    tasks: action.data
                }
            }
        }
        case types.DELETE_ONE_TASK : {
            let tasks = [...state.ToDoState.tasks];
            tasks = tasks.filter(task => task._id !== action._id);
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    tasks
                }
            }
        }
        case types.SET_OR_REMOVE_LOADING : {
            return {
                ...state,
                loading: action.isLoading
            }
        }
        case types.TOGGLE_OPEN_ADD_TASK_MODAL : {
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    isOpenAddTaskModal: !state.ToDoState.isOpenAddTaskModal
                }
            }
        }
        case types.ADD_TASK : {
            let tasks = [...state.ToDoState.tasks];
            tasks.push(action.data);
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    tasks,
                    isOpenAddTaskModal: false
                }
            }
        }
        case types.TOGGLE_CONFIRM_MODAL : {
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    isOpenConfirm: !state.ToDoState.isOpenConfirm
                }
            }
        }
        case types.TOGGLE_CHECK_TASK : {
            let checkedTasks = new Set(state.ToDoState.checkedTasks);
            if (!checkedTasks.has(action._id)) {
                checkedTasks.add(action._id)
            } else {
                checkedTasks.delete(action._id)
            }
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    checkedTasks
                }
            }
        }
        case types.DELETE_CHECKED_TASKS : {
            let tasks = [...state.ToDoState.tasks];
            tasks = tasks.filter(task => !state.ToDoState.checkedTasks.has(task._id));
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    checkedTasks: new Set(),
                    tasks,
                    isOpenConfirm: false
                }
            }
        }
        case types.TOGGLE_CHECK_ALL : {
            const {tasks} = state.ToDoState;
            let checkedTasks = new Set(state.ToDoState.checkedTasks);
            if (tasks.length === checkedTasks.size) {
                checkedTasks.clear();
            } else {
                tasks.forEach(task => {
                    checkedTasks.add(task._id);
                });
            }
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    checkedTasks
                }
            }
        }
        case types.EDIT: {
            const tasks = [...state.ToDoState.tasks];
            const {data}=action;
            const idx = tasks.findIndex(task => task._id === data._id);
            tasks[idx] = data;
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    tasks,
                  editableTask: null
                }
            }
        }
        case types.SET_EDIT_TASK :{
            return {
                ...state,
                ToDoState: {
                    ...state.ToDoState,
                    editableTask: action.data
                }
            }
        }
        case types.GET_SINGLE_TASK:{
            return{
                ...state,
                SingleTaskState: {
                    ...state.SingleTaskState,
                    singleTask: action.data,


                }
            }
        }
        case types.TOGGLE_EDIT_MODAL :{
            return {
                ...state,
                SingleTaskState: {
                    ...state.SingleTaskState,
                    isEditModal:!state.SingleTaskState.isEditModal
                }
            }
        }


        default:
            return state;
    }
}
const store = createStore(reduser,  applyMiddleware(thunk));
window.store = store;
export default store;






