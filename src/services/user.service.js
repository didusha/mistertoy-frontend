import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

// const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

const BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    // updateScore,
    getEmptyCredentials
}


async function getById(userId) {
    return await httpService.get(BASE_URL + userId)
}

async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    return _setLoggedinUser(user)
}

async function signup({ username, password, fullname }) {
    const user = await httpService.post(BASE_URL + 'signup', { username, password, fullname })
    return _setLoggedinUser(user)
}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})


// function updateScore(diff) {
//     const loggedInUserId = getLoggedinUser()._id
//     return userService.getById(loggedInUserId)
//         .then(user => {
//             if (user.score + diff < 0) return Promise.reject('No credit')
//             user.score += diff
//             return storageService.put(STORAGE_KEY, user)
//         })
//         .then(user => {
//             _setLoggedinUser(user)
//             return user.score
//         })
// }

