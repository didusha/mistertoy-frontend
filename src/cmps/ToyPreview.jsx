import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export function ToyPreview({ toy }) {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <article>
            <h4><Link title={`Check out toy: ${toy._id}`} to={`/toy/${toy._id}`}>{toy.name}</Link></h4>
            <img src={toy.imgUrl}></img>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p><span className={toy.inStock ? 'green' : 'red'}>{toy.inStock ? 'In Stock' : "Out of Stock"}</span></p>

            <hr />
            {user?.isAdmin &&
                <>
                    <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                    <Link className="btn" title={`Check out toy: ${toy._id}`} to={`/toy/${toy._id}`}>Details</Link>
                </>
            }
        </article>
    )
}

