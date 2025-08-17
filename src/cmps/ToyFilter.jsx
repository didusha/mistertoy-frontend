import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 300)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked ? -1 : 1
                break

            // case 'select-multiple':
            //     const selectedValues = []
            //     for (let i = 0; i < target.selectedOptions.length; i++) {
            //         selectedValues.push(target.selectedOptions[i].value)
            //     }
            //     value = selectedValues
            //     break

            default:
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { txt, maxPrice, inStock, labels, sortField, sortDir } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form >

                <InputLabel htmlFor="name">Name</InputLabel>
                <TextField
                    type="text"
                    id="name"
                    name="txt"
                    placeholder="Search"
                    value={txt}
                    onChange={handleChange}
                />

                <InputLabel htmlFor="maxPrice">Max price</InputLabel>
                <TextField
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="Max price"
                    value={maxPrice || ''}
                    onChange={handleChange}
                />

                <InputLabel className="select-instock" id="inStock">In Stock</InputLabel>
                <Select id="inStock" name="inStock" value={inStock} onChange={handleChange} size="small" style={{ width: 170 }}>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="true">In Stock</MenuItem>
                    <MenuItem value="false">Out of Stock</MenuItem>
                </Select>

                <InputLabel>Labels</InputLabel>
                <Select
                    className="select-labels"
                    labelId="labels"
                    id="labels"
                    name="labels"
                    label
                    multiple
                    value={labels}
                    onChange={handleChange}
                    size="small" style={{ width: 170 }}
                >
                    <MenuItem value="art">Art</MenuItem>
                    <MenuItem value="puzzle">Puzzle</MenuItem>
                    <MenuItem value="baby">Baby</MenuItem>
                    <MenuItem value="doll">Doll</MenuItem>
                    <MenuItem value="on-wheels">On wheels</MenuItem>
                    <MenuItem value="box-game">Box game</MenuItem>
                    <MenuItem value="outdoor">Outdoor</MenuItem>
                    <MenuItem value="battery-powered">Battery Powered</MenuItem>
                </Select>

                 <InputLabel htmlFor="sortField">Sort by</InputLabel>
                <Select
                    className="select-sort-by"
                    id="sortField"
                    name="sortField"
                    value={sortField}
                    selected={sortField}
                    onChange={handleChange}
                    size="small" 
                    style={{ width: 170 }}
                >
                    <MenuItem value="">Select sort</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="createdAt">Created At</MenuItem>
                </Select>


                <div className="sort-dir">
                <InputLabel><span>Sort direction</span></InputLabel>
                <input className="checkbox" type="checkbox" name="sortDir" checked={sortDir < -0} onChange={handleChange} />
                </div>

            </form>
            <Link className='btn btn-add-toy' to="/toy/edit">Add Toy</Link>
        </section >
    )
}

//                  <select id="inStock" name="inStock" value={inStock === undefined ? '' : inStock} onChange={handleChange}>
//                     <option value="">All</option>
//                     <option value="true">In Stock</option>
//                 </select>

//                 <label htmlFor="labels">Labels:</label>
//                 <select name="labels" multiple value={labels} onChange={handleChange}>
//                     <option value="art">Art</option>
//                     <option value="puzzle">Puzzle</option>
//                     <option value="baby">Baby</option>
//                     <option value="doll">Doll</option>
//                     <option value="on-wheels">On wheels</option>
//                     <option value="box-game">Box game</option>
//                     <option value="outdoor">Outdoor</option>
//                     <option value="battery-powered">Battery Powered</option>
//                 </select>


{/* <InputLabel htmlFor="inStock">In Stock:</InputLabel>
                <Select size="small" style={{ width: 170 }} id="inStock" name="inStock" value={inStock === undefined ? '' : inStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                </Select> */}
