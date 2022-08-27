import React from "react";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    React.useEffect(() => {
        let timer = setTimeout(() => {
            if (error) {
                setError("");
            }
            if (success) {
                setSuccess("");
            }
        }, [3000]);
        return () => {
            clearTimeout(timer);
        };
    }, [error, success]);

    const createPost = async (data) => {
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
            const postData = await res.json();
            setPosts([postData, ...posts]);
            setSuccess("Created a new post!");
        } catch (error) {
            console.error(error);
            setError("Error creating post");
        }
    };

    const editPost = async (newPost) => {
        try {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${newPost.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPost),
                }
            );
            const data = await res.json();
            if (data) {
                const newPosts = posts.map((post) => {
                    if (post.id === data.id) {
                        return newPost;
                    }
                    return post;
                });
                setPosts(newPosts);
            }
            setSuccess("Edited post");
        } catch (error) {
            setError("Error editing post");
        }
    };

    const deletePost = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE",
            });
            const newPosts = posts.filter((post) => post.id !== id);
            setPosts([...newPosts]);
            setSuccess("Deleted post");
        } catch (error) {
            setError("Error deleting post");
        }
    };
    return (
        <AppContext.Provider
            value={{
                posts,
                setPosts,
                createPost,
                editPost,
                deletePost,
                error,
                success,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
