import types from "../ActionTypes";

const initialState = {
    loading: false,
}

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OR_REMOVE_LOADING :
            return {
                ...state,
                loading: action.isLoading
            }

        default:
            return state
    }
}


export default GlobalReducer;
