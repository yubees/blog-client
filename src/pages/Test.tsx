import WritePost from '@/component/WritePost';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Edit, Trash } from 'lucide-react';
import EditPost from '@/component/EditPost';
import { RootState } from '@/store/store';
import { useAppSelector } from '@/store/hooks';
// import { setAccessToken } from '../store/authSlice'; 
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
import 'react-quill/dist/quill.snow.css';


interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  authorName: string;
  createdAt: string;
  isUpdated: boolean;
}

const Dashboard: React.FC = () => {
  //     const dispatch = useAppDispatch();
  //     const accessToken = useAppSelector((state) => state.auth.accessToken);

  // const handleLogin = () => {
  //   const token = 'userToken'; 
  //   dispatch(setAccessToken(token));
  // };

  const [posts, setPosts] = useState<Post[]>([]);


  const handleData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/post/getAllPost`, {
        method: "GET"
      })

      const data = await response.json();
      console.log(data)
      setPosts(data);

    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/post/deletePost/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); // Remove the deleted post from state
      console.log(`Post with id ${id} deleted successfully.`);
      await handleData()
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  useEffect(() => {
    handleData()
  }, [])


  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  // Function to open the popover
  const openPopover = () => {
    setIsPopoverOpen(true);
  };

  const user = useAppSelector((state: RootState) => state.auth.user);



  return (
    <div className=' flex gap-20 p-10'>
      <div>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger onClick={openPopover} className=' text-white'>Post</PopoverTrigger>
          <PopoverContent>  <WritePost handleData={handleData} closePopover={closePopover} /></PopoverContent>
        </Popover>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-white w-96 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className=' flex justify-between'>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    {
                      (post.authorName === user?.id.toString()) &&
                      <div className="flex gap-4 cursor-pointer items-center">
                        <div onClick={() => deletePost(post.id)}>
                          <Trash className="w-6 h-6 text-red-500 hover:text-red-700" />
                        </div>
                        <Popover>
                          <PopoverTrigger className='p-0 mb-5 mr-2 focus:outline-none focus:border-0 w-0 h-0 border-0 bg-white'> <Edit className="w-6 h-6 text-blue-500 hover:text-blue-700" /></PopoverTrigger>
                          <PopoverContent className="my-5">
                            <EditPost post={post} handleData={handleData} />
                          </PopoverContent>
                        </Popover>
                      </div>
                    }
                  </div>
                  <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }} />
                  <img src={post.image} alt="" />
                  <div className="text-sm text-gray-500">
                    <p>
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </p>

                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading posts...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
