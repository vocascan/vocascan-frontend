export const login = (props) => {
    return {
        type: 'SIGN_IN',
        payload: {
            userName: props.userName,
            email: props.email,
            jwt: props.jwt
        }
    }
} 