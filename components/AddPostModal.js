import React, { useState } from "react";
import styles from "../styles/Modal.module.css";

export default function AddPostModal({ handleCreatePost, closeModal }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2>Create New Post</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreatePost(title, body, userId);
                    }}
                >
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
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={!title || !body || !userId}
                    >
                        Submit
                    </button>
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
