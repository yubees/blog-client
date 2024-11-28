import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
// import { Pen, Trash } from 'lucide-react';
// import { useState } from 'react';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom'
// import { formats, modules } from "@/config/quillConfig";
// import { Button } from '@/components/ui/button';


interface CardProps {
    title: string;
    author: string;
    date: string;
    imgSrc: string;
    authorsrc: string
    content: string
    authorId: number
    isAuthorPost?: boolean
    postId?: number
    handleData?: () => Promise<void>;
}

const Card: React.FC<CardProps> = ({
    postId,
    authorId, title, author,
    date, imgSrc,
    authorsrc, content }) => {

    // const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [titleE, setTitle] = useState(title);
    // const [descE, setDesc] = useState(content);

    // const deletePost = async () => {
    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API}/post/deletePost/${postId}`, {
    //             method: "DELETE",
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to delete post");
    //         }
    //         if (handleData) {
    //             await handleData();
    //         }
    //         console.log(`Post with id deleted successfully.`);
    //     } catch (error) {
    //         console.error("Error deleting post:", error);
    //     }
    // };
    // const handlePost = async () => {
    //     try {
    //         const response = await fetch(
    //             `${import.meta.env.VITE_API}/post/updatePost/${postId}`,
    //             {
    //                 method: "PUT",
    //                 body: JSON.stringify({ title: titleE, content: descE }),
    //                 credentials: "include",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         const data = await response.json();
    //         console.log(data);
    //         if (handleData) {
    //             await handleData();
    //         } setIsFormVisible(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className=' flex flex-col mb-8 relative group'>
            {/* {isFormVisible && (
                <div className="fixed inset-0 z-10 bg-black text-black bg-opacity-70 flex justify-center items-center">
                    <div className="w-full p-5 lg:w-[35rem] m-5 py-10 space-y-5 bg-white rounded-lg shadow-lg">
                        <Label htmlFor="title" className="text-xl">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={titleE}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <ReactQuill
                            theme="snow"
                            className="w-full"
                            modules={modules}
                            formats={formats}
                            value={descE}
                            onChange={setDesc}
                        />
                        <div className=' flex gap-4 justify-center items-center'>
                            <Button onClick={handlePost}>
                                Edit
                            </Button>
                            <Button
                                className="bg-gray-500 text-white "
                                onClick={() => setIsFormVisible(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )} */}
            {/* {isModalOpen && (
                <div className="fixed inset-0 z-10 bg-black text-black bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white text-black rounded p-4 shadow-lg">
                        <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button variant="destructive"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )} */}
{/* 
            <div className="relative ">
                {isAuthorPost && (
                    <div className="absolute right-0 flex text-black gap-4 p-1 bg-gray-400 opacity-0 group-hover:opacity-100 w-max rounded-lg m-2 md:m-2 transition-opacity duration-300">
                        <Trash onClick={() => setIsModalOpen(true)} className='cursor-pointer' />
                        <Pen className='cursor-pointer' onClick={() => setIsFormVisible(true)} />
                    </div>
                )}
            </div> */}

            <Link to="/post"
                state={{ authorId, title, author, date, imgSrc, authorsrc, content }}
                className="no-underline text-gray-200 hover:text-gray-200 pb-14 md:pb-16">
                <div className="w-full h-[250px] sm:h-[200px] md:h-[250px] ">
                    <img
                        className="rounded-lg w-full h-full object-cover"
                        src={imgSrc}
                        alt={title}
                    />
                    <h1 className="mt-4 text-lg sm:text-lg md:text-1xl lg:text-2xl leading-tight font-semibold">
                        {title}
                    </h1>

                </div>
            </Link>
            <Link to={`/posts/${author}`}
                state={{ authorId, author, postId }}
            >
                <div className="flex gap-2 items-center text-sm font-semibold">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={authorsrc} alt="" />
                        <AvatarFallback className="text-sm">Y</AvatarFallback>
                    </Avatar>
                    <p className=" text-gray-200 ">{author} ·</p>
                    <p className=" text-slate-400"> {format(new Date(date), "MMM d, yyyy")}</p>
                </div></Link>
        </div>

    )
}

export default Card