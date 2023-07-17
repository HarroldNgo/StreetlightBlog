import React from 'react'

const Modal = ({ DarkMode, open, onClose }) => {
    if (!open) return null;
    return (
        <div className="overlay">
            <div className="pop-up-container">
                <div style={DarkMode ? { background: "#000" } : {}} className="menu">
                    <a href="/">HOME</a>
                    <a href="/categories">CATEGORIES</a>
                    <a href="/portfolio">PORTFOLIO</a>
                    <a href="/about">ABOUT</a>
                </div>
                <p className="closeBtn" onClick={onClose}>X</p>
            </div>
        </div>
    )
}
export default Modal;