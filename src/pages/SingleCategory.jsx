import React from 'react'
import "../css/singlecategory.css"
import { useLocation } from "react-router";
import * as api from "../Api"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Poetry from '/assets/Poetry.mp4'
import Movies from '/assets/Movies.mp4'
import Stories from '/assets/Stories.mp4'
import PoetryM from '/assets/PoetryM.mp4'
import MoviesM from '/assets/MoviesM.mp4'
import StoriesM from '/assets/StoriesM.mp4'

export default function SingleCategory() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    let posts = location.state;

    if (!posts) {
        const postQuery = (cat) => useQuery(['post', cat], () => api.getPostCat(cat))
        const { data, isLoading, isError, error } = postQuery(path)
        if (isLoading) {
            return ''
        }
        if (isError) {
            return ''
        }
        posts = data
    }

    return (
        <div className='outer-singlecat'>
            <div className='singlecat-wrapper'>
                <div className="singlecat-posts" style={{ height: `${posts.length * 14}vh` }}>
                    <video autoPlay muted loop id="myVideo" className='myVideo desktop'>
                        <source src={path === "Poetry" ? Poetry : path === "Movies" ? Movies : Stories} type="video/mp4" />
                    </video>
                    <video autoPlay muted loop id="myVideo" className='myVideo mobile'>
                        <source src={path === "Poetry" ? PoetryM : path === "Movies" ? MoviesM : StoriesM} type="video/mp4" />
                    </video>
                    <div className="singlecat-inner-wrapper">
                        {posts.map((p, i) => (
                            <p key={i} className='singlecats' ><Link className='singlecatslink' to={`/post/${p.slug}`} state={p} >{p.title}</Link></p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
