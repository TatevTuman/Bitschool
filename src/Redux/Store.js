import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import ToDoReducer from "./Reducers/ToDoReducer";
import SingleTaskReducer from "./Reducers/SingleTaskReducer";
import GlobalReducer from "./Reducers/GlobalReducer";
import ContactFormReducer from "./Reducers/ContactFormReducer";
import AddAndEditModalReducer from "./Reducers/AddAndEditModalReducer";
import SearchReducer from "./Reducers/SearchReducer";
import logger from "redux-logger";



const reducer = combineReducers({
    ToDoState: ToDoReducer,
    GlobalState: GlobalReducer,
    SingleTaskState: SingleTaskReducer,
    ContactFormState: ContactFormReducer,
    AddAndEditModalState: AddAndEditModalReducer,
    SearchState:SearchReducer
});
const store = createStore(reducer, applyMiddleware(thunk, logger));
window.store = store;
export default store;







