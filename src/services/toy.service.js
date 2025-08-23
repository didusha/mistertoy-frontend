import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

const LOCATIONS_KEY = 'locationDB'
const LABELS = [
    'on wheels',
    'box game',
    'art',
    'baby',
    'doll',
    'puzzle',
    'outdoor',
    'battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
    getStoreLocations,
    setStoreLocations,
    getToyLabels,
    addToyMsg,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: false,
        imgUrl: null,                             //`https://robohash.org/${utilService.getRandomIntInclusive(1, 10)}?set=set5`,
        labels: [],
        createdAt: null,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [], inStock: '', sortField: '', sortDir: 1, createdAt: null }
}

function getToyLabels() {
    return [...LABELS]
}

function getStoreLocations(){
    let storeLocations = localStorage.getItem(LOCATIONS_KEY)
    return storeLocations ? JSON.parse(storeLocations) : []
}

function setStoreLocations(storeLocations){
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(storeLocations))
}

async function addToyMsg(toyId, msg) {
    console.log("🚀 ~ addToyMsg ~ msg:", msg)
    return httpService.post(BASE_URL + toyId + '/msg', msg )
}

// function _createToys() {
//     let toys = storageService.query(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         const names = ['Speedster Car', 'Coloring Kit', 'Baby Rattle', 'Puzzle Master',
//             'Outdoor Explorer', 'Dollhouse Deluxe', 'Battery Bot', 'Box Game Challenge',
//             'Artistic Easel', 'Mini Scooter']
//         const toys = []
//         for (let i = 0; i < 10; i++) {
//             const toy = {
//                 _id: utilService.makeId(),
//                 name: names[utilService.getRandomIntInclusive(0, names.length - 1)],
//                 inStock: Math.random() < 0.5 ? true : false,
//                 labels: [LABELS[utilService.getRandomIntInclusive(0, LABELS.length - 1)]],
//                 imgUrl: `https://robohash.org/${i + 1}?set=set3`,
//                 price: utilService.getRandomIntInclusive(30, 250),
//                 createdAt: Date.now()
//             }
//             toys.push(toy)
//         }
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
//     }
// }

function getRandomToy() {
    return {
        _id: utilService.makeId(),
        name: names[utilService.getRandomIntInclusive(0, names.length - 1)],
        inStock: Math.random() < 0.5 ? true : false,
        labels: [LABELS[utilService.getRandomIntInclusive(0, LABELS.length - 1)]],
        imgUrl: `https://robohash.org/${i + 1}?set=set3`,
        price: utilService.getRandomIntInclusive(30, 250),
        createdAt: Date.now()
    }
}




