import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={toy.imgUrl}></img>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <hr />
            <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link className="btn" title={`Check out toy: ${toy._id}`} to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}