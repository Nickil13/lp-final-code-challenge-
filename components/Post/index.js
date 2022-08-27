import React from "react";
import Link from "next/link";
import styles from "./Post.module.css";

export default function Post({ id, title, body }) {
    return (
        <div className={styles.post}>
            <h2 className={styles.title}>
                <Link href={`/posts/${id}`}>{`${id}. ${title}`}</Link>
            </h2>
            <p>{body}</p>
        </div>
    );
}
