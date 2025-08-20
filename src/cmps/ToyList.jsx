import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ToyPreview } from "./ToyPreview.jsx"
import { useSelector } from 'react-redux'


export function ToyList({ toys, onRemoveToy, onEditToy }) {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    {user?.isAdmin &&
                    <div>
                        <button className="btn-delete-toy" onClick={() => onRemoveToy(toy._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>
                    }
                </li>)}
        </ul>
    )
}