import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function ReviewPreview({ review, showAboutToy }) {

    const { byUser, aboutToy } = review
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return <article className="review-preview">
        <p className='review-date'>{new Date(review.createdAt).toLocaleString()}</p>

        {showAboutToy && (
            <p>
                <span>About: </span>
                <Link className="review-link" to={`/toy/${aboutToy._id}`}>
                    {aboutToy.name}
                </Link>
            </p>
        )}
            <p>
                <span>By: </span>
                <Link className="review-link" to={`/user/${byUser._id}`}>
                    {byUser.fullname}
                </Link>
            </p>
        <pre className="review-txt">{review.txt}</pre>
    </article>
}