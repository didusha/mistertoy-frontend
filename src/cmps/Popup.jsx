import { useEffect } from "react"
import { Link } from "react-router-dom"

export function Popup({ isOpen, onClose, heading, footer, children }) {

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
        <>
            <div className="popup-overlay" onClick={onClose}></div>
            <article className="popup">
                <header className="popup-header">
                    {heading}
                    <button className="popup-close-btn" onClick={onClose}>✕</button>
                </header>

                <main className="popup-main">{children}</main>

                <footer className="popup-footer">
                    {footer}
                </footer>
            </article>
        </>
    )
}