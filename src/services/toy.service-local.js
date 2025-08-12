
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

const STORAGE_KEY = 'toyDB'
const LABELS = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    // getRandomToy,
    getDefaultFilter,
    getToyLabels,
}

function query(filterBy = {}) {
    // console.log("🚀 ~ query ~ filterBy:", filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))

            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            if (filterBy.labels && filterBy.labels.length > 0) {
                toys = toys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label)))
            }

            if (filterBy.inStock === 'true') {
                toys = toys.filter(toy => toy.inStock === true)
            } else if (filterBy.inStock === 'false') {
                toys = toys.filter(toy => toy.inStock === false)
            }

            if (filterBy.sortField) {
                if (filterBy.sortField === 'createdAt') {
                    toys.sort((b1, b2) => (b1.createdAt - b2.createdAt) * filterBy.sortDir)
                } else if (filterBy.sortField === 'price') {
                    toys.sort((b1, b2) => (b1.price - b2.price) * filterBy.sortDir)
                } else if (filterBy.sortField === 'name') {
                    toys.sort((b1, b2) => b1.name.localeCompare(b2.name) * filterBy.sortDir)
                }
            }

            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: '',
        imgUrl: `https://robohash.org/${utilService.getRandomIntInclusive(1, 10)}?set=set3`,
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

function _createToys() {
    let toys = storageService.query(STORAGE_KEY)
    if (!toys || !toys.length) {
        const names = ['Speedster Car', 'Coloring Kit', 'Baby Rattle', 'Puzzle Master',
            'Outdoor Explorer', 'Dollhouse Deluxe', 'Battery Bot', 'Box Game Challenge',
            'Artistic Easel', 'Mini Scooter']
        const toys = []
        for (let i = 0; i < 10; i++) {
            const toy = {
                _id: utilService.makeId(),
                name: names[utilService.getRandomIntInclusive(0, names.length - 1)],
                inStock: Math.random() < 0.5 ? true : false,
                labels: [LABELS[utilService.getRandomIntInclusive(0, LABELS.length - 1)]],
                imgUrl: `https://robohash.org/${i + 1}?set=set3`,
                price: utilService.getRandomIntInclusive(30, 250),
                createdAt: Date.now()
            }
            toys.push(toy)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
    }
}

// function getRandomToy() {
//     return {
//         name: 'Pikachu',
//         price: utilService.getRandomIntInclusive(30, 200),

//     }
// }
// TEST DATA
// storageService.post(STORAGE_KEY,
// {name: 'Pikachu' , price: 200, imgUrl: `https://robohash.org/1?set=set3`}).then(x => console.log(x))
// storageService.post(STORAGE_KEY,
// {name: 'Track' , price: 50, imgUrl: `https://robohash.org/2?set=set3`}).then(x => console.log(x))
// storageService.post(STORAGE_KEY,
// {name: 'Puzzle' , price: 100, imgUrl: `https://robohash.org/3?set=set3`}).then(x => console.log(x))
// storageService.post(STORAGE_KEY,
// {name: 'Lego' , price: 150, imgUrl: `https://robohash.org/4?set=set3`}).then(x => console.log(x))


