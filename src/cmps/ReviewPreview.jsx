import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { byUser, aboutToy } = review

    return <article className="review-preview">
        {/* <p>About:{aboutToy.name}</p> */}
        <p className="review-txt">{review.txt}</p>
        <p className="review-by">By: <Link to={`/user/${byUser._id}`}>{byUser.fullname}</Link></p>
    </article>
}

        // <p>About: <Link to={`/toy/${aboutToy._id}`}>{aboutToy.name}</Link></p>
