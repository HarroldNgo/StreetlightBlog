import "../css/categories.css"

export default function Categories() {

    return (
        <div className="categories-outer">
            <div className="new-category-wrapper">
                <img className="tree" src="/assets/pinktree.png" alt="about" />
                <img src="https://www.transparentpng.com/thumb/triangle/6OFaQ3-triangle-black-lines-clipart-hd.png" alt="triangle black lines clipart hd @transparentpng.com" className="triangle"></img>
                <a href="/categories/People" className="category c1">PEOPLE</a>
                <a href="/categories/Movies" className="category c2">MOVIES</a>
                <a href="/categories/Stories" className="category c3">STORIES</a>
                <div className="poetry"></div>
                <div className="movies"></div>
                <div className="stories"></div>
            </div>
        </div>
    )
}