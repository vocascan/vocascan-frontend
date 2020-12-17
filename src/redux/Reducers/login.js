let initialState = {
    user: {
        userName: "",
        email: "",
        jwt: "",
    },
    serverAddress: "",
    isLoggedIn: false,
    firstLogin: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                user: {
                    username: action.payload.username,
                    email: action.payload.email,
                    jwt: action.payload.jwt
                },
                isLoggedIn: true,
                firstLogin: true
            }
        case 'SIGN_IN':
            return {
                ...state,
                user: {
                    userName: action.payload.userName,
                    email: action.payload.email,
                    jwt: action.payload.jwt
                },
                isLoggedIn: true
            }
            
        case 'SIGN_OUT':
            return {
                ...state,
                isLoggedIn: false
            };
        case 'SET_SERVER_SETTINGS':
            return {
                ...state,
                serverAddress: action.payload.serverAddress
            }
        default:
            return state;
    }
}

export default loginReducer;