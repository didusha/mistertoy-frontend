import { useEffect, useRef, useState } from "react"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_TYPING, SOCKET_EMIT_TYPING } from '../services/socket.service'
// import { useSelector } from "react-redux"
import { toyService } from "../services/toy.service"


export function Chat({ msgs, user, toyId }) {

    const [msgToSend, setMsgToSend] = useState({ txt: '' })
    const [typingUser, setTypingUser] = useState(null)
    const [toyMsgs, setToyMsgs] = useState(msgs)
    const [topic, setTopic] = useState(toyId)
    const chatEndRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
        socketService.on(SOCKET_EVENT_TYPING, handleTyping)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_TYPING, handleTyping)
        }
    }, [])

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    function handleTyping({ userName }) {
        if (userName !== user.fullname) {
            setTypingUser(userName)
            setTimeout(() => setTypingUser(null), 2000)
        }
    }

    function handleMsgChange(ev) {
        const { name: field, value } = ev.target
        setMsgToSend(msg => ({ ...msg, [field]: value }))
        socketService.emit(SOCKET_EMIT_TYPING, { userName: user.fullname })
    }

    function addMsg(newMsg) {
        setToyMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        const trimmed = msgToSend.txt.trim()
        if (!trimmed) return
        const newMsg = { txt: msgToSend.txt }
        try {
            const savedMsg = await toyService.addToyMsg(toyId, newMsg)
            // setToyMsgs(prevMsgs=> [...prevMsgs, savedMsg])  not needed as socket  will do the set and update for all include himself- no broadcast
            socketService.emit(SOCKET_EMIT_SEND_MSG, savedMsg)
            setMsgToSend({ txt: '' })
            console.log('Message saved')
        }
        catch (err) {
            console.log('Cannot save message')
        }
    }

    // async function onSend(msg) {
    //     try {
    //         const savedMsg = await toyService.addToyMsg(toyId, msg)
    //         // setMsgs(prevMsgs=> [...prevMsgs, msg])
    //         socketService.emit(SOCKET_EMIT_SEND_MSG, msg)
    //         showSuccessMsg('Message saved')
    //     } catch (err) {
    //         showErrorMsg('Cannot save message')
    //     }
    // }

    return (
        <section className="chat-container">
            <div className="chat-msgs">
                {toyMsgs?.map(msg => {
                    const isUser = msg.by._id === user._id
                    const position = isUser ? 'user' : 'other'

                    // console.log("🚀 ~ map ~ msg:", msg)
                    return (
                        <div key={msg.id} className={`chat-msg ${position}`}>
                            <strong>{msg.by.fullname === user.fullname ? 'Me' : msg.by.fullname}: </strong>
                            {msg.txt}
                        </div>
                    )
                })}
                {typingUser && (
                    <div className="typing">
                        <em>{typingUser} is typing…</em>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <form className="chat-form" onSubmit={sendMsg}>
                    <input
                        type="text"
                        name="txt"
                        value={msgToSend.txt}
                        onChange={handleMsgChange}
                        placeholder="Type a message..."
                        autoComplete="off"
                    />
                    <button className="btn btn-chat-send">Send</button>
                </form>
            </div>
        </section>
    )
}