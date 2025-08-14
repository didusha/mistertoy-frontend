import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Link, useParams } from "react-router-dom"
import { Popup } from "../cmps/Popup"
import { Chat } from "../cmps/Chat"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)


    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function openChat() {
        setIsChatOpen(true)
    }

    function closeChat() {
        setIsChatOpen(false)
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <div className="detail-container flex">
                <div>
                <h1>Toy Name : {toy.name}</h1>
                <h5>Price: ${toy.price}</h5>
                {!!toy.labels?.length && (
                    <p>Labels: <span>{toy.labels.join(' ,')}</span></p>
                )}
                <p className={toy.inStock ? 'green' : 'red'}>
                    {toy.inStock ? 'In stock' : 'Not in stock'}
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Animi voluptas cumque tempore, aperiam sed dolorum rem!
                    Nemo quidem, placeat perferendis tempora aspernatur sit,
                    explicabo veritatis corrupti perspiciatis repellat, enim
                    quibusdam!</p>
                    </div>
                <div>
                <img src={toy.imgUrl} alt="" />
                </div>
            </div>
            <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link className="btn" to={`/toy`}>Back</Link>
            {/* <p>
                <Link className="btn" to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
            <button className="chat-icon-btn" onClick={openChat}>💬</button>
            <Popup isOpen={isChatOpen}
                onClose={closeChat}
                heading={`Lets Chat!`}>
                <Chat />
            </Popup>

        </section >
    )
}