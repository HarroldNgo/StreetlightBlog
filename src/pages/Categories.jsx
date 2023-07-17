import "../css/categories.css"
import * as api from "../Api"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {
    const { data: postsPeople } = useQuery(['postsPeople'], () => api.getPostCat("People"))
    const { data: postsMovies } = useQuery(['postsMovies'], () => api.getPostCat("Movies"))
    const { data: postsStories } = useQuery(['postsStories'], () => api.getPostCat("Stories"))


    return (
        <div className="categories-outer">
            <div className="new-category-wrapper">
                <img className="tree" src="/assets/pinktree.png" alt="about" />
                <img src="https://www.transparentpng.com/thumb/triangle/6OFaQ3-triangle-black-lines-clipart-hd.png" alt="triangle black lines clipart hd @transparentpng.com" className="triangle"></img>
                <Link to="/categories/people" className="category c1" state={postsPeople} >PEOPLE</Link>
                <Link to="/categories/movies" className="category c2" state={postsMovies} >MOVIES</Link>
                <Link to="/categories/stories" className="category c3" state={postsStories} >STORIES</Link>
                <div className="poetry"></div>
                <div className="movies"></div>
                <div className="stories"></div>
            </div>
        </div>
    )
}