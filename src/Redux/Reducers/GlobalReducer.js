import types from "../ActionTypes";

const initialState = {
    loading: false,
    errorMassage:"",
    successMessage:"",

}

const GlobalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OR_REMOVE_LOADING :
            return {
                ...state,
                loading: action.isLoading,
                errorMassage: action.isLoading ? "" :state.errorMassage
            }
        case types.GET_ERROR_MASSAGE:
            return {
                ...state,
                errorMassage:action.error
            }
            case types.GET_SUCCESS_MASSAGE:
            return {
                ...state,
                successMessage:action.successMessage
            }

        default:
            return state
    }
}


export default GlobalReducer;
