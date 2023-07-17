import "../css/singlepost.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import ReactPlayer from 'react-player/youtube'
import {Helmet} from "react-helmet";

import * as api from '../Api.jsx'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/";
    let post = location.state;

    if (!post) {
        const postQuery = (slug) => useQuery(['post', slug], () => api.getPostByTitleSlug(slug))
        const { data, isLoading, isError, error } = postQuery(path)
        if (isLoading) {
            return ''
        }
        if (isError) {
            return ''
        }
        post = data[0]
    }


    return (
        <div className="outer">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{post.title}</title>
                <meta name="description" content={post.metadesc} />
            </Helmet>
            <div className="singlepost">
                <div className="postimage" id="postimage">
                    {post.photo && (
                        <img src={PF + post.photo + ".png"} alt="" className="single-postimage" />
                    )}
                    <p className="desc">{post.desc.split(/\r?\n/).slice(0, post.desc.split(/\r?\n/).length / 2).join("\n")}
                        <br />
                        <span className="desc-secondary">{(post.desc).split(/\r?\n/).slice(post.desc.split(/\r?\n/).length / 2, post.desc.split(/\r?\n/).length).join("\n")}</span>
                    </p>
                </div>
                <div className="postbody">
                    <h1 className="post-title">{post.title}</h1>
                    {post.videolink && (
                        <div className="post-video">
                            <ReactPlayer width={560} height={315} url={post.videolink} controls="true" />
                        </div>
                    )}
                    <p className="paragraph">{post.body}</p>
                </div>
            </div>
        </div>

    )
}
