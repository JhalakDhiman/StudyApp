import React from 'react'
import Button from '../components/core/HomePage/Button'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightedText from '../components/core/HomePage/HighlightedText';
import Banner from '../assets/Images/banner.mp4';
import CodedBlocks from '../components/core/HomePage/CodedBlocks';
import CardSection from '../components/core/HomePage/CardSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
    return (
        <div className="flex flex-col w-11/12 justify-center items-center">
            {/* section1 */}

                {/* section 1a */}
                
                <div className="flex flex-col gap-8 lg:w-[1000px] justify-center items-center pt-12">
                    <Link to='/signup'>
                        <div className="bg-richblack-700 hover:scale-95 transition-all duration-300 border-b-[1px] border-richblack-100 flex jutify-center items-center gap-3 px-5 py-3 font-bold rounded-full text-richblack-100 ">
                            Become an Instructor
                            <FaArrowRight />
                        </div>
                    </Link>
                    <div>
                        <h1 className="font-semibold text-4xl text-white text-center">
                            Empower Your Future With 
                            <HighlightedText text={"Coding Skills"} />
                        </h1>
                    </div>
                    <p className="font-bold text-richblack-25 text-center">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                    <div className="flex gap-6">
                        <Button linkTo={'/signup'} active={true}>Learn More</Button>
                        <Button linkTo={'/signup'} active={false}>Book a Demo</Button>
                    </div>
                
                </div>

                {/* video section */}

                <div className="mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]"
                     >
                        <source src={Banner} type="video/mp4"></source>
                     </video>
                </div>

                {/* coded blocks */}
                

                {/* block1 */}
                <div>
                    <CodedBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div>
                                <p className="font-bold text-richblack-25 text-4xl">Unlock your<HighlightedText text="coding potential"></HighlightedText> with our online courses.</p>
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctaBtn1={{
                            active:true,
                            link:'/signup',
                            btnText:"Try it Yourself"
                        }}
                        ctaBtn2={{
                            active:false,
                            link:'/signup',
                            btnText:"Learn More"
                        }}
                        codeBlock={
                            `<!DOCTYPE html>\n<head>\n<title>This is my page</title>\n</head>\n<body>\n<a href="/">header</a>\n<nav><a href="/one">One</a>\n<a href="/two">Two</a><a href="/three">Three</a>\n</nav>\n</body>`
                        }
                        codeColor="text-yellow-50"
                        bgGradient={
                            <div className="absolute codeBlock1">
                                
                            </div>
                        }
                    ></CodedBlocks>
                </div>

                
                {/* block2 */}
                <div className="mt-24">
                    <CodedBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div>
                                <p className="font-bold text-richblack-25 text-4xl">Start<HighlightedText text="coding in seconds."></HighlightedText></p>
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctaBtn1={{
                            active:true,
                            link:'/signup',
                            btnText:"Continue Lesson"
                        }}
                        ctaBtn2={{
                            active:false,
                            link:'/signup',
                            btnText:"Learn More"
                        }}
                        codeBlock={
                            `import React from 'react'\nimport Button from './Button'\nimport { TypeAnimation } from 'react-type-animation'\n\nconst Home = (\n return {\n <div>Home</div>\n}\n)\n export default Home;`
                        }
                        codeColor="text-blue-25"
                        bgGradient={
                            <div className="absolute codeBlock2">
                                
                            </div>
                        }
                    ></CodedBlocks>
                </div>


                <CardSection></CardSection>


            {/* section2 */}

            <div className="bg-pure-greys-5 w-[100vw] -mt-64">

                <div className="backgroundHome h-[310px]">
                    <div className="pt-48 flex gap-6 items-center justify-center">
                        <Button linkTo={'/signup'} active={true}>
                            <div className="flex items-center">
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </Button>
                        <Button linkTo={'/login'} active={false}>
                            <div>
                                Learn More
                            </div>
                        </Button>
                    </div>
                </div>

                <div className="w-11/12 mx-auto mt-16">

                    {/* white section 1 */}

                    <div className=" flex flex-col lg:flex-row md:flex-row  gap-5 mb-24 justify-between">

                        <div className="text-4xl text-richblack-700 w-[45%] font-semibold">
                            Get the skills you need for a <HighlightedText text={"job that is in demand."}/>
                        </div>

                        <div className="w-[45%] flex flex-col gap-5">
                            <p className="font-semibold text-richblack-300">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <Button active={true} linkTo={'/login'}>
                                <div>
                                    Learn More
                                </div>
                            
                            </Button>
                        
                        </div>

                        

                    </div>

                    {/* white section 2 */}

                    <TimeLineSection></TimeLineSection>
                    {/* white section 3 */}

                    <LearningLanguageSection/>

                </div>

            </div>


            {/* section3 */}


            <div>

                <div className="w-11/12 mt-16 mb-16">

                    <InstructorSection/>

                </div>

            </div>

            <div className='w-[90vw]'>
                <h1 className='text-richblack-5 font-bold text-4xl text-center'>Reviews from learners : </h1>
                <ReviewSlider/>
            </div>

            <div className="w-[100vw]">
                <Footer/>
            </div>
        </div>
        
    )
}

export default Home
