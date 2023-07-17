import { useState, useEffect } from 'react'
import '../css/portfolio.css'
import { useDarkMode } from "../useHooks/useDarkMode";
import { Link } from 'react-router-dom'
import * as api from "../Api"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from "react-router";
import { Swiper, EffectFade, Navigation } from 'swiper';
import Masonry from '@mui/lab/Masonry';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade'

export default function Portfolio() {
    const { isDark } = useDarkMode();
    const PF = "https://res.cloudinary.com/dmluqp41s/image/upload/"
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    let covers;
    const [title, setTitle] = useState('');
    const idToIndexMap = {}
    const indexToIdMap = {}
    const navigate = useNavigate();

    useEffect(()=>{

    },[])

    const coversQuery = () => ({
        queryKey: ['covers'],
        queryFn: api.getCovers,
    })
    const { data, isLoading, isError } = useQuery(coversQuery())
    if (isLoading) {
        return ''
    }
    if (isError) {
        return ''
    }
    covers = data;

    covers.forEach((cover, i) => {
        idToIndexMap[cover._id] = covers.length - i - 1;
        indexToIdMap[covers.length - i - 1] = cover._id;
    })

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        modules: [EffectFade, Navigation],
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        allowTouchMove: false,

        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        observer: true,
        observeParents: true,
        initialSlide: idToIndexMap[path],
    });

    swiper.on('slideChange', function () {
        window.history.replaceState(null, "", `/portfolio/${indexToIdMap[swiper.realIndex]}`)
    })

    const doesExist = (path !== undefined && idToIndexMap[path] != undefined)


    return (
        <div className='portfolio-wrapper' >
            <div className="portfolio-single-wrapper" id='portfolio-single-wrapper' style={doesExist ? { display: "block" } : { display: "none" }} >
                <div className="swiper">
                    <div className="swiper-wrapper">
                        {covers.map((cover, i) => (
                            <div key={i} className="swiper-slide">
                                <img className='portfolio-single-image' alt='' src={PF + cover.photo + ".png"} />
                                <div className='portfolio-caption-wrapper' style={isDark ? { background: '#000' } : { background: '#fff' }}>
                                    <div className="portfolio-caption-title">{cover.title}</div>
                                    <div className='portfolio-caption-prev' onClick={() => { document.querySelector('.swiper').swiper.slidePrev() }} >Prev</div>{" / "}
                                    <div className='portfolio-caption-next' onClick={() => { document.querySelector('.swiper').swiper.slideNext() }} >Next</div>
                                    <div className='portfolio-caption-back' onClick={() => {
                                        window.history.replaceState(null, "", `/portfolio`)
                                        document.getElementById("portfolio-single-wrapper").style.display = "none"
                                        document.getElementById("portfolio-gallery").style.display = "block" }}
                                    >Go back</div>
                                </div>
                                <div className="swiper-prev">{''}</div>
                                <div className="swiper-next">{''}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className="portfolio-gallery" id='portfolio-gallery' style={doesExist ? { display: "none" } : { display: "block" }}>
                <Masonry columns={{ sm: 1, md: 2 }} spacing={2}>
                    {covers.map((cover, i) => (
                        <div className="portfolio-gallery-cover" key={i} onClick={() => {
                            window.history.pushState(null, "", `/portfolio/${indexToIdMap[i]}`)
                            document.querySelector('.swiper').swiper.slideTo(i)
                            document.getElementById("portfolio-single-wrapper").style.display = "block"
                            document.getElementById("portfolio-gallery").style.display = "none"
                        }} >
                            <img className='cover-image' alt='' src={PF + cover.photo + ".png"}/>
                        </div>
                    ))}
                </Masonry>
            </div>

        </div>
    )
}
