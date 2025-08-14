import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

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
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        name="txt"
                        placeholder="Search"
                        value={txt}
                        onChange={handleChange}
                    />

                    <label htmlFor="maxPrice">Max price:</label>
                    <input type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="By max price"
                        value={maxPrice || ''}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="inStock">In Stock:</label>
                    <select id="inStock" name="inStock" value={inStock === undefined ? '' : inStock} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select> */}

                    <InputLabel className="select-instock" style={{ display: 'contents' }} id="inStock">In Stock</InputLabel>
                    <Select id="inStock" name="inStock" value={inStock} onChange={handleChange}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="true">In Stock</MenuItem>
                        <MenuItem value="false">Out of Stock</MenuItem>
                    </Select>

                    {/* <label htmlFor="labels">Labels:</label>
                    <select name="labels" multiple value={labels} onChange={handleChange}>
                        <option value="art">Art</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="baby">Baby</option>
                        <option value="doll">Doll</option>
                        <option value="on-wheels">On wheels</option>
                        <option value="box-game">Box game</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="battery-powered">Battery Powered</option>
                    </select> */}

                    <InputLabel labelId="labels" style={{ display: 'contents' }}>Labels</InputLabel>
                    <Select
                        className="select-labels"
                        labelId="labels"
                        id="labels"
                        name="labels"
                        label
                        multiple
                        value={labels}
                        onChange={handleChange}
                    // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    // renderValue={(selected) => (
                    //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    //         {selected.map((value) => (
                    //             <Chip key={value} label={value} />
                    //         ))}
                    //     </Box>
                    // )}
                    // MenuProps={MenuProps}
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

                    <div>
                        <label htmlFor="sortField">Sort by:</label>
                        <select id="sortField" name="sortField" value={sortField} selected={sortField} onChange={handleChange}>
                            <option value="">Select sort</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="createdAt">Created At</option>
                        </select>
                        <label><span>⬇</span>
                            <input type="checkbox" name="sortDir" checked={sortDir < -0} onChange={handleChange} />
                        </label>
                    </div>
                </div>
            </form>
        </section>
    )
}