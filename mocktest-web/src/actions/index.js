export const login = (userId, userName) => {
    return {
        type: 'LOGIN',
        payload: { userId, userName }
    }
}