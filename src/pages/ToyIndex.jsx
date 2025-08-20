
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        }
        catch(err){
                showErrorMsg('Cannot remove toy')
            }
        }

        return (
            <div>
                <main>
                    {/* <button className='add-btn' onClick={onAddToy}>Add Random Toy ⛐</button> */}
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    {!isLoading ?
                        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                        : <div>Loading...</div>
                    }
                    <hr />
                </main>
            </div>
        )
    }

