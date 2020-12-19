export const signIn = (props) => {
    return {
        type: 'SIGN_IN',
        payload: {
            username: props.username,
            email: props.email,
            jwt: props.jwt,
            
        }
    }
} 