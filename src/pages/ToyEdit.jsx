import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'

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
            .then(setToyToEdit)                              //same: toy => setToyToEdit(toy)
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function customHandleChange(ev, handleChange) {
        handleChange(ev)
        setHasUnsavedChanges(true)
    }

    function onSaveToy(toyToEdit, { resetForm }) {

        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                resetForm()
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    const ToySchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!'),
        price: Yup.number()
            .required('Price is required')
            .min(1, 'Price must be at least 1'),
        inStock: Yup.boolean(),
        labels: Yup.array().of(Yup.string()),
    })

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} New Toy</h2>

            <Formik
                enableReinitialize
                initialValues={toyToEdit}
                validationSchema={ToySchema}
                onSubmit={onSaveToy} >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Name"
                            name="name"
                            value={values.name}
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            onChange={e => customHandleChange(e, handleChange)}  //dont need handle change function in formik - adding this because of setHasUnsavedChanges hook 
                        />

                        <Field
                            as={TextField}
                            label="Price"
                            type="number"
                            name="price"
                            inputProps={{ min: 1 }}
                            value={values.price}
                            margin="normal"
                            error={touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
                            onChange={e => customHandleChange(e, handleChange)}  //dont need handle change function in formik - adding this because of setHasUnsavedChanges hook 
                        />
                        <FormControl margin="normal" style={{ minWidth: '20vw' }} variant="outlined">
                            <InputLabel id="labels-label">Labels</InputLabel>
                            <Select
                                labelId="labels-label"
                                id="labels"
                                multiple
                                name="labels"
                                value={values.labels}
                                onChange={e => customHandleChange(e, handleChange)}
                                renderValue={selected => selected.join(', ')}
                                label="Labels"
                            >
                                {labels.map(label => (
                                    <MenuItem key={label} value={label}>
                                        <Checkbox checked={values.labels.includes(label)} />
                                        <ListItemText primary={label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="inStock"
                                    checked={values.inStock}
                                    onChange={ev => setFieldValue('inStock', ev.target.checked)}
                                />
                            }
                            label="In stock"
                        />
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {toyToEdit._id ? 'Save' : 'Add'}
                            </Button>
                            <Link className="btn" to="/toy">Cancel</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}




//    <label>in stock</label>
//     <input
//         type="checkbox"
//         name='inStock'
//         checked={toyToEdit.inStock}
//     // onChange={toggleInStock}
//     />

//     <label>Labels:</label>
//     <div className="labels-container">
//         {labels.map(label => (
//             <div key={label}>
//                 <input
//                     type="checkbox"
//                     id={label}
//                     value={label}
//                     checked={labels?.includes(label)}
//                     onChange={handleChange}
//                 />
//                 <label htmlFor={label}>{label}</label>
//             </div>
//         ))}
//     </div>