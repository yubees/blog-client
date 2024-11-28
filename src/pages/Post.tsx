import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';


const Post: React.FC = () => {

    const location = useLocation();
    const { authorId, title, author, date, imgSrc, authorsrc, content } = location.state || {};
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className=' p-3 md:p-6 my-4 md:my-20 w-full text-white flex justify-center'>
            <div className="max-w-[1200px] space-y-2 md:space-y-4 w-full flex flex-col items-center ">
                <p className=' text-slate-300 text-sm font-semibold'>{format(new Date(date), "MMMM d, yyyy")}</p>
                <h1 className=' text-center text-md md:text-6xl'>
                    {title}</h1>
                {/* <p className=' text-center text-slate-300 text-xl'>A week of connection, strategy, and learning.</p> */}
                <Link to={`/posts/${author}`}
                    state={{ authorId, author }}>
                    <div className="flex gap-2 items-center font-semibold text-sm py-4">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={authorsrc}
                                alt="" />
                            <AvatarFallback className="text-sm">Y</AvatarFallback>
                        </Avatar>
                        <p className=" text-gray-400  ">{author}</p>
                    </div>
                </Link>
                <div className="w-full h-auto sm:h-[500px] md:h-[700px]">
                    <img
                        className="rounded-xl w-full h-full object-cover"
                        src={imgSrc}
                        alt=""
                    />
                </div>

                <div className='text-slate-400 space-y-6 font-semibold max-w-[700px] mr-2 w-full flex flex-col items-start justify-start'>
                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
                    {/* <p className=' py-2 mb-6'>We just finished an offsite with our team in Brazil.
                        While my thoughts are fresh, I'd like to capture my experience both to process the trip and provide
                        a behind-the-scenes view into Resend's culture and values.</p>
                    <h1 className=' text-3xl my-4 text-white'>Starting Point</h1>
                    <p>I've worked remotely for nearly a decade for different companies, but have never yet participated
                        in an offsite or group in-person gathering.</p>

                    <p>Thursday, we broke into three teams and created hackday projects. Each team created a project
                        to explore a product direction, solve a customer pain point, or provide internal tooling.</p>
                    <ul className="list-disc ml-5 space-y-4">
                        <li><span className=' text-white'>Group discussions:</span> team members led sessions on important topics about our customers,
                            our product, and future opportunities or concerns.</li>
                        <li>
                            <span className=' text-white'>Working sessions:</span> we took an hour or so each afternoon to work our regular tasks.
                        </li>
                        <li>
                            <span className=' text-white'> Support sessions:</span> we took time to answer questions and provide support for our customers each day.
                        </li>
                        <li><span className=' text-white'>Team planning:</span> individual teams took time to strategize and plan for the future.
                        </li>
                        <li><span className=' text-white'>Customer call:</span> we had a group call with a customer to better understand their needs and pain points.</li>
                    </ul>
                    <img
                        className="rounded-xl w-full h-auto object-cover"
                        src="https://asset.gecdesigns.com/img/wallpapers/beautiful-fantasy-wallpaper-ultra-hd-wallpaper-4k-sr10012418-1706506236698-cover.webp"
                        alt=""
                    />
                    <p>The slow-brew of deep thought helped me reflect in a qualitiatively different way. The constant pressure of daily work often
                        doesn't leave space for deep thought and the offsite was the perfect medium to work on this crucial skill.</p>

                    <p className=' text-white'>If you weren't programming, what would you be doing?</p>
                    <p>I would probably be involved in music. I'm not a musician
                        (trust me, I've tried many times to learn how to play instruments), but I'm a big
                        enthusiast. So, I'd love to do anything related to music, such as producing, music
                        journalism, or just carrying others' instruments.</p> */}
                </div>
            </div>


        </div>
    )
}

export default Post