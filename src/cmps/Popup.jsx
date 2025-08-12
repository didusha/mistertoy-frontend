import { useEffect } from "react"
import { Link } from "react-router-dom"

export function Popup({ isOpen, onClose, header, footer, children }) {

    useEffect(() => {
        if (!isOpen) return
        function onKeyDown(ev) {
            if (ev.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [isOpen, onClose])


    if (!isOpen) return null
    return (
        <article className="popup">
           
            <header className="popup-header">
                {header}
                <button className="popup-close-btn" onClick={onClose}>✕</button>
            </header>
            
            <main className="popup-main">{children}</main>
            
            <footer className="popup-footer">
                {footer}
                <input type="text" placeholder="Type a message..." />
                <button className="btn-send-popup">Send</button>
            </footer>

        </article>
    )
}