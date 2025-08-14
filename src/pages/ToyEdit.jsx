import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const isOnline = useOnlineStatus()
    const setHasUnsavedChanges = useConfirmTabClose()

    const labels = toyService.getToyLabels()


    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)        //same: toy => setToyToEdit(toy)
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        setHasUnsavedChanges(true)
    }

    function handleLabelChange({ target }) {
        const value = target.value
        setToyToEdit(prevToy => {
            const newLabels = prevToy.labels.includes(value)
                ? prevToy.labels.filter(label => label !== value)
                : [...prevToy.labels, value]
            return { ...prevToy, labels: newLabels }
        })
        setHasUnsavedChanges(true)
    }

    function toggleInStock() {
        setToyToEdit((prev) => ({ ...prev, inStock: !prev.inStock }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 1000
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

        const { name, price, labels: selectedLabels } = toyToEdit

    return (
        <>
            <div></div>
            <section className="toy-edit">
                <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

                <form onSubmit={onSaveToy} >
                    <label htmlFor="name">Name : </label>
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder="Enter name..."
                        value={name}
                        onChange={handleChange}
                    />
                    <label htmlFor="price">Price : </label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={handleChange}
                    />

                    <label>in stock</label>
                    <input
                        type="checkbox"
                        name='inStock'
                        checked={toyToEdit.inStock}
                        onChange={toggleInStock}
                    />

                    <label>Labels:</label>
                    <div className="labels-container">
                        {labels.map(label => (
                            <div key={label}>
                                <input
                                    type="checkbox"
                                    id={label}
                                    value={label}
                                    checked={selectedLabels?.includes(label)}
                                    onChange={handleLabelChange}
                                />
                                <label htmlFor={label}>{label}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <Link className="btn" to="/toy">Cancel</Link>
                    </div>
                    <section>
                        <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
                    </section>
                </form>
            </section>
        </>
    )
}


