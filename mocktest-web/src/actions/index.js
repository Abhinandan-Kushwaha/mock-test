export const login = (userId, userName) => {
    return {
        type: 'LOGIN',
        payload: { userId, userName }
    }
}

export const omr = (userResponses) => {
    return {
        type: 'OMR',
        payload: userResponses
    }
}

export const bookmarks = (bookmarkedQuestions) => {
    return {
        type: 'BOOKMARKS',
        payload: bookmarkedQuestions
    }
}

export const questionSet = (questions) => {
    return {
        type: 'QUESTIONSET',
        payload: questions
    }
}