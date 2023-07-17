import "../css/home.css"
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import * as api from '../Api.jsx'
import Slider from "react-slick";
import usePostQuery from '../useHooks/usePostQuery'
import { Link, useNavigate } from "react-router-dom"

export default function Home() {
  const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/"
  const [dragging, setDragging] = useState(false);

  const postsQuery = () => ({
    queryKey: ['postsF'],
    queryFn: api.getPostsFeatured,
    cacheTime: Infinity,
    staleTime: Infinity,
  })
  const { data: posts, isLoading, isError } = useQuery(postsQuery())

  if (isLoading) {
    return ''
  }
  if (isError) {
    return ''
  }
  usePostQuery(posts)

  var settings = {
    initialSlide: Math.floor(Math.random() * 3),
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    afterChange: () => setDragging(false),
    onSwipe: () => setDragging(true)
  }

  return (
    <>
      <div className="home">
        <div className="home-desktop">
          <div className="post-wrapper">
            <Slider {...settings}>
              {posts.map(post => (
                <div key={post._id} className="spost">
                  <div className="hover">
                    <h4 className="hovertitle">{post.title}</h4>
                    <p className="hovertext">
                      {(post.desc).split(/\r?\n/).slice(0, post.desc.split(/\r?\n/).length / 2).join("\n")}
                      <br />
                      <span style={{ fontSize: 25 }}>{(post.desc).split(/\r?\n/).slice(post.desc.split(/\r?\n/).length / 2, post.desc.split(/\r?\n/).length).join("\n")}</span>
                    </p>
                  </div>
                  <Link
                    className="slider-link"
                    to={`/post/${post.slug}`}
                    onClick={(e) => dragging && e.preventDefault()}
                    state={post} >
                    <img src={PF + post.photo + ".png"} alt="" className={"slider-image " + (post.comingsoon ? "grey" : "")} />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="home-mobile">
          {posts.slice(0, 3).map(post => (
            <div key={post._id} className="spost">
              <div className="hover">
                <h4 className="hovertitle">{post.title}</h4>
                <p className="hovertext">
                  {(post.desc).split(/\r?\n/).slice(0, post.desc.split(/\r?\n/).length / 2).join("\n")}
                  <br />
                  <span style={{ fontSize: 25 }}>{(post.desc).split(/\r?\n/).slice(post.desc.split(/\r?\n/).length / 2, post.desc.split(/\r?\n/).length).join("\n")}</span>
                </p>
              </div>
              <a className="slider-link" href={`/post/${post.slug}`}>
                <img src={PF + post.photo + ".png"} alt="" className={"slider-image " + (post.comingsoon ? "grey" : "")} />
              </a>
            </div>
          ))}
        </div>
        <p className="copyright">copyright streetlight 2023 // contact</p>
      </div>
    </>
  )
}
