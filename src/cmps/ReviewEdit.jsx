import { useState } from "react"
import { useSelector } from "react-redux"

import { addReview } from "../store/actions/review.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ReviewEdit({toyId}) {
	// const users = useSelector(storeState => storeState.userModule.users)
	const [reviewToEdit, setReviewToEdit] = useState({ txt: '' })

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewToEdit({ ...reviewToEdit, [name]: value })
	}

	async function onAddReview(ev) {
		ev.preventDefault()
		reviewToEdit.aboutToyId = toyId
		if (!reviewToEdit.txt || !reviewToEdit.aboutToyId) return 

		try {
			await addReview(reviewToEdit)
			showSuccessMsg('Review added')
			setReviewToEdit({ txt: '' })
		} catch (err) {
			showErrorMsg('Cannot add review')
		}
	}

	return <form className="review-edit" onSubmit={onAddReview}>
		<textarea name="txt" onChange={handleChange} value={reviewToEdit.txt}></textarea>
		<button>Add</button>
	</form>

}