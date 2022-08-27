import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function AddPostModal({ handleCreatePost, closeModal }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    const onSubmitPost = (e) => {
        e.preventDefault();
        if (!title || !body || !userId) {
            setError("Please fill in all fields.");
        } else {
            error && setError("");
            handleCreatePost(title, body, userId);
        }
    };
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2>Create New Post</h2>
                <form onSubmit={onSubmitPost}>
                    <div className={styles.inputControl}>
                        <label htmlFor="">Title: </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputControl}>
                        <label htmlFor="body">Body: </label>
                        <textarea
                            name="body"
                            id="body"
                            value={body}
                            rows="5"
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={styles.inputControl}>
                        <label htmlFor="userId">User Id: </label>
                        <input
                            type="text"
                            name="userId"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submitBtn}>
                        Submit
                    </button>
                    {error && <p>{error}</p>}
                </form>

                <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={closeModal}
                >
                    X
                </button>
            </div>
        </div>
    );
}
