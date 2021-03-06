const userReducer = (state = { userId: '', userName: '' }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userId: action.payload.userId,
                userName: action.payload.userName
            }
        default:
            return state;
    }
}
export default userReducer;