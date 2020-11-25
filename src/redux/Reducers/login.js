let initialState = {
    user: {
        userName: "",
        email: "",
        token: "",
    },
    isLoggedIn: false



}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isLoggedIn: true,
                user: {
                    userName: action.payload.userName,
                    email: action.payload.email,
                    token: action.payload.token
                }
                
            }
        case 'SIGN_OUT':
            return {
                state,
                isLoggedIn: false
            };
        default:
            return state;
    }
}

export default loginReducer;