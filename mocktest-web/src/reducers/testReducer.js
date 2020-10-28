const testReducer = (state = { userResponses: [], questions: [], bookmarkedQuestions: [] }, action) => {
    switch (action.type) {
        case 'OMR':
            return {
                ...state,
                userResponses: action.payload
            }
        case 'BOOKMARKS':
            return {
                ...state,
                bookmarkedQuestions: action.payload
            }
        case 'QUESTIONSET':
            return {
                ...state,
                questions: action.payload
            }
        default:
            return state;
    }
}
export default testReducer;