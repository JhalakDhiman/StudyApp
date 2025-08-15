import React from 'react';
import ContactForm from '../components/core/ContactPage/ContactForm';
import HighlightedText from '../components/core/HomePage/HighlightedText'
import about1 from '../assets/Images/aboutus1.webp'
import about2 from '../assets/Images/aboutus2.webp'
import about3 from '../assets/Images/aboutus3.webp'
import foundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div className="w-full">

            {/* section1 */}
            <section className="bg-richblack-700 pt-20 pb-40 flex justify-center">
                <div className="w-11/12 flex flex-col gap-10">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="text-white font-semibold text-center text-4xl">
                            <h1>Driving Innovation in Online Education for a</h1>
                            <HighlightedText text="Brighter Future" />
                        </div>
                        <p className="text-richblack-300 w-[70%] font-semibold text-[17px] text-center">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                    <div className="relative">
                        <img className="absolute lg:left-0" src={about1}></img>
                        <img className="absolute lg:left-[34.5%] lg:visible md:visible invisible" src={about2}></img>
                        <img className="absolute lg:right-0 lg:visible invisible" src={about3}></img>
                    </div>
                </div>
            </section>

            {/* section2 */}
            <section className="pt-56 pb-20 w-11/12 mx-auto">
                <p className="font-semibold lg:text-4xl text-2xl text-center text-white">We are passionate about revolutionizing the way we learn. Our<br /> innovative platform <HighlightedText text="combines technology"/>,
                    <span className="bg-gradient-to-b from-yellow-400 via-yellow-200  to-yellow-5 font-bold text-transparent bg-clip-text">
                        expertise
                    </span>
                    , and community to create an
                    <span className="bg-gradient-to-b font-bold from-pink-500 via-pink-300 to-pink-50 text-transparent bg-clip-text">
                        {" "}
                        unparalleled educational experience.
                    </span></p>
            </section>

            {/* section3 */}
            <section className="border-t-[1px] border-richblack-700">
                <div className="w-11/12 mx-auto my-32">

                    <div className="flex lg:flex-row flex-col justify-between lg:gap-0 gap-4 mb-32">
                        <div className="flex flex-col gap-6 lg:w-[50%]">
                            <h1 className="font-semibold text-4xl pb-1 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text ">Our Founding Story</h1>
                            <p className="text-[16px] text-richblack-200 font-semibold">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-[16px] text-richblack-200 font-semibold">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        <div className="flex justify-center ">
                            <img src={foundingStory} className="w-[450px] h-[270px] shadow-[-1px_-1px_15px_0px] shadow-[#fd1d1db9]"></img>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-52 justify-between">
                        <div className="flex flex-col gap-8">
                            <h1 className="font-semibold text-4xl bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-50  text-transparent bg-clip-text">Our Vision</h1>
                            <p className="text-[16px] text-richblack-200 font-semibold">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        <div className="flex flex-col gap-8">
                            <h1 className="font-semibold text-4xl"><HighlightedText text="Our Mission"/></h1>
                            <p className="text-[16px] text-richblack-200 font-semibold">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* section4 */}
            <Stats/>

            {/* section5 */}
            <LearningGrid/>

            {/* section6 */}
            <div className="flex flex-col items-center gap-4 my-24">
                <h1 className="font-bold text-richblack-5 text-4xl">Get in Touch</h1>
                <p className="font-semibold text-[16px] text-richblack-300">We'd love to here for you, Please fill out this form</p>
                <ContactForm />
            </div>

            {/* review section */}
            <section className="flex flex-col gap-1 items-center w-11/12 mx-auto justify-center mb-24">
                <h1 className="font-semibold text-4xl text-richblack-25">Review from other Learners</h1>
                <ReviewSlider/>
            </section>

            <Footer/>
        </div>
    )
}

export default About;