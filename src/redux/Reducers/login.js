let initialState = {
    user: {
        userName: "",
        email: "",
        jwt: "",
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
                    jwt: action.payload.jwt
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