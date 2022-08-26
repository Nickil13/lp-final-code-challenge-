import React from "react";
import styles from "../../styles/PostPage.module.css";

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
    return (
        <div className="container">
            <main className={styles.main}>
                <div>
                    <h1 className={styles.title}>{postData.title}</h1>
                    <div className={styles.postBtns}>
                        <button className="btn-primary">Edit Post</button>
                        <button className="btn-secondary">Delete Post</button>
                    </div>
                    <p>{postData.body}</p>
                </div>
            </main>
            {/* Add Post Modal */}
            {/* {modalShowing && (
                <AddPostModal
                    handleCreatePost={handleCreatePost}
                    closeModal={() => setModalShowing(false)}
                />
            )} */}
        </div>
    );
}
