import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Post from "../components/Post";
import { AddPostModal } from "../components/Modals";
import { useAppContext } from "../context/context";

export async function getStaticProps() {
    let postData = [];
    try {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=20"
        );
        postData = await res.json();
    } catch (error) {
        console.error(error);
    }
    return {
        props: {
            postData,
        },
    };
}

export default function Home({ postData }) {
    const { posts, setPosts, createPost, error, success } = useAppContext();
    const [modalShowing, setModalShowing] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const filteredPosts = searchValue
        ? posts.filter((post) => post.id == searchValue)
        : [...posts];

    useEffect(() => {
        if (posts.length === 0) {
            setPosts(postData);
        }
    }, []);

    useEffect(() => {
        if (modalShowing) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [modalShowing]);

    const handleCreatePost = (title, body, userId) => {
        const data = { title, body, userId };
        createPost(data);
        setModalShowing(false);
        setSearchValue("");
    };

    return (
        <div className="container">
            <Head>
                <title>Posts</title>
                <meta
                    name="List of posts"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Posts</h1>
                <button
                    className={`${styles.addBtn} btn-primary`}
                    onClick={() => setModalShowing(true)}
                >
                    <span>+</span> New Post
                </button>

                <div className={styles.searchBar}>
                    <label htmlFor="search">Search by Id: </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                {error ? (
                    <p className={styles.errorMessage}>
                        <span>X</span> {error}
                    </p>
                ) : (
                    success && (
                        <p className={styles.successMessage}>
                            <span>&#10003;</span>
                            {success}
                        </p>
                    )
                )}
                <div className={styles.posts}>
                    {filteredPosts.length > 0 &&
                        filteredPosts.map((post, index) => {
                            return <Post {...post} key={index} />;
                        })}
                </div>
            </main>
            {/* Add Post Modal */}
            {modalShowing && (
                <AddPostModal
                    handleCreatePost={handleCreatePost}
                    closeModal={() => setModalShowing(false)}
                />
            )}
        </div>
    );
}
