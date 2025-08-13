
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

const STORAGE_KEY = 'toyDB'
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
    getStoreLocations,
    setStoreLocations,
}

function query(filterBy = {}) {
            // console.log("🚀 ~ query ~ filterBy:", filterBy)
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let filteredToys = [...toys]
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                filteredToys = filteredToys.filter(toy => regExp.test(toy.name))

            }
            if (filterBy.maxPrice) {
                filteredToys = filteredToys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            if (filterBy.labels && filterBy.labels.length > 0) {
                filteredToys = filteredToys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label.toLowerCase())))
            }

            if (filterBy.inStock === 'true') {
                filteredToys = filteredToys.filter(toy => toy.inStock === true)
            } else if (filterBy.inStock === 'false') {
                filteredToys = filteredToys.filter(toy => toy.inStock === false)
            }

            if (filterBy.sortField) {
                if (filterBy.sortField === 'createdAt') {
                    filteredToys.sort((b1, b2) => (b1.createdAt - b2.createdAt) * filterBy.sortDir)
                } else if (filterBy.sortField === 'price') {
                    filteredToys.sort((b1, b2) => (b1.price - b2.price) * filterBy.sortDir)
                } else if (filterBy.sortField === 'name') {
                    filteredToys.sort((b1, b2) => b1.name.localeCompare(b2.name) * filterBy.sortDir)
                }
            }
            return filteredToys
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
    return { txt: '', maxPrice: '', labels: [], inStock: 'all', sortField: '', sortDir: 1, createdAt: null }
}

function getToyLabels() {
    return [...LABELS]
}

function _createToys() {
    let toys = localStorage.getItem(STORAGE_KEY)
    if (!toys || !toys.length) {
        console.log("🚀 ~ _createToys ~ toys:")

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

function getStoreLocations(){
    let storeLocations = localStorage.getItem(LOCATIONS_KEY)
    return storeLocations ? JSON.parse(storeLocations) : []
}

function setStoreLocations(storeLocations){
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(storeLocations))
}

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

// TEST DATA
// storageService.post(STORAGE_KEY,
// {name: 'Pikachu' , price: 200, imgUrl: `https://robohash.org/1?set=set3`}).then(x => console.log(x))


// function downloadToys(toys) {
//     const data = JSON.stringify(toys, null, 2) // pretty JSON
//     const blob = new Blob([data], { type: 'text/plain' })
//     const url = URL.createObjectURL(blob)

//     const a = document.createElement('a')
//     a.href = url
//     a.download = 'toys.txt'
//     a.click()

//     URL.revokeObjectURL(url)
// }