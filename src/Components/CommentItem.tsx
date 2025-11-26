import React from "react";
import {DEFAULT_PROFILE_PICTURE_URL} from "../config/constants";

interface CommentItemProps {
    id: number,
    authorId: string,
    authorName: string,
    authorProfileImage: string | null,
    content: string,
    creationDate: string,
    onReport: (id: number) => void,
    isForModerator: boolean,
}

const CommentItem: React.FC<CommentItemProps> = ({
                                                     id,
                                                     authorId,
                                                     authorName,
                                                     authorProfileImage,
                                                     content,
                                                     creationDate,
                                                     onReport,
                                                     isForModerator
}) => {
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                marginBottom: "12px",
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: "rgba(249,249,249,0.5)"
            }}
        >
            <img
                src={authorProfileImage || DEFAULT_PROFILE_PICTURE_URL}
                alt={authorName}
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #ccc"
                }}
            />
            <div style={{flex: 1}}>
                <div style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px"}}>
                    <strong>{authorName}</strong>
                    <small style={{color: "#888", fontSize: "12px"}}>
                        {new Date(creationDate).toLocaleString()}
                    </small>
                </div>
                <p style={{margin: 0}}>{content}</p>
            </div>

            {!isForModerator &&
            <button
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                }}
                onClick={() => onReport(id)}
            >
                ⚠
            </button>
            }
        </div>
    );
};

export default CommentItem;
