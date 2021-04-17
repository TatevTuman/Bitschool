import types from "../ActionTypes";

const initialState = {
    singleTask: null,
    isEditModal: false,

}

const SingleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SINGLE_TASK: {
            return {
                ...state,
                singleTask: action.data,
            }
        }
        case types.TOGGLE_EDIT_MODAL : {
            return {
                ...state,
                isEditModal: !state.isEditModal
            }
        }


        default:
            return state;
    }
}

export default SingleTaskReducer;