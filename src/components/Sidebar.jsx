import '../css/sidebar.css'
import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="left-sidebar">
            <ul>
                <li><Link to="/admin">Manage Posts</Link></li>
                <li><Link to="/admin/portfolio">Manage Portfolio</Link></li>
            </ul>
        </div>
    )
}
