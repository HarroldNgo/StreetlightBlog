import { Link } from "react-router-dom"

export default function Missing() {
  return (
    <article className="missing">
            <h1>Page not found!</h1>
            <div className="flexGrow">
            Visit Our <Link className="yellow" to="/">Home Page</Link>
            </div>
        </article>
  )
}
