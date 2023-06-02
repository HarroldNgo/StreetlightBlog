import '../css/dropdown.css'
import { useState, useEffect } from 'react'

export default function DropDown({ selected, setSelected }) {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className="dropdown" style={{color: "#000"}}>
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {selected ? selected : "Pick One"}
                <i className="fa-solid fa-caret-down"></i>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    <div className="dropdown-item" onClick={(e) => {
                        setSelected("People")
                        setIsActive(false)}}>
                        People
                    </div>
                    <div className="dropdown-item" onClick={(e) => {
                        setSelected("Movies")
                        setIsActive(false)}}>
                        Movies
                    </div>
                    <div className="dropdown-item" onClick={(e) => {
                        setSelected("Stories")
                        setIsActive(false)}}>
                        Stories
                    </div>
                    <div className="dropdown-item" onClick={(e) => {
                        setSelected("test")
                        setIsActive(false)}}>
                        test
                    </div>
                </div>

            )}
        </div>
    )
}
