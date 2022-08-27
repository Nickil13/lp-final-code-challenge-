import React from "react";
import styles from "./Modal.module.css";

export default function ConfirmDelete({
    postTitle,
    handleDeletePost,
    closeAlert,
}) {
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modal}>
                <h2>Confirm Delete</h2>
                <p className={styles.modalAlert}>
                    Are you sure you want to delete:<span>{postTitle}</span>
                </p>
                <button className="btn-secondary" onClick={handleDeletePost}>
                    Confirm
                </button>
                <button className={styles.closeBtn} onClick={closeAlert}>
                    X
                </button>
            </div>
        </div>
    );
}
