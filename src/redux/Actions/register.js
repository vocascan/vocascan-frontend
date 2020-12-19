export const register = (props) => {
    return {
        type: 'REGISTER',
        payload: {
            username: props.username,
            email: props.email,
            jwt: props.jwt
        }
    }
} 