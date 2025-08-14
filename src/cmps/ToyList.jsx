import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button className="btn-delete-toy" onClick={() => onRemoveToy(toy._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>
                </li>)}
        </ul>
    )
}