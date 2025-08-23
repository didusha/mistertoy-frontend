import { userService } from '../services/user.service.js'
import { ReviewPreview } from './ReviewPreview.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export function ReviewList({ reviews, onRemoveReview , showAboutToy }) {

    function shouldShowActionBtns(review) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return review.byUser?._id === user._id
    }

    return <section>
        <ul className="review-list">
            {reviews?.map(review =>
                <li key={review._id}>
                    {shouldShowActionBtns(review) &&
                        <button className="btn-delete" onClick={() => onRemoveReview(review._id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    }
                    <ReviewPreview review={review} showAboutToy={showAboutToy}/>
                </li>)
            }
        </ul>
    </section>
}