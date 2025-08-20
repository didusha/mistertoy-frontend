import { reviewService } from '../../services/review.service.js'

import { store } from '../store'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS } from '../reducers/review.reducer.js'
// import { SET_SCORE } from '../reducers/user.reducer'

export async function loadReviews(toyId) {
	try {
		const reviews = await reviewService.query(toyId)
		store.dispatch({ type: SET_REVIEWS, reviews })
	} catch (err) {
		console.log('ReviewActions: err in loadReviews', err)
		throw err
	}
}

export async function addReview(review) {
	try {
		const addedReview = await reviewService.add(review)
		store.dispatch({ type: ADD_REVIEW, addedReview })
		// const { score } = addedReview.byUser
		// store.dispatch({ type: SET_SCORE, score })
	} catch (err) {
		console.log('ReviewActions: err in addReview', err)
		throw err
	}
}

export async function removeReview(reviewId) {
	try {
		await reviewService.remove(reviewId)
		store.dispatch({ type: REMOVE_REVIEW, reviewId })
	} catch (err) {
		console.log('ReviewActions: err in removeReview', err)
		throw err
	}
}
// Command Creators
// export function getActionRemoveReview(reviewId) {
// 	return 
// }
// export function getActionAddReview(review) {
// 	return { type: ADD_REVIEW, review }
// }
