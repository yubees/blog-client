import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useState } from "react"
import { useForm } from "react-hook-form";

import { z } from "zod";

export const POstSchema = z.object({
    title: z.string().min(4, {
        message: "Title cannot be less than 4 words"
    }),
    content: z.string().min(10, {
        message: "Content cannot be less than 10 words"
    })
})

interface EditPostProps {
    post: { title: string; content: string; id: number };
    handleData: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post, handleData }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isEdited, setIsEdited] = useState(false);

    const postForm = useForm({
        resolver: zodResolver(POstSchema),
        defaultValues: {
            title: post.title,
            content: post.content
        },
    });

    const handleSubmitClick = postForm.handleSubmit(async (data) => {
        const { title, content } = data;

        try {
            setIsLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API}/post/updatePost/${post.id}`, {
                method: "PUT",
                body: JSON.stringify({ title, content }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data)
            setIsLoading(false)
            handleData()
            setIsEdited(true)

        } catch (error) {
            console.log(error)
            setIsLoading(false)

        }
    });

    return (

        <div className=" space-y-6 w-full">
            {
                isEdited ? <>Edited</> :
                    <>
                        <div className="space-y-4">
                            <Form {...postForm}>
                                <form
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={postForm.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-between">Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="text" />
                                                </FormControl>
                                                <FormMessage className="flex justify-between" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={postForm.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-between">Content</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage className="flex justify-between" />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                        <div>
                            {isLoading ?
                                <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                    <Loader className="h-6 animate-spin" />
                                </Button> :
                                <Button className="w-full py-[0.625rem] px-[0.875rem]"
                                    onClick={handleSubmitClick}
                                >
                                    Edit
                                </Button>}
                        </div>
                    </>
            }
        </div>
    )
}

export default EditPost