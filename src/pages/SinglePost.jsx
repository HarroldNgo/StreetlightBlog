import "../css/singlepost.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import ReactPlayer from 'react-player/youtube'

import * as api from '../Api.jsx'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/"

    const postQuery = (id) => useQuery(['post', id], () => api.getPost(id))

    const { data: post, isLoading, isError, error } = postQuery(path)
    if (isLoading) {
        return ''
    }
    if (isError) {
        return ''
    }

    return (
        <div className="outer">
            <div className="singlepost">
                <div className="postimage" id="postimage">
                    {post[0].photo && (
                        <img src={PF + post[0].photo + ".png"} alt="" className="single-postimage" />
                    )}
                    <p className="desc">{post[0].desc.split(/\r?\n/).slice(0, post[0].desc.split(/\r?\n/).length / 2).join("\n")}
                        <br />
                        <span className="desc-secondary">{(post[0].desc).split(/\r?\n/).slice(post[0].desc.split(/\r?\n/).length / 2, post[0].desc.split(/\r?\n/).length).join("\n")}</span>
                    </p>
                </div>
                <div className="postbody">
                    <h1 className="post-title">{post[0].title}</h1>
                    {post[0].videolink && (
                        <div className="post-video">
                            <ReactPlayer width={560} height={315} url={post[0].videolink} controls="true" />
                        </div>
                    )}
                    <p className="paragraph">{post[0].body}</p>
                </div>
            </div>
        </div>

    )
}
