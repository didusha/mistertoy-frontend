import { useState } from "react"

export function Chat() {

    const [msgs, setMsgs] = useState([])
    const [msgToSend, setMsgToSend] = useState('')

    function sendMsg(ev) {
        ev.preventDefault()
        if (!msgToSend.trim()) return

        const userMsg = { text: msgToSend, sender: 'user' }
        setMsgs(prevMsgs => [...prevMsgs, userMsg])
        setMsgToSend('')

        setTimeout(() => {
            const botMsg = { text: `You said: "${msgToSend}"`, sender: 'bot' }
            setMsgs(prevMsgs => [...prevMsgs, botMsg])
        }, 1000)
    }

    return (
           <section className="chat-container">
            <div className="chat-msgs">
                {msgs.map((msg, idx) => (
                    <div key={idx} className={`chat-msg ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <form className="chat-form" onSubmit={sendMsg}>
                    <input
                        type="text"
                        value={msgToSend}
                        onChange={ev => setMsgToSend(ev.target.value)}
                        placeholder="Type a message..."
                        autoComplete="off"
                    />
                    <button className="btn btn-chat-send">Send</button>
                </form>
            </div>
        </section>
    )
}