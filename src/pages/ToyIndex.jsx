
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service-local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    // console.log("🚀 ~ ToyIndex ~ filterBy:", filterBy)


    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
           const toy = {
            name: prompt('toy name?'),
            price: +prompt('Toy price?'),
        }
        saveToy(toy)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    return (
        <div>
            <main>                
                {/* <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button> */}
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <Link className='btn' to="/toy/edit">Add Toy</Link>
                {!isLoading ?
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}

