export const setServerSettings = (props) => {
    return {
        type: 'SET_SERVER_SETTINGS',
        payload: {
            serverAddress: props.serverAddress
        }
    }
} 