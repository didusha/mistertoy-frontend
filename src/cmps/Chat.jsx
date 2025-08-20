import { useEffect, useRef, useState } from "react"

export function Chat({ msgs, user, onSend }) {

    const [msgToSend, setMsgToSend] = useState({ txt: '' })
    const chatEndRef = useRef(null)

    useEffect(() => {
        scrollToBottom()
    }, [msgs])

    function scrollToBottom() {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    function handleMsgChange(ev) {
        const { name: field, value } = ev.target
        setMsgToSend(msg => ({ ...msg, [field]: value }))
    }

    function sendMsg(ev) {
        ev.preventDefault()

        const trimmed = msgToSend.txt.trim()
        if (!trimmed) return
        onSend(msgToSend)
        setMsgToSend({ txt: '' })
    }

    return (
        <section className="chat-container">
            <div className="chat-msgs">
                {msgs?.map(msg => {
                    const isUser = msg.by._id === user._id
                    const position = isUser ? 'user' : 'other'

                    return (
                        <div key={msg.id} className={`chat-msg ${position}`}>
                            <strong>{msg.by.fullname === user.fullname ? 'Me' : msg.by.fullname}: </strong>
                            {msg.txt}
                        </div>
                    )
                })}
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