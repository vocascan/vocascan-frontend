export const register = (props) => {
    return {
        type: 'REGISTER',
        payload: {
            userName: props.userName,
            email: props.email,
            jwt: props.jwt
        }
    }
} 