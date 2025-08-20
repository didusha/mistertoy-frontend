import { userService } from "../../services/user.service.js"

//* User
export const SET_USER = 'SET_USER'
export const SET_SCORE = 'SET_SCORE'
export const SET_USERS = 'SET_USERS'


const initialState = {
    // count: 105,
    loggedInUser: userService.getLoggedinUser(),
    user:null,
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }

        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        case SET_SCORE:
            const user = { ...state.user, score: action.score }
            newState = { ...state, user }
            userService.saveLoggedinUser(user)
            break


        default:
            return state;
    }
}