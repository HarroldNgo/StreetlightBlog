import '../css/about.css'

export default function About() {
    return (
        <div className='about'>
            <div className="outer-about-wrapper">
                <div className="about-page-wrapper">
                    <div className="aboutus">
                        <h1 className='about-title'><span className='welcome'>Welcome to</span><span className='streetlight'> Streetlight</span></h1>
                        <p className='about-desc'>
                            Hi! Welcome to Streetlight we aim to inspire and motivate our readers to take action towards living their best life. We relate to iconic characters and personalities in our lives to share personal stories of growth and transformation, offering practical tips for how to achieve your goals and overcome obstacles. We believe that everyone has the potential to create a life they love, and we are here to help you do just that!
                        </p>
                        <p className='about-credit'></p>
                    </div>
                    <div className='about-image'>
                        <img src="/assets/about.jpg" alt="about" />
                    </div>
                </div>
            </div>
        </div>
    )
}