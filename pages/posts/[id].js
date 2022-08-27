import React, { useState } from "react";
import { EditPostModal, ConfirmDelete } from "../../components/Modals";
import { useAppContext } from "../../context/context";
import styles from "../../styles/SinglePostPage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=20"
    );
    const data = await res.json();

    const paths = data.map((post) => {
        return {
            params: {
                id: post.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const id = context.params.id;
    let postData = null;

    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
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
};

export default function Post({ postData }) {
    const { posts, editPost, deletePost } = useAppContext();
    const [post, setPost] = useState(postData);
    const currentPost = posts.find((post) => post.id === postData.id);
    const [modalShowing, setModalShowing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    React.useEffect(() => {
        if (
            currentPost &&
            JSON.stringify(currentPost) != JSON.stringify(postData)
        ) {
            setPost(currentPost);
        }
    }, []);

    const handleEditPost = (id, title, body, userId) => {
        const newPost = { id, title, body, userId };
        editPost(newPost);
        setModalShowing(false);
        router.push("/");
    };

    const handleDeletePost = (id) => {
        deletePost(id);
        setIsDeleting(false);
        router.push("/");
    };

    return (
        <div className="container">
            <main>
                <Link href="/">{`< Go Back`}</Link>
                <div className={styles.post}>
                    <h1 className={styles.title}>{post?.title}</h1>
                    <div className={styles.postBtns}>
                        <button
                            className="btn-primary"
                            onClick={() => setModalShowing(true)}
                        >
                            Edit Post
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                setIsDeleting(true);
                            }}
                        >
                            Delete Post
                        </button>
                    </div>
                    <p>{post?.body}</p>
                </div>
            </main>
            {/* Edit Post Modal */}
            {modalShowing && (
                <EditPostModal
                    post={post}
                    handleEditPost={handleEditPost}
                    closeModal={() => setModalShowing(false)}
                />
            )}
            {isDeleting && (
                <ConfirmDelete
                    postTitle={post.title}
                    handleDeletePost={() => handleDeletePost(post.id)}
                    closeAlert={() => setIsDeleting(false)}
                />
            )}
        </div>
    );
}
