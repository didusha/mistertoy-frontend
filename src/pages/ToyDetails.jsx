import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Link, useParams } from "react-router-dom"
import { Popup } from "../cmps/Popup"
import { Chat } from "../cmps/Chat"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ReviewList } from "../cmps/ReviewList"
import { loadReviews, removeReview } from "../store/actions/review.actions"
import { ReviewEdit } from "../cmps/ReviewEdit"



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [isChatOpen, setIsChatOpen] = useState(false)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        if (toyId) loadToy()
        loadReviews({aboutToyId: toyId})
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        }
        catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    function openChat() {
        setIsChatOpen(true)
    }

    function closeChat() {
        setIsChatOpen(false)
    }

    async function onRemoveReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (err) {
            showErrorMsg('Cannot remove')
        }
    }

    if (!toy) return <div>Loading...</div>
    if (!reviews) return <div>Loading reviews...</div>
    return (
        <section className="toy-details">
            <div className="details-container">
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
                <img src={toy.imgUrl} alt="" />
            </div>
            <div>
                <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link>
                <Link className="btn" to={`/toy`}>Back</Link>
            </div>
            <hr></hr>

            <div className="review-container">
                {user && <ReviewEdit toyId={toyId} />}
                <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} showAboutToy={false} />
            </div>

            <button className="chat-icon-btn" onClick={openChat}>💬</button>
            <Popup isOpen={isChatOpen}
                onClose={closeChat}
                heading={`Lets Chat!`}>
                <Chat msgs={toy.msgs || []} user={user} toyId={toyId} />
            </Popup>

        </section >
    )
}