import React from "react";
import Link from "next/link";

export default function Post({ id, title, body }) {
    return (
        <div>
            <h2>
                <Link href={`posts/${id}`}>{`${id}. 
        ${title}`}</Link>
            </h2>
            <p>{body}</p>
        </div>
    );
}
